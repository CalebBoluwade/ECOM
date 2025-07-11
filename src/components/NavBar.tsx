"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Heart,
  Home,
  Menu,
  Package,
  ShoppingBag,
  Store,
  Target,
  UserRound,
  X,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SearchComponent from "./Search/Search";
import { connect } from "react-redux";
import {
  fetchDistinctCategories,
  fetchProducts,
} from "@/lib/store/actions/Products";
import { useAppDispatch, RootState } from "@/lib/store/store";
import { fetchBrands } from "@/lib/store/actions/Brands";
import { formatPrice } from "@/lib/utils/index";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

const NavBar = ({
  cartTotal,
}: // distinctCategories,
// products,
{
  cartTotal: number;
  distinctCategories: string[];
  products: IProduct[];
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openCategories, setOpenCategories] = useState<boolean>(false);
  const [cartVAT] = useState<number>(
    Number(process.env.NEXT_PUBLIC_VAT!) || 0.75
  );
  const [VAT, setVAT] = useState<number>(0);

  const dispatch = useAppDispatch();
  const [isShopOpen, setIsShopOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchBrands());
    dispatch(fetchDistinctCategories());
  }, []);

  useEffect(() => {
    setVAT(cartTotal * cartVAT);

    return () => setOpenCategories(false);
  }, [cartTotal, cartVAT]);

  // const distinctCategories = Array.from(
  //   new Set(products.map((x) => new Sex.categories))
  // );
  const menuItems = [
    { title: "Home", icon: Home, link: "#" },
    { title: "Categories", icon: Package, link: "/categories" },
    { title: "Stores", icon: Store, link: "/stores" },
  ];

  return (
    <nav
      //
      className="flex fixed top-0 left-0 right-0 bg-white/65 backdrop-blur-md h-16 border-b text-sm px-4 py-4 right justify-between items-center z-10 mb-5"
    >
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-20">
        <Link href="/" className="text-teal-600">
          <Target />
        </Link>

        {/* <div className="relative hidden lg:flex gap-3 items-center">
        <dl className="">
          <dt
            className="text-gray-700 transition duration-300 hover:text-lime-600 inline-flex items-center gap-1"
            onClick={() => setOpenCategories(!openCategories)}
          >
            <Link
              onClick={() => setOpenCategories(!openCategories)}
              href={"/categories/"}
            >
              Categories
            </Link>{" "}
            {openCategories ? (
              <ChevronDown size={16} strokeWidth={1.5} />
            ) : (
              <ChevronRight size={16} strokeWidth={1.5} />
            )}
          </dt>

          <dd
            className={`top-7 ${
              openCategories ? "block" : "hidden"
            } border transition duration-300 absolute w-36 space-y-3 bg-gray-100/50 rounded py-4`}
          >
            {distinctCategories.slice(0, 5).map((category, _) => (
              <span key={category + _}>
                <Link
                  href={"/categories/" + category.trim().toLowerCase()}
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:text-lime-600"
                >
                  {category}
                </Link>
              </span>
            ))}

            {distinctCategories.length > 5 && (
              <span>
                <Link
                  href={"/categories/"}
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:text-lime-600"
                >
                  More...
                </Link>
              </span>
            )}
          </dd>
        </dl>

        <Link href={"/brands"} className="text-gray-700 hover:text-lime-600">
          Brands
        </Link>

        <Link href={"#"} className="text-gray-700 hover:text-lime-600">
          Delivery
        </Link>

        <Link href={"/stores/"} className="text-gray-700 hover:text-lime-600">
          Stores
        </Link>
      </div> */}

        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-3">
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Link
                  href="/contact"
                  className="text-gray-700 hover:text-lime-600"
                >
                  Our Shop
                </Link>
              </NavigationMenuTrigger>
              <NavigationMenuContent className="mt-10">
                <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li>
                    <NavigationMenuLink
                      asChild
                      className={navigationMenuTriggerStyle()}
                    >
                      <Link
                        href="/categories"
                        className="block px-4 py-2 text-gray-700 hover:bg-lime-100 hover:text-lime-600"
                      >
                        Categories
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/brands"
                        className="block px-4 py-2 text-gray-700 hover:bg-lime-100 hover:text-lime-600"
                      >
                        Brands
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/delivery"
                        className="block px-4 py-2 text-gray-700 hover:bg-lime-100 hover:text-lime-600"
                      >
                        Delivery
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/stores"
                        className="block px-4 py-2 text-gray-700 hover:bg-lime-100 hover:text-lime-600"
                      >
                        Stores
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/contact"
                  className="text-gray-700 hover:text-lime-600"
                >
                  Contact Us
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/about"
                  className="text-gray-700 hover:text-lime-600"
                >
                  About Us
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* <div className="hidden sm:block">
        <SearchComponent />
      </div> */}

        <div className="flex items-center --gap-2">
          <Link
            href="/cart"
            className="md:hidden inline-flex items-center gap-2 w-max py-3 px-2"
          >
            <ShoppingBag className="w-5 h-5" />
            {`${formatPrice(cartTotal ? cartTotal + VAT : 0, "NGN")}`}
          </Link>
          <Menu className="md:hidden" onClick={() => setIsOpen(true)} />
        </div>

        <div className="hidden md:flex items-center --gap-2">
          <SearchComponent />

          {/* <Link
            href={"/auth"}
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="inline-flex items-center w-max border-r- py-3 px-2"
          >
            {session && session.user ? (
              <Image
                src={session.user.picture || session.user.image!}
                alt="Profile"
                className="w-8 h-8 rounded-full"
                width={100}
                height={100}
                onError={() => <UserRound />}
              />
            ) : (
              <UserRound />
            )}
          </Link> */}

          <Link
            href="/wishlist"
            className="inline-flex items-center w-max border-r- py-3 px-2"
          >
            <UserRound className="w-5 h-5" />
          </Link>

          <Link
            href="/wishlist"
            className="inline-flex items-center w-max border-r- py-3 px-2"
          >
            <Heart className="w-5 h-5" />
          </Link>

          <Link
            href="/cart"
            className="inline-flex items-center gap-2 w-max py-3 px-2"
          >
            <ShoppingBag className="w-5 h-5" />
            {`${formatPrice(cartTotal ? cartTotal + VAT : 0, "NGN")}`}
          </Link>
        </div>

        {/* <SignInModal
        isModalOpen={isModalOpen}
        openCloseSignInModal={setIsModalOpen}
      /> */}
        <div
          className={`h-full fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsOpen(false)}
        >
          <div
            className={`--fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <Link href="/" className="inline-flex gap-2 items-center">
                <Target className="text-teal-600" />
                <span className="text-xl font-bold">Menu</span>
              </Link>
              <button
                className="p-2 rounded-md hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                <span className="sr-only">close</span>
                <X className="text-red-400 h-6 w-6" size={24} />
              </button>
            </div>

            {/* Sidebar Content */}
            <div className="py-4 border-b">
              <SearchComponent />

              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={item.link}
                    className="flex items-center px-6 py-3 hover:bg-gray-100 transition-colors"
                  >
                    <Icon className="h-5 w-5 mr-3 text-gray-600" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state: RootState) => ({
  cartTotal: state.cart.totalPrice,
  products: state.products.allProducts,
  distinctCategories: state.products.filters.categories,
});

export default connect(mapStateToProps, {})(NavBar);
