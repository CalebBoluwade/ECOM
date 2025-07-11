"use client";

import { capitalizeFirstLetter } from "@/lib/utils/index";
import { ChevronRight, Store } from "lucide-react";
import Link from "next/link";
import React from "react";

const BreadCrumb = () => {
  const loc = typeof window !== "undefined" ? window.location.pathname : "";
  const paths = loc.split("/").filter((p) => p !== "");

  return (
    <nav aria-label="Breadcrumb" className="my-3">
      <ol className="flex items-center gap-1 text-sm text-gray-600">
        <li>
          <Link href="/" className="block transition hover:text-gray-700">
            <span className="sr-only"> Home </span>

            <Store size={16} strokeWidth={1.5} />
          </Link>
        </li>

        <li className="rtl:rotate-180">
          <ChevronRight size={12} strokeWidth={1.5} />
        </li>

        {paths.map((path, i) => (
          <React.Fragment key={i}>
            <li>
              <Link
                href={path}
                className="block transition hover:underline hover:text-gray-700"
              >
                {capitalizeFirstLetter(path)}
              </Link>
            </li>

            {i + 1 < paths.length ? (
              <li key={i} className="rtl:rotate-180">
                <ChevronRight size={12} strokeWidth={1.5} />
              </li>
            ) : null}
          </React.Fragment>
        ))}

        {/* <li>
          <a href="#" className="block transition hover:text-gray-700">
            {" "}
            Plain Tee{" "}
          </a>
        </li> */}
      </ol>
    </nav>
  );
};

export default BreadCrumb;
