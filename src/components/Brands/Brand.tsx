"use client";

import { RootState, useAppDispatch } from "@/lib/store/store";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import BreadCrumb from "../BreadCrumb";
import { fetchBrands } from "@/lib/store/actions/Brands";
import { seedBrandData } from "@/lib/actions/brands";

const Brand = ({ partnerBrands }: { partnerBrands: IBrand[] }) => {
  const dispatch = useAppDispatch();

  console.log(partnerBrands);

  useEffect(() => {

      if (!partnerBrands.length) {
        seedBrandData();
      }


    dispatch(fetchBrands());
  }, [dispatch, partnerBrands.length]);

  return (
    <div className="mx-6">
      <BreadCrumb />
      <h2 className=" font-bold text-lime-600 mt-4 text-3xl">
        Associated Brands
      </h2>

      <div className="relative my-5 flex flex-row max-md:flex-col max-md:space-y-5 gap-4 border border-gray-600 px-4 py-5">
        <div className="w-full flex flex-wrap gap-2 items-center justify-evenly">
          {(partnerBrands ??= []).length >= 1 &&
            (partnerBrands ??= []).map((partner) => (
              // <Partner key={partner.slug} partner={partner} />
              <Link href={`/brand/${partner.slug}`} key={partner.slug}>
                <Image
                  src={partner.image}
                  alt={partner.name}
                  className="w-40 h-32 rounded-full contain-content object-contain"
                  width={600}
                  height={600}
                />

                <p className="font-semibold text-center">{partner.name}</p>
              </Link>
            ))}
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  partnerBrands: state.products.partnerBrands,
});

export default connect(mapStateToProps, {})(Brand);
