import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";

const Login = () => {
  const [emailId, setEmailId] = useState("baljeet@gmail.com");
  const [password, setPassword] = useState("Baljeet@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId: emailId,
          password: password,
        },
        { withCredentials: true } // in order to get token in cookies and send back to other api calls
      );
      dispatch(addUser(res.data));
      toast("Glad to see you!");
      return navigate("/");
    } catch (err) {
      setError(err.response.data);
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center my-15 sm:my-20 lg:my-24">
      <div className="bg-base-200 w-80 h-80 sm:w-110 sm:h-90 lg:w-120 lg:h-100 rounded-4xl flex flex-col items-center shadow-xl/20">
        <h1 className="text-2xl sm:text-3xl my-4 ">Login</h1>
        <div className="flex flex-col w-full px-4 sm:px-12">
          <label className="text-left">Email Id</label>
          <input
            type="text"
            placeholder="Email"
            value={emailId}
            className=" my-2 py-1 px-2 sm:py-2 sm:px-4 text-xl border-2 rounded-xl"
            onChange={(e) => setEmailId(e.target.value)}
          />
          <label className="text-left">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            className="my-2 py-1 px-2 sm:px-4 sm:py-2 text-xl border-2 rounded-xl"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            className="mt-8 bg-indigo-500 py-1 sm:py-2 text-xl sm:text-2xl rounded-xl cursor-pointer"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
