import React from "react";

const OrderSuccess = () => {
  return (
    <section className="container mx-auto rounded-3xl shadow-2xl">
      <div className="p-8 text-center sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-lime-500">
          Your order is on the way
        </p>

        <h2 className="mt-6 text-3xl font-bold">
          Thanks for your purchase, we&apos;re getting it ready!
        </h2>

        <a
          className="mt-8 inline-block w-full rounded-full bg-lime-600 py-4 text-sm font-bold text-white shadow-xl"
          href="#"
        >
          Track Order
        </a>
      </div>
    </section>
  );
};

export default OrderSuccess;