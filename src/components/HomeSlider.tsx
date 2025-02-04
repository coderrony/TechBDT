"use client"
import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import Image from 'next/image';
import '../styles/homeSlider.css';

interface HomeSliderProps {
  slides: any[]; // Array of image URLs
}

const HomeSlider: FC<HomeSliderProps> = ({ slides }) => {
  return (
    <div className="w-full h-full">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
           
              <Image
                width={500}
                height={200}
                src={slide}
                alt={`Slide ${index + 1}`}
                
              />
        
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeSlider;