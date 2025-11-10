import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [emailId, setEmailId] = useState("baljeet@gmail.com");
  const [password, setPassword] = useState("Baljeet@123");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        {
          emailId: emailId,
          password: password,
        },
        { withCredentials: true } // in order to get token in cookies and send back to other api calls
      );
      console.log(res);
    } catch (err) {
      console.log("ERROR: " + err.message);
    }
  };

  return (
    <div className="flex items-center justify-center my-28">
      <div className="bg-base-200 w-120 h-100 rounded-4xl flex flex-col items-center">
        <h1 className="text-4xl my-4 ">Login</h1>
        <div className="flex flex-col">
          <label className="text-left">Email Id</label>
          <input
            type="text"
            placeholder="Email"
            value={emailId}
            className=" my-2 py-2 px-4 text-2xl border-2 rounded-xl"
            onChange={(e) => setEmailId(e.target.value)}
          />
          <label className="text-left">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            className="my-2 py-2 px-4 text-2xl border-2 rounded-xl"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="mt-8 bg-blue-500 p-2 text-2xl rounded-xl cursor-pointer"
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
