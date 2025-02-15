import {
  FacebookFilled,
  InstagramOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { Headset, Target } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="--bg-white bg-lime-500/50 text-base">
      <div className="mx-auto --max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <Link href="/" className="text-lime-600">
              <Target size={44} />
            </Link>

            <div className="flex gap-4 mt-2 ml-1 items-center">
              <Headset strokeWidth={2.1} size={32} />

              <div>
                <p>Got Questions? Call us!</p>
                <p className="font-bold">
                  {process.env.NEXT_PUBLIC_PHONE_NUMBERS}
                </p>
              </div>
            </div>

            <p className="mt-4 max-w-lg text-gray-500">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse non
              cupiditate quae nam molestias.
            </p>

            <ul className="mt-8 flex gap-6">
              <li>
                <Link
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-lg transition hover:opacity-75"
                >
                  <span className="sr-only">Facebook</span>

                  <FacebookFilled className="text-xl" size={30} />
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-xl transition hover:opacity-75"
                >
                  <span className="sr-only">Instagram</span>

                  <InstagramOutlined />
                </Link>
              </li>

              <li>
                <Link
                  href={`https://web.whatsapp.com/send?phone=${process.env.NEXT_PUBLIC_WHATSAPP}`}
                  rel="noreferrer"
                  target="_blank"
                  className="text-xl transition hover:opacity-75"
                >
                  <span className="sr-only">WhatsApp</span>

                  <WhatsAppOutlined />
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-xl transition hover:opacity-75"
                >
                  <span className="sr-only">Twitter</span>

                  <svg
                    className="size-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            <div>
              <p className="font-medium text-gray-900">Services</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    {" "}
                    1on1 Coaching{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    {" "}
                    Company Review{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    {" "}
                    Accounts Review{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    {" "}
                    HR Consulting{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    {" "}
                    SEO Optimisation{" "}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900">Company</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    {" "}
                    About{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    {" "}
                    Meet the Team{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    {" "}
                    Accounts Review{" "}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900">Helpful Links</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    {" "}
                    Contact{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    {" "}
                    FAQs{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    {" "}
                    Live Chat{" "}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900">Legal</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    {" "}
                    Accessibility{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    {" "}
                    Returns Policy{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    {" "}
                    Refund Policy{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    {" "}
                    Hiring Statistics{" "}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()}.{" "}
          {process.env.NEXT_PUBLIC_COMPANY_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
