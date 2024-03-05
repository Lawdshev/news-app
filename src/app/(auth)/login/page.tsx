"use client";
import React, { useState } from "react";
import GoogleButton from "react-google-button";
import Link from "next/link";
import { useUserAuth } from "@/app/providers/user-auth-context-provider";

const Login = () => {
  const { logIn,setUser} = useUserAuth(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await logIn(email, password);
      const user = {
        email: result.user.email,
        name: result.user.displayName,
        id: result.user.uid,
      };
      setUser(result.user);
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "/";
    } catch (error: any) {
      console.log(error?.message);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[90vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw]">
        <h2 className="text-2xl font-bold mb-8">Login to continue</h2>
        {error && (
          <p className="text-red-500 mb-[2%]">
            {typeof error === "object" ? error.message : error}
          </p>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="border-2 border-gray-400 p-2 w-full rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="border-2 border-gray-400 p-2 w-full rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out w-full font-[400] mt-[3%]"
          >
            { loading ? "Loading..." : "Login"}
          </button>
        </form>
        <div className="mt-3">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-500">
            Sign up here
          </Link>{" "}
        </div>
      </div>
    </div>
  );
};

export default Login;
