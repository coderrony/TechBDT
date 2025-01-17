"use client";

import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import Heading from "@/components/Heading/Heading";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";

interface SectionSliderProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  headingFontClassName?: string;
  headingClassName?: string;
  subHeading?: string;
  children: ReactNode;
}

const SectionSlider: FC<SectionSliderProps> = ({
  className = "",
  itemClassName = "",
  headingFontClassName,
  headingClassName,
  heading,
  subHeading = "REY backpacks",
  children,
}) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const OPTIONS: Partial<Glide.Options> = {
      perView: 5,
      gap: 30,
      bound: true,
      autoplay: 3000,
      hoverpause: true,
      breakpoints: {
        1280: { perView: 4 },
        1024: { gap: 20, perView: 4 },
        768: { gap: 20, perView: 3 },
        640: { gap: 20, perView: 1.5 },
        500: { gap: 20, perView: 1.3 },
      },
    };

    if (!sliderRef.current) {
      console.error("Slider reference is null. Ensure the element exists.");
      return;
    }

    const sliderElement = sliderRef.current;
    let glideInstance: Glide | null = null;

    try {
      glideInstance = new Glide(sliderElement, OPTIONS);
      glideInstance.mount();
      setIsInitialized(true);
    } catch (error) {
      console.error("Error mounting the Glide slider:", error);
     
    }

    return () => {
      if (glideInstance) {
        glideInstance.destroy();
      }
    };
  }, []);

  return (
    <div className={`nc-SectionSliderProductCard ${className}`}>
      <div ref={sliderRef} className={`flow-root ${isInitialized ? "" : "invisible"}`}>
        <Heading
          className={headingClassName}
          fontClass={headingFontClassName}
          rightDescText={subHeading}
          hasNextPrev
        >
          {heading || `New Arrivals`}
        </Heading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">{children}</ul>
        </div>
      </div>
    </div>
  );
};

export default SectionSlider;
