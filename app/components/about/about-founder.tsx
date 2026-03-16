"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { serif } from "@/app/fonts";
import ProfileImage from "@/app/profile.webp";

export default function AboutFounder() {
  return (
    <div className="w-full bg-white py-12 md:py-20 px-4 sm:px-8 md:px-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-10 md:mb-16 text-blackshade">
          Meet Our Founder
        </h2>
        <motion.div
          className="flex flex-col md:flex-row items-center gap-12 md:gap-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}>
          <div className="flex-shrink-0 flex flex-col items-center gap-5">
            <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden shadow-xl border-4 border-primary/20">
              <Image
                src={ProfileImage}
                alt="Abhimanyu Tuteja - Founder of Saanjh"
                className="w-full h-full object-cover"
                width={288}
                height={288}
              />
            </div>
            <div className="text-center">
              <h3
                className={`${serif.className} text-2xl sm:text-3xl md:text-4xl font-semibold text-primary`}>
                Abhimanyu Tuteja
              </h3>
              <p className="text-greyshade text-lg mt-1">Founder, Saanjh</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-base md:text-lg text-blackshade text-justify">
              Over a long and fulfilling career in education,{" "}
              <span className="text-primary font-semibold">
                Abhimanyu Tuteja
              </span>{" "}
              has had the rare privilege of shaping young minds while forging
              bonds with families across communities. The classroom, for him,
              was never merely a place of instruction; it became a meeting
              ground where trust was built, stories were shared, and
              relationships took root that would last well beyond the school
              years.
            </p>
            <p className="text-base md:text-lg text-blackshade text-justify">
              It is this very breadth of connection that led him, quite
              naturally, to the role of a matchmaker. Having witnessed the hopes
              and aspirations of countless families, he brings to the task an
              uncommon sensitivity, a deep respect for tradition, and an
              intuitive understanding of what makes two people truly compatible.
              His reputation within the community rests not on grand claims, but
              on years of quiet, consistent goodwill.
            </p>
            <p className="text-base md:text-lg text-blackshade text-justify">
              Through <span className="text-primary font-semibold">Saanjh</span>
              , he has given this personal vocation a wider reach. The platform
              is, at its heart, an extension of the care and discernment he has
              always brought to the lives of those around him. Every
              introduction made here carries the weight of that commitment:
              thoughtful, earnest, and rooted in a genuine desire to see
              families come together in happiness.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
