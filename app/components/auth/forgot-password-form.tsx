"use client";

import { useState } from "react";
import { Mail, Lock, KeyRound, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "verify">("email");
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("OTP sent to your email!");
        setStep("verify");
      } else {
        toast.error(data.error || "Failed to send OTP");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Password reset successfully! Please login.");
        router.push("/login");
      } else {
        toast.error(data.error || "Failed to reset password");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[26rem] mx-auto mt-16 bg-white rounded-2xl shadow-xl p-8 space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 flex items-center justify-center gap-2">
        {step === "email" ? "Forgot Password" : "Reset Password"}
      </h2>

      {step === "email" ? (
        <form onSubmit={handleSendOtp} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <Mail className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full outline-none bg-transparent text-gray-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword} className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-md text-sm text-blue-700 mb-4">
            An OTP has been sent to <strong>{email}</strong>. Please check your inbox.
            <button
              type="button"
              onClick={() => setStep("email")}
              className="ml-2 underline text-blue-800 hover:text-blue-900"
            >
              Change
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              OTP
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <KeyRound className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                placeholder="Enter 6-digit OTP"
                className="w-full outline-none bg-transparent text-gray-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <Lock className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
                placeholder="Enter new password"
                className="w-full outline-none bg-transparent text-gray-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      )}

      <div className="text-center">
        <Link
          href="/login"
          className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Login
        </Link>
      </div>
    </div>
  );
}
