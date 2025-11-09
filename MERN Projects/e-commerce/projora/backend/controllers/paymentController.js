import Razorpay from 'razorpay';
import crypto from 'crypto';
import User from '../models/User.js';
import Project from '../models/Project.js'; // <-- THIS WAS THE MISSING LINE
import sendMail from '../config/sendMail.js';

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * @route   POST /api/payment/create-order
 * @desc    Create a new Razorpay order
 * @access  Private (User)
 */
export const createOrder = async (req, res) => {
  try {
    // 1. Get project and user info
    const { projectId, amount } = req.body;
    const userId = req.user.userId; // From isAuth middleware

    if (!projectId || !amount) {
        return res.status(400).json({ message: "Project ID and amount are required." });
    }

    // 2. Find the project to verify the price
    //    This line was causing the 500 error because 'Project' was not imported
    const project = await Project.findById(projectId);
    if (!project) {
        return res.status(404).json({ message: "Project not found." });
    }
    
    // 3. Verify the amount matches the backend price
    if (Number(project.price) !== Number(amount)) {
        return res.status(400).json({ message: "Price mismatch." });
    }
    
    // 4. Create the order
    const options = {
      amount: Number(amount) * 100, // Amount in paisa
      currency: "INR",
      receipt: `${projectId}_${new Date().getTime()}`,
      notes: {
        userId: userId,
        projectId: projectId,
      }
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).json({ message: "Razorpay order creation failed" });
    }

    res.status(200).json({
      message: "Order created",
      order,
    });
  } catch (error) {
    console.log("CREATE ORDER FAILED:", error);
    res.status(500).json({
      message: "Server error while creating order.",
      error: error.message,
    });
  }
};

/**
 * @route   POST /api/payment/verify
 * @desc    Verify the payment signature (Client-side)
 * @access  Private (User)
 */
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed: Missing fields." });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      res.status(200).json({
        message: "Payment verified successfully! Your order is processing.",
        paymentId: razorpay_payment_id,
      });
    } else {
      return res.status(400).json({ message: "Payment verification failed: Invalid signature." });
    }
  } catch (error) {
    console.log("VERIFY PAYMENT FAILED:", error);
    res.status(500).json({
      message: "Server error while verifying payment.",
      error: error.message,
    });
  }
};


/**
 * @route   POST /api/payment/webhook
 * @desc    Razorpay webhook for payment confirmation
 * @access  Public (Called by Razorpay)
 */
export const paymentWebhook = async (req, res) => {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers['x-razorpay-signature'];

    console.log('Webhook received...');

    try {
        // 1. Verify the webhook signature
        const shasum = crypto.createHmac('sha256', secret);
        shasum.update(JSON.stringify(req.body));
        const digest = shasum.digest('hex');

        if (digest !== signature) {
            console.log('Webhook signature verification failed.');
            return res.status(400).json({ message: 'Invalid signature' });
        }

        // 2. Signature is verified. Process the event.
        const event = req.body.event;
        
        if (event === 'payment.captured') {
            const payment = req.body.payload.payment.entity;
            const { userId, projectId } = payment.notes;

            if (!userId || !projectId) {
                console.log('Webhook Error: Missing userId or projectId in notes.');
                return res.status(400).json({ message: "Missing notes." });
            }

            // 3. Find the user and project
            const user = await User.findById(userId);
            const project = await Project.findById(projectId);

            if (!user || !project) {
                 console.log(`Webhook Error: User (${userId}) or Project (${projectId}) not found.`);
                return res.status(404).json({ message: "User or project not found." });
            }

            // 4. Grant access - Add project to user's purchased array
            if (!user.purchasedProjects.includes(projectId)) {
                user.purchasedProjects.push(projectId);
                await user.save();
                console.log(`Access granted for user ${userId} to project ${projectId}`);

                // 5. Send a confirmation email
                const subject = "Your purchase from Projora is complete!";
                const html = `
                    <h1>Thank you for your purchase!</h1>
                    <p>Hello ${user.name},</p>
                    <p>You have successfully purchased the project: <strong>${project.title}</strong>.</p>
                    <p>You can now log in to your Projora account to download your files from your profile or the project page.</p>
                    <br>
                    <p>Thank you,</p>
                    <p>The Projora Team</p>
                `;
                
                sendMail(user.email, subject, html)
                    .catch(mailError => console.log("Failed to send purchase email:", mailError));
            } else {
                 console.log(`User ${userId} already owns project ${projectId}.`);
            }
        }

        // 6. Acknowledge the webhook
        res.status(200).json({ status: 'ok' });

    } catch (error) {
        console.log("WEBHOOK ERROR:", error.message);
        res.status(500).json({
            message: 'Server error while processing webhook.',
            error: error.message,
        });
    }
};