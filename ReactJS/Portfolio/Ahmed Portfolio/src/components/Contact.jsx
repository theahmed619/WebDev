import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      message: data.message,
    };

    try {
      await axios.post("https://getform.io/f/aqoknkra", userInfo);
      toast.success("✅ Message sent successfully!");
      reset(); // Clear form after successful submission
    } catch (error) {
      console.error(error);
      toast.error("❌ Something went wrong, please try again.");
    }
  };

  return (
    <section
      id="Contact"
      className="max-w-screen-2xl container mx-auto px-6 md:px-20 my-16"
    >
      <h1 className="text-4xl font-bold text-white mb-6 text-center">
        📩 Get in Touch
      </h1>
      <p className="text-gray-300 text-lg text-center mb-8">
        Fill out the form below, and I'll get back to you soon!
      </p>

      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-900/80 w-full max-w-lg p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-center text-white mb-4">
            Send a Message
          </h2>

          <div className="flex flex-col mb-4">
            <label htmlFor="name" className="text-gray-300 font-medium">
              Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              id="name"
              className="bg-gray-800 text-white p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.name && (
              <p className="text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="text-gray-300 font-medium">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email",
                },
              })}
              type="email"
              id="email"
              className="bg-gray-800 text-white p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.email && (
              <p className="text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col mb-6">
            <label htmlFor="message" className="text-gray-300 font-medium">
              Message
            </label>
            <textarea
              {...register("message", { required: "Message cannot be empty" })}
              id="message"
              rows="4"
              className="bg-gray-800 text-white p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.message && (
              <p className="text-red-500 mt-1">{errors.message.message}</p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-green-600 transition-all duration-300 shadow-lg"
            >
              🚀 Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
