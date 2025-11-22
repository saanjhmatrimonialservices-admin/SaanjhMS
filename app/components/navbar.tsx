"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { serif } from "../fonts";
import { usePathname } from "next/navigation";

export default function Navbar(): React.ReactElement {
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname() ?? "";

  const specificRoutes = ["/dashboard", "/view-profile"];

  const hideNavbar = specificRoutes.some((route) => pathname.includes(route));

  return (
    <>
      {!hideNavbar && (
        <nav className="md:h-20 2xl:h-28 h-16 w-full bg-whiteshade/85  flex items-center backdrop-blur-md justify-between md:px-24 px-8 fixed top-0 z-30 transition duration-300">
          <div
            className={`md:text-3xl 2xl:text-5xl font-bold text-black ${serif.className}`}>
            <Link href="/">Saanjh</Link>
          </div>

          {/* Right - Menu Items */}
          <div className="hidden md:flex space-x-8 text-black md:text-lg 2xl:text-xl">
            <a href="/about" className="hover:text-gray-600">
              About
            </a>

            <a href="/contact" className="hover:text-gray-600">
              Contact
            </a>
          </div>

          {/* Hamburger Icon */}
          <div className="md:hidden text-black">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu">
              <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="lg" />
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="absolute top-24 left-0 w-full bg-[#e9e9e9] flex flex-col items-center space-y-6 py-6 z-50 md:hidden">
              <a
                href="/about"
                className="text-black text-lg"
                onClick={() => setMenuOpen(false)}>
                About
              </a>
              <a
                href="/contact"
                className="text-black text-lg"
                onClick={() => setMenuOpen(false)}>
                Contact
              </a>
            </div>
          )}
        </nav>
      )}
    </>
  );
}
