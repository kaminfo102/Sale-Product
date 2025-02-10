"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import Image from "next/image"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    title: "آموزش محاسبات ذهنی",
    description: "تقویت مهارت‌های ریاضی با روش‌های نوین",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1530893609608-32a9af3aa95c",
    title: "دوره‌های رباتیک",
    description: "یادگیری علوم رباتیک به صورت عملی",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
    title: "کلاس‌های خلاقیت",
    description: "پرورش خلاقیت و نوآوری در کودکان",
  },
]

export function HeroSlider() {
  return (
    <div className="relative h-[400px] md:h-[600px]">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h2 className="text-4xl font-bold md:text-6xl">{slide.title}</h2>
                <p className="mt-4 text-xl md:text-2xl">{slide.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}