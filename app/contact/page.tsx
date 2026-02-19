"use client";
import { serif } from "../fonts";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaHeart,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(data.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: "Email Us",
      details: "saanjhmatrimonialservices@gmail.com",
      description: "Send us your questions and we'll respond within 24 hours",
    },
    {
      icon: FaPhone,
      title: "Call Us",
      details: "+91 9810098096",
      description: "Speak directly with our team for immediate assistance",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Visit Us",
      details: "1968/2, Rani Bagh, Delhi-34",
      description: "Come meet us in person for personalized consultation",
    },
    {
      icon: FaClock,
      title: "Office Hours",
      details: "Mon - Sat: 9:00 AM - 7:00 PM",
      description: "We're here to help you during these hours",
    },
  ];

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen w-screen bg-whiteshade">
      {/* Hero Section */}
      <div className="w-full h-screen relative bg-gradient-to-r to-amber-600 from-secondary">
        <div className="absolute w-full h-full flex justify-center items-center">
          <div className="md:h-full md:w-full h-1/2 w-full flex flex-col items-center justify-center gap-8 p-12">
            <div className="flex flex-col items-center justify-center">
              <div
                className={`${serif.className} text-6xl md:text-8xl font-semibold text-primary`}>
                Contact Us
              </div>
              <div className="text-xl md:text-2xl text-primary">
                {`                We're Here to Help
`}{" "}
              </div>
            </div>
            {/* <div className="text-lg text-blackshade text-center">
              Have questions about our services? Need guidance on your
              matrimonial journey? Our dedicated team is ready to assist you
              every step of the way.
            </div> */}
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="w-full bg-[#f9f9f9] py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-12 text-blackshade">
            Get in Touch
          </h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2  gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}>
            {contactInfo.map(
              ({ icon: Icon, title, details, description }, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition-shadow duration-300"
                  variants={cardVariants}>
                  <div className="mx-auto w-16 h-16 mb-4 bg-red-100 text-primary flex items-center justify-center rounded-full">
                    <Icon className="text-2xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-blackshade mb-3">
                    {title}
                  </h3>
                  <p className="text-primary font-semibold mb-2">{details}</p>
                  <p className="text-sm text-gray-600">{description}</p>
                </motion.div>
              ),
            )}
          </motion.div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="w-screen min-h-[80vh] overflow-hidden bg-white flex flex-col px-8 md:px-60 py-20 items-center gap-20">
        <div className="text-3xl md:text-4xl font-bold text-blackshade text-center">
          Send Us a Message
        </div>

        <div className="w-full max-w-4xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-blackshade mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-700"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-blackshade mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-700"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-blackshade mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-700"
                  placeholder="Enter your email address"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-blackshade mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-700"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-blackshade mb-2">
                Subject *
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-700">
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="registration">Registration Help</option>
                <option value="profile">Profile Assistance</option>
                <option value="matching">Matching Services</option>
                <option value="technical">Technical Support</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-blackshade mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-700"
                placeholder="Tell us how we can help you..."></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-800 transition-colors inline-flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    <FaHeart className="text-sm" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
