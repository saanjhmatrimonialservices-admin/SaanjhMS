import Image from "next/image";
import BackgroundImage from "../public/Background_Saanjh_Compressed.webp";
import { serif, cursive } from "./fonts";
import WhyUs from "./components/landing-page/why-us";
import MarigoldSection from "./components/landing-page/marigold-section";
import AboutFounder from "./components/about/about-founder";

export default function Home() {
  return (
    <div className="min-h-screen w-screen bg-whiteshade">
      <div className="w-full h-screen relative bg-gradient-to-r to-amber-600 from-secondary">
        <div className="absolute w-full h-full flex justify-center items-center">
          <div className="md:h-full md:w-1/2 h-1/2 w-full flex flex-col items-center justify-center gap-8 p-12">
            <div className="flex flex-col items-center justify-center ">
              <div
                className={`${serif.className} text-8xl font-semibold text-primary`}>
                Saanjh
              </div>
              <div className="text-2xl text-primary">Matrimonial Services</div>
            </div>
            <div className="text-lg text-blackshade text-center">
              Celebrate love the Indian way, where tradition meets destiny.
              Discover your life partner with our trusted matrimonial platform,
              crafted for families seeking meaningful connections.
            </div>
          </div>
          <div className="md:h-full md:w-1/2 h-1/2 w-full flex justify-center items-center">
            <div className="border border-gray-300 bg-whiteshade p-2 w-3/4 shadow-md flex flex-col items-center justify-center">
              <Image
                src={BackgroundImage}
                alt="BackgroundImage"
                placeholder="blur"
                priority
              />
              <div
                className={`bg-whiteshade w-3/4 h-20 text-primary text-4xl ${cursive.className} p-4 text-center`}>
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
