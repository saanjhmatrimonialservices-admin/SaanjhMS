import MarigoldImage from "../../../public/Marigold.png";
import Image from "next/image";
export default function MarigoldSection(): React.ReactElement {
  return (
    <div className="w-full min-h-screen md:min-h-[50vh] relative overflow-hidden bg-whiteshade">
      <div className="w-full min-h-screen md:min-h-[50vh] relative flex flex-col items-center gap-12 px-4 sm:px-8 md:px-20 lg:px-60 py-12 md:py-20">
        <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blackshade text-center">
          A Celebration of Love and Tradition
        </div>
        <div className="flex flex-col items-center gap-8 h-full w-full justify-center text-justify">
          <div className="text-base md:text-lg 2xl:text-xl text-blackshade">
            In India, marriage is more than a union of two souls; it’s a sacred
            bond that weaves together families, traditions, and shared dreams.
            From vibrant pre-wedding rituals to the heartfelt vows exchanged
            under a floral mandap, every moment reflects the beauty of
            togetherness.
          </div>
          <div className="text-base md:text-lg 2xl:text-xl text-blackshade">
            Indian marriages are a tapestry of love, respect, and cultural
            heritage. Whether it’s the joyous beat of music during celebrations
            or the quiet moments of family blessings, these traditions create
            memories that last a lifetime. At{" "}
            <span className="text-primary">Saanjh</span>, we honor this journey
            by helping you find a partner who shares your values and vision for
            a life filled with love.
          </div>
          <div className="text-base md:text-lg 2xl:text-xl text-blackshade">
            Our services are designed to help you find a partner who not only
            complements your life but also cherishes the traditions and values
            that make Indian marriages so special. From finding compatibility to
            building trust with families, we’re here to support every step of
            your journey to forever.
          </div>
        </div>

        <Image
          src={MarigoldImage}
          alt="phool"
          width={400}
          height={400}
          className="top-1/2 absolute left-0 -translate-y-1/2 -translate-x-1/2 hidden md:block"
        />
        <Image
          src={MarigoldImage}
          alt="phool"
          width={400}
          height={400}
          className="top-1/2 absolute right-0 -translate-y-1/2 translate-x-1/2 hidden md:block"
        />
      </div>
      <div className="absolute"></div>
    </div>
  );
}
