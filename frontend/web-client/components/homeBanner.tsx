import React from "react";
import { Title } from "./ui/text";
import Link from "next/link";
import Image from "next/image";

const HomeBanner = () => {
  return (
    <div className="py-16 md:py-0 bg-brand-3 rounded-lg px-10 lg:px-24 flex items-center justify-between">
      <div>
        <Title>
          Grab Upto 50% off on <br />
          Selected headphone
        </Title>
        <Link
          href="/shop"
          className="bg-brand-6/90 rounded-md text-sm text-white/90 px-5 py-2
          hover:text-white hover:bg-brand-7 hoverEffect
          "
        >
          Buy Now
        </Link>
      </div>
      <div>
        <Image
          src="/Iphone17.webp"
          alt="Iphone 17 Banner"
          width={800}
          height={600}
          className="hidden md:inline-flex w-96"
        />
      </div>
    </div>
  );
};

export default HomeBanner;
