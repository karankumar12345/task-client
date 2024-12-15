/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRegisterUserMutation } from "@/redux/features/auth/apiauth";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const Page: React.FC = () => {
  const router = useRouter();
  const [register] = useRegisterUserMutation();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Clear previous errors

    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    try {
      await register(data).unwrap();
      setLoading(false);
      console.log("Registration successful!");
      router.push("/"); // Redirect to login page
    } catch (err: any) {
      setLoading(false);
      setError(err.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-600">
      <div className="p-4 sm:p-6 lg:p-10 bg-gray-800 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold text-white mb-4 text-center">
          Welcome to Mentorship Platform
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="flex flex-col mb-4">
            <label className="text-white font-medium">Enter Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Karan Kumar"
              required
              className="w-full p-2 border rounded-md mt-2 bg-gray-700"
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col mb-4">
            <label className="text-white font-medium">Enter Your Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. karan123@gmail.com"
              required
              className="w-full p-2 border rounded-md mt-2 bg-gray-700"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col mb-4">
            <label className="text-white font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full p-2 border rounded-md mt-2 bg-gray-700"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}

          {/* Submit Button */}
          <button
            className="w-full bg-blue-500 text-white hover:bg-blue-600 transition-transform duration-300 py-2 rounded-md"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Submit"}
          </button>
        </form>

        {/* Loading Spinner */}
        {loading && (
          <div className="mt-5 flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="text-blue-500 font-medium">Wait...</p>
          </div>
        )}
        <div className="mt-5 flex items-center justify-center space-x-2">
          <p className="text-white font-medium">Already have an account?</p>
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Page;
