"use client";

import Script from 'next/script';
import { useEffect } from 'react';

const GoogleAd = ({ adSlot }: { adSlot: string }) => {
  useEffect(() => {
    if (typeof window !== "undefined" && window.adsbygoogle) {
      const timeout = setTimeout(() => {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          console.error("AdSense error:", e);
        }
      }, 300); // Delay by 300ms

      return () => clearTimeout(timeout);
    }
  }, []);

  return (
    <div className="flex justify-center items-center my-4 w-full">
       <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          onLoad={() => {
            // Once the script is loaded, initialize Google Analytics
            window.dataLayer = window.dataLayer || [];
            function gtag(...args: (string | Date)[]) {
              window.dataLayer.push(args);
            }

            gtag("js", new Date());
            gtag("config", "G-7XPN2JM2SC");
          }}
        />
    <ins
      className="adsbygoogle"
      style={{ display: "block", width: "100%", height: "auto" }}
        data-ad-client="ca-pub-1234567890123456" // Replace with your AdSense Publisher ID
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default GoogleAd;
