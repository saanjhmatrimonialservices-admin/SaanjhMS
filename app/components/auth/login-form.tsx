"use client";

import { useEffect, useState } from "react";
import { Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { useSetAtom } from "jotai";
import { loggedInUserAtom } from "@/app/store/user";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const setLoggedInUser = useSetAtom(loggedInUserAtom);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Debounced validation
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (touched.email) {
        setEmailError(
          email.length === 0
            ? "Email is required"
            : !isValidEmail(email)
            ? "Invalid email format"
            : ""
        );
      }

      if (touched.password) {
        setPasswordError(
          password.length === 0
            ? "Password is required"
            : password.includes(" ")
            ? "Password should not contain spaces"
            : password.length < 6
            ? "Password must be at least 6 characters"
            : ""
        );
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [email, password, touched]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.dismiss();

    // Final client-side validation before submitting
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (password.length < 6 || password.includes(" ")) {
      toast.error(
        "Password must be at least 6 characters and not contain spaces."
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Login successful 🎉");
        console.log(data);
        router.push(`/${data.user.id}/${data.user.role}/dashboard`);
        setLoggedInUser({
          name: data.user.name,
          role: data.user.role,
          email: data.user.email,
        });
      } else {
        toast.error(data.error || "Login failed");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleLogin}
      className="w-[26rem] mx-auto mt-16 bg-white rounded-2xl shadow-xl p-8 space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 flex items-center justify-center gap-2">
        Login
      </h2>

      {/* Email Input */}
      <div>
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
          <Mail className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
            placeholder="Email"
            className="w-full outline-none bg-transparent text-gray-600"
          />
        </div>
        {emailError && (
          <p className="text-sm text-red-600 mt-1">{emailError}</p>
        )}
      </div>

      {/* Password Input */}
      <div>
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
          <Lock className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
            placeholder="Password"
            className="w-full outline-none bg-transparent text-gray-600"
          />
        </div>
        {passwordError && (
          <p className="text-sm text-red-600 mt-1">{passwordError}</p>
        )}
        <div className="text-right mt-1">
          <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
            Forgot Password?
          </Link>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
