import Categories from "@/src/components/Categories";
import Footer from "@/src/components/Footer";
import HomePageCTA from "@/src/components/HomePageCTA";
import SearchFilter from "@/src/components/Search/SearchFilter";
import FeaturedProduct from "@/src/components/Product/FeaturedProduct";
import React from "react";
import GoogleAd from "@/src/components/Ads";
import { CreditCard, HandCoins, Package } from "lucide-react";
import CustomAd from "@/src/components/CustomAd";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HomePageCTA />

      <div className="mx-2 px-3 py-4 sm:px-4 sm:py-6 lg:px-4">
        <header className="text-center mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-[#65A30D] sm:text-3xl">
            Our Product Collection
          </h2>
          <span className="text-[#6B7280] text-sm">Discover Amazing Deals</span>
          <p className="my-4 text-base text-gray-500">
            Shop the latest tech with exclusive offers. Lorem ipsum, dolor sit
            amet consectetur adipisicing elit.
          </p>
        </header>

        <div className="flex flex-wrap items-center justify-center gap-5 my-4">
          <SearchFilter />
        </div>

        {/* Content layout */}
        <div className="w-full flex flex-col lg:flex-row justify-between gap-5">
          <section>
            <Categories
              categoryTitle={process.env.NEXT_PUBLIC_CATEGORY1!}
              displayAllProducts={false}
            />
            <Categories
              categoryTitle={process.env.NEXT_PUBLIC_CATEGORY2!}
              displayAllProducts={false}
            />
            <CustomAd />
          </section>

          <section>
            <FeaturedProduct />
            <FeaturedProduct />
          </section>
        </div>
      </div>

      <section>
        <GoogleAd adSlot="G-9876543210" /> {/* Replace with your ad slot */}
      </section>

      <section className="bg-gray-100 mb-2 --max-w-7xl mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <Package
              className="mx-auto transition hover:scale-105 text-lime-600"
              size={78}
            />
            <h3 className="text-xl font-semibold">Free Shipping</h3>
            <p className="text-gray-600">On orders over NGN 100,000</p>
          </div>
          <div className="text-center space-y-4">
            <HandCoins
              className="mx-auto transition hover:scale-105 text-lime-600"
              size={78}
            />
            <h3 className="text-xl font-semibold">Money Back</h3>
            <p className="text-gray-600">30 day guarantee</p>
          </div>
          <div className="text-center space-y-4">
            <CreditCard
              className="mx-auto transition hover:scale-105 text-lime-600"
              size={78}
            />
            <h3 className="text-xl font-semibold">Secure Payment</h3>
            <p className="text-gray-600">100% secure checkout</p>
          </div>
        </div>
      </section>

      <div className="px-10 mx-auto">
        <Categories
          categoryTitle={process.env.NEXT_PUBLIC_CATEGORY3!}
          displayAllProducts={false}
        />
      </div>

      {/* <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
     */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#65A30D] sm:text-3xl">
            Our Featured Partners
          </h2>
          <p className="mt-2 text-gray-500 text-sm sm:text-base">
            We collaborate with top brands to bring you the best products and
            services.
          </p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-6 overflow-x-auto px-4 py-3 scrollbar-hide">
          {[
            "hughwade.jpeg",
            "hughwade2.jpeg",
            "loanplus.jpeg",
            "lgs.jpeg",
            "stanbic.jpeg",
          ].map((t, i) => (
            <Image
              src={`/partners/${t}`}
              key={i + 1}
              alt={`Partner ${i + 1}`}
              className="h-24 sm:h-36 w-24 sm:w-36 object-top rounded-full"
              width={100}
              height={100}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
