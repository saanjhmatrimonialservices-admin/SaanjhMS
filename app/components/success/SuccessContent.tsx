"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface SuccessContentProps {
  uuid: string;
}

export default function SuccessContent({ uuid }: SuccessContentProps) {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    // Get user name from localStorage or make API call if needed
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleGoToDashboard = () => {
    router.push(`/${uuid}/client/dashboard`);
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-red-950 flex items-center justify-center p-4">
      <div className="bg-whiteshade rounded-lg text-blackshade shadow-xl w-full max-w-2xl text-center">
        <div className="p-8">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Thank You Message */}
          <h1 className="text-4xl font-bold text-primary mb-4">
            Thank You for Registering!
          </h1>

          {userName && (
            <p className="text-xl text-gray-600 mb-6">
              Welcome to Saanjh Matrimony,{" "}
              <span className="font-semibold text-primary">{userName}</span>!
            </p>
          )}

          <p className="text-lg text-gray-600 mb-8">
            Your profile has been successfully created. Our team will review
            your information and get back to you soon.
          </p>

          {/* Next Steps */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-blackshade mb-4">
              {`What's Next?`}
            </h2>
            <ul className="text-left text-gray-600 space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Profile verification in 24-48 hours
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                {`                You'll receive an email confirmation
`}{" "}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Access to your dashboard once verified
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGoToDashboard}
              className="bg-primary text-whiteshade font-semibold py-3 px-6 rounded-lg hover:bg-primary/90 transition">
              Go to Dashboard
            </button>
            <button
              onClick={handleGoHome}
              className="bg-gray-200 text-blackshade font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition">
              Back to Home
            </button>
          </div>

          {/* Contact Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Need help? Contact us at{" "}
              <a
                href="mailto:support@saanjhmatrimony.com"
                className="text-primary hover:underline">
                support@saanjhmatrimony.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}