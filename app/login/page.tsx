"use client";

import { useLoginUserMutation } from "@/redux/features/auth/apiauth";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";


interface FormData {

  email: string;
  password: string;

}

const Page: React.FC = () => {
    const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
   
    email: "",
    password: "",
   
  });
  const [create]=useLoginUserMutation()

  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const {  email,password  } = formData;
  await create({email,password})

  setLoading(false);
  console.log("Login successful!");
  router.push("/"); 

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-600">
      <div className="p-4 sm:p-6 lg:p-10 bg-gray-800 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold text-white mb-4 text-center">
          Welcome to  To-do-app
        </h1>

        <form onSubmit={handleSubmit}>
    

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

     

          {/* Submit Button */}
          <button
            className="w-full bg-blue-500 text-white hover:bg-blue-600 transition-transform duration-300 py-2 rounded-md"
            type="submit"
            disabled={loading}
          >
            {loading ? "Register..." : "Submit"}
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
          <p className="text-white font-medium">Donot Have Account?</p>
          <a href="/register" className="text-blue-500 hover:underline">
            register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Page;