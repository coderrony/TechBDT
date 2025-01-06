'use client';
import { FC, useState } from 'react';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Thumbs,Zoom, } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/zoom';
import 'swiper/css/thumbs';
import '../styles/productSlider.css';

interface ProductImageSliderProps {
  className?: string;
  images: string[];
}

const ProductImageSlider: FC<ProductImageSliderProps> = ({ images }) => {
  // Explicitly type thumbsSwiper as Swiper | null
  const [thumbsSwiper, setThumbsSwiper] = useState<null>(null);

  return (
    <section>
      <div>
        <Swiper
          loop={true} // Only enable loop if there are more than 5 images
          zoom={true}
          spaceBetween={1}
          navigation={true}
          thumbs={{
            swiper: thumbsSwiper ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Thumbs,Zoom]}
          className='top-slider w-full h-96 rounded-lg '>
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className='flex h-full w-full items-center justify-center swiper-zoom-container cursor-move'>
                <Image
                  width={1200}
                  height={1200}
                  src={image}
                
                  alt={ 'Image'}
                  className='block h-full w-full object-contain'
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Thumbnail */}
        <Swiper
          onSwiper={(swiper: any) => setThumbsSwiper(swiper)}
          loop={true}
          spaceBetween={0}
          slidesPerView={5}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          className=' swiper-wrapper rounded-lg '>
          {images.map((image, index) => (
            <SwiperSlide key={index} className='thumb-slide'>
              <button>
                <Image
                   width={300}
                   height={300}
                  src={image}
                  alt={'Image'}
                  className='block h-full w-full object-contain'
                />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ProductImageSlider;
