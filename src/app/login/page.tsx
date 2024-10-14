"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
const Loginpage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",

  });
  const [buttondisabled, setButtonDisable] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      router.push("/Profile");
    } catch (error: any) {
      console.log("Login Failed  Try Again");
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0

    ) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  },[user]);
  return (
    <div className="flex flex-col bg-black text-white items-center justify-center min-h-screen py-2">
      <h1>{loading ? "processing" : "signup"}</h1>
      <hr></hr>
      

      <label htmlFor="email">Email:</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
        type="text"
      ></input>

      <label htmlFor="password">Password:</label>
      <input
        className="p-2 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
        type="text"
      ></input>

      <button
      onClick={onLogin}
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"

      >{buttondisabled ? "No Login":"Login"}
      </button>
      <Link href="/signup">Visit Signup page</Link>
    </div>
  );
};

export default Loginpage;
