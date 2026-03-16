import Image from "next/image";
import BackgroundImage from "../public/Background_Saanjh_Compressed.webp";
import { serif, cursive } from "./fonts";
import WhyUs from "./components/landing-page/why-us";
import MarigoldSection from "./components/landing-page/marigold-section";
import AboutFounder from "./components/about/about-founder";

export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-whiteshade">
      <div className="w-full min-h-screen relative bg-gradient-to-r to-amber-600 from-secondary">
        <div className="absolute w-full h-full flex flex-col md:flex-row justify-center items-center px-4 sm:px-6 md:px-0">
          <div className="md:h-full md:w-1/2 w-full max-w-xl flex flex-col items-center justify-center gap-6 p-4 sm:p-6 md:p-12 pt-24 md:pt-12">
            <div className="flex flex-col items-center justify-center ">
              <div
                className={`${serif.className} text-5xl sm:text-6xl md:text-8xl leading-tight font-semibold text-primary`}>
                Saanjh
              </div>
              <div className="text-lg sm:text-xl md:text-2xl text-primary text-center">
                Matrimonial Services
              </div>
            </div>
            <div className="text-base sm:text-lg text-blackshade text-center">
              Celebrate love the Indian way, where tradition meets destiny.
              Discover your life partner with our trusted matrimonial platform,
              crafted for families seeking meaningful connections.
            </div>
          </div>
          <div className="md:h-full md:w-1/2 w-full max-w-xl flex justify-center items-center pb-6 md:pb-0">
            <div className="border border-gray-300 bg-whiteshade p-2 w-full md:w-3/4 shadow-md flex flex-col items-center justify-center">
              <Image
                src={BackgroundImage}
                alt="BackgroundImage"
                placeholder="blur"
                priority
              />
              <div
                className={`bg-whiteshade w-full sm:w-5/6 min-h-16 text-primary text-2xl sm:text-3xl md:text-4xl ${cursive.className} p-3 sm:p-4 text-center`}>
                {" "}
                <div className="-rotate-1">
                  {" "}
                  Find your happily ever after...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <WhyUs />
      <MarigoldSection />
      <AboutFounder />
    </div>
  );
}
