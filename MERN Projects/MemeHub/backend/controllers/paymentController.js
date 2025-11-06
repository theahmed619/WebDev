import Razorpay from 'razorpay';
import crypto from 'crypto';

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
    // For this test, we'll just charge 1 Rupee (100 paisa)
    const options = {
      amount: 100, // Amount in paisa (100 = 1 INR)
      currency: "INR",
      receipt: `receipt_event_${new Date().getTime()}`,
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
 * @desc    Verify the payment signature
 * @access  Private (User)
 */
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed: Missing fields." });
    }

    // This is the critical security step
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Payment is successful and verified
      // In a real app, you would save this to your database
      // (e.g., await Payment.create({ ... }))
      
      res.status(200).json({
        message: "Payment verified successfully!",
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
