"use client";
import { usePathname } from "next/navigation";

export default function Footer(): React.ReactElement {
  const pathname = usePathname();
  const hideFooter = pathname.includes("/dashboard");

  return (
    <footer
      className={`bg-primary text-whiteshade flex flex-col justify-between px-6 py-8 h-[100vh] md:h-[40vh] ${
        hideFooter ? "hidden" : ""
      }`}>
      <div className="flex flex-row gap-6 mx-auto justify-between">
        <p className="text-xl italic w-1/3">
          We’re here to help. If you have questions about registration, profile
          verification, or finding the right match, reach out and we’ll guide
          you.
        </p>

        <div className="text-base leading-relaxed">
          <p>
            Email:{" "}
            <a
              href="mailto:saanjhmatrimonialservices@gmail.com"
              className="underline">
              saanjhmatrimonialservices@gmail.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+919810098096" className="underline">
              +91 9810098096
            </a>
          </p>
          <p>Address: 1968/2, Rani Bagh, Delhi-34</p>
        </div>
      </div>

      <div className="text-center text-sm mt-8">
        &copy; {new Date().getFullYear()} Saanjh Pvt. Ltd. All rights reserved.
      </div>
    </footer>
  );
}
