"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Swiper Modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { RootState } from "@/lib/store/store";
import Link from "next/link";
import { connect } from "react-redux";
import Image from "next/image";

const HomePageCTA = () => {
  const slides = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1678852524356-08188528aed9?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Slide 1",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1707167144682-5de04050ad18?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Slide 2",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1678851836066-dc27614cc56b?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Slide 3",
    },
  ];

  return (
    <>
      {/* <section className="overflow-hidden bg-[url(https://images.unsplash.com/photo-1707167144682-5de04050ad18?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-top bg-no-repeat h-96">
        <div className="bg-black/50 h-96 flex items-center justify-center p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="text-center ltr:sm:text-left rtl:sm:text-right">
            <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-5xl">
              Latest Technologies. Best Prices
            </h2>

            <p className="hidden --max-w-lg text-center text-white/90 md:mt-6 md:block md:text-lg md:leading-relaxed">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Inventore officia corporis quasi doloribus iure architecto quae
              voluptatum beatae excepturi dolores.
            </p>

            <div className="mt-4 sm:mt-8">
              <Link
                href="#"
                className="inline-block rounded-full bg-lime-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent focus:outline-none focus:ring focus:ring-yellow-400"
              >
                Get Yours Today
              </Link>
            </div>
          </div>
        </div>
      </section> */}

      <div className="w-full h-full bg-[#F7F7F7] py-16 my-16">
        <div className="w-full max-w-[1250px] mx-auto px-4 py-6 relative overflow-hidden">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            className="rounded-lg h-full"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="grid md:grid-cols-2 items-center gap-6">
                  <div className="w-full h-full">
                    <Image
                      src="https://images.unsplash.com/photo-1678852524356-08188528aed9?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Slide 1"
                      className="w-full h-full object-cover"
                      width={200}
                      height={500}
                    />
                  </div>
                  <div className="text-center md:text-left flex flex-col justify-center items-center md:items-start">
                    <h2 className="text-2xl font-bold text-black sm:text-3xl md:text-5xl pb-10">
                      Latest Technologies.
                      Best Prices
                    </h2>
                    <p className="max-w-lg text-black/90 text-lg leading-relaxed">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Inventore officia corporis quasi doloribus iure architecto
                      quae voluptatum beatae excepturi dolores.
                    </p>
                    <div className="mt-4 sm:mt-8">
                      <Link
                        href="#"
                        className="inline-block rounded-full bg-lime-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-lime-600 border border-lime-600 focus:outline-none focus:ring focus:ring-yellow-400"
                      >
                        Get Yours Today
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  ctaFeatured: state.products.allProducts,
});

export default connect(mapStateToProps)(HomePageCTA);
