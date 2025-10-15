import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { userBaseUrl } from "../../axiosInstance";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({ Email: "", Password: "" });

  const navigate = useNavigate();
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
    console.log("Login Data:", formData);

    try {
      const { data } = await userBaseUrl.post("/login", formData);
      // ADD THIS LINE to see the actual server response
      console.log("Server Response:", data);
      const authData = {
        isLogin: true,
        token: data?.token,
      };

      if (data?.success) {
        localStorage.setItem("userAuth", JSON.stringify(authData));
        navigate("/");
      }
    } catch (error) {
      console.log("Login eRROR:", error);
      const errorMessage = error?.response.data;

      if (!errorMessage?.success) {
        toast.error(errorMessage.message);
      }
    }
  };
  //console.log("Login Data:", formData);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Toaster />
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="Email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.Email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="Password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.Password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don’t have an account?
          <NavLink to="/signup" className="text-blue-600 hover:underline">
            Signup
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
