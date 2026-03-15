"use client";
import { serif } from "../fonts";
import {
  FaHeart,
  FaUsers,
  FaHandshake,
  FaShieldAlt,
  FaStar,
  FaGlobe,
} from "react-icons/fa";
import { motion } from "framer-motion";
import AboutFounder from "../components/about/about-founder";

export default function About() {
  const values = [
    {
      icon: FaHeart,
      title: "Love & Respect",
      description:
        "We believe in the sanctity of marriage and the importance of finding a partner who shares your values and dreams.",
    },
    {
      icon: FaUsers,
      title: "Family First",
      description:
        "We understand that marriage is a union of families, not just individuals. We honor family traditions and expectations.",
    },
    {
      icon: FaHandshake,
      title: "Trust & Integrity",
      description:
        "Every profile is verified and every interaction is built on trust, ensuring a safe and secure platform for all.",
    },
    {
      icon: FaShieldAlt,
      title: "Privacy & Security",
      description:
        "Your personal information is protected with advanced security measures, giving you peace of mind throughout your journey.",
    },
    {
      icon: FaStar,
      title: "Excellence",
      description:
        "We strive for excellence in every aspect of our service, from profile matching to customer support.",
    },
    {
      icon: FaGlobe,
      title: "Cultural Heritage",
      description:
        "We celebrate the rich diversity of Indian culture and help you find a partner who appreciates your traditions.",
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
                About Saanjh
              </div>
              <div className="text-xl md:text-2xl text-primary">
                Our Story, Mission & Values
              </div>
            </div>
            {/* <div className="text-lg text-blackshade text-center">
              Discover the heart behind Saanjh - where tradition meets
              technology, and love finds its perfect match through meaningful
              connections.
            </div> */}
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="w-screen min-h-[80vh] overflow-hidden bg-white flex flex-col px-8 md:px-60 py-20 items-center gap-20">
        <div className="text-3xl md:text-4xl font-bold text-blackshade text-center">
          Our Story
        </div>
        <div className="flex flex-col gap-8 max-w-4xl">
          <div className="text-base md:text-lg 2xl:text-xl text-blackshade text-justify">
            <span className="text-primary font-semibold">Saanjh</span> was born
            from a simple yet profound belief: that finding your life partner
            should be a journey filled with joy, trust, and cultural
            understanding. Founded by a team who deeply understands the beauty
            and complexity of Indian marriages, we set out to create a platform
            that honors tradition while embracing modern technology.
          </div>
          <div className="text-base md:text-lg 2xl:text-xl text-blackshade text-justify">
            Our name {`"Saanjh"`} represents that magical time when families
            gather, stories are shared, and connections are made. Just as the
            evening brings warmth and togetherness, we aim to bring warmth to
            your search for love and companionship.
          </div>
          <div className="text-base md:text-lg 2xl:text-xl text-blackshade text-justify">
            We understand that marriage in Indian culture is not just about two
            people coming together, but about families uniting, traditions being
            preserved, and new memories being created. {`That's`} why every
            feature of our platform is designed with this understanding at its
            core.
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="w-full bg-[#f9f9f9] py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-12 text-blackshade">
            Our Mission
          </h2>
          <div className="text-center text-lg md:text-xl text-blackshade max-w-4xl mx-auto">
            To create meaningful connections that honor tradition, celebrate
            love, and build families that stand the test of time. We believe
            that every person deserves to find a partner who not only loves them
            but also respects their values, traditions, and dreams.
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="w-screen min-h-[80vh] overflow-hidden bg-white flex flex-col px-8 md:px-60 py-20 items-center gap-20">
        <div className="text-3xl md:text-4xl font-bold text-blackshade text-center">
          Our Values
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}>
          {values.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={index}
              className="bg-whiteshade rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition-shadow duration-300"
              variants={cardVariants}>
              <div className="mx-auto w-16 h-16 mb-4 bg-red-100 text-primary flex items-center justify-center rounded-full">
                <Icon className="text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-blackshade mb-3">
                {title}
              </h3>
              <p className="text-sm text-gray-600 text-justify">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Why We're Different Section */}
      <div className="w-full bg-primary py-16 px-6 md:px-20 h-full md:h-[60vh] 2xl:h-[50vh] flex items-center justify-center">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">
            {`            Why We're Different
`}{" "}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
            <div className="text-lg md:text-xl">
              <h3 className="font-semibold mb-4 text-xl">
                Cultural Understanding
              </h3>
              <p className="text-gray-200 text-base">
                We deeply understand Indian family dynamics, cultural
                expectations, and the importance of community in marriage
                decisions.
              </p>
            </div>
            <div className="text-lg md:text-xl">
              <h3 className="font-semibold mb-4 text-xl">Personal Touch</h3>
              <p className="text-gray-200 text-base">
                Unlike other platforms, we provide personalized guidance and
                support throughout your journey to finding love.
              </p>
            </div>
            <div className="text-lg md:text-xl">
              <h3 className="font-semibold mb-4 text-xl">Verified Profiles</h3>
              <p className="text-gray-200 text-base">
                Every profile goes through our comprehensive verification
                process to ensure authenticity and safety.
              </p>
            </div>
            <div className="text-lg md:text-xl">
              <h3 className="font-semibold mb-4 text-xl">
                Family-Centric Approach
              </h3>
              <p className="text-gray-200 text-base">
                We recognize that marriage involves families, and we facilitate
                connections that bring families together.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About Founder */}
      <AboutFounder />

      {/* Call to Action */}
      <div className="w-screen min-h-[60vh] overflow-hidden bg-whiteshade flex flex-col px-8 md:px-60 py-20 items-center gap-20">
        <div className="text-3xl md:text-4xl font-bold text-blackshade text-center">
          Ready to Begin Your Journey?
        </div>
        <div className="text-center text-lg md:text-xl text-blackshade max-w-4xl">
          Join thousands of families who have found their perfect matches
          through Saanjh. Your story of love and happiness starts here.
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <button className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-800 transition-colors">
            Start Your Journey
          </button>
          <button className="border-2 border-primary text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary hover:text-white transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
