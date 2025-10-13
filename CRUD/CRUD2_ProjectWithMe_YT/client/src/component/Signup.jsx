import { useState,useEffect } from "react";
import { userBaseUrl } from "../../axiosInstance";
import { Toaster, toast } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";



const Signup = () => {
  const [formData, setFormData] = useState({
    FirstName: "",
    Email: "",
    Password: "",
  });

const navigate=useNavigate();
   const userAuth = localStorage.getItem("userAuth");
 const  authUser = JSON.parse(userAuth);
 useEffect(() => {
  if(authUser?.isLogin){
    navigate("/");
  }
 }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
    try {
      const {data} = await userBaseUrl.post("/create", formData);
      if (data.success) {
        toast.success(data.message);
        navigate('/login')
      }
      console.log("signup", data);
    } catch (error) {
      console.log("Signup eRROR:", error);

       const errorMessage = error?.response.data;

      if (!errorMessage?.success) {
        toast.error(errorMessage.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Toaster />
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="FirstName"
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.FirstName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="Email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.Email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="Password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.Password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Signup
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-green-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
