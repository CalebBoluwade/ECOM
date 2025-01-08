"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { debounce } from "lodash";
import { Search } from "lucide-react";
import { Modal } from "antd";

const SearchComponent = () => {
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchTerm, setSearchTerm] = useState<string>(query ?? "");
  const [deferredSearchTerm, setDeferredSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Create a debounced function that updates the deferred search term
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        if (value.trim()) {
          setDeferredSearchTerm(value);
          setIsLoading(false);
        }
      }, 500),
    []
  );

  // Update the search term immediately and trigger the debounced search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value.trim());
    setIsLoading(true);
    debouncedSearch(value.trim());
  };

  // Cleanup debounce on unmount
  useEffect(() => {
    // if (query && searchRef.current) searchRef.current?.value = query;

    return () => debouncedSearch.cancel();
  }, [debouncedSearch, query]);

  const handleSubmit = (e: React.FormEvent) => {
    console.timeLog();
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search_results?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full --max-w-2xl p-4"
    >
      <div className="relative">
        <input
          type="text"
          ref={searchRef}
          value={searchTerm}
          onChange={handleSearchChange}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lim-500"
          placeholder="Search..."
        />

        {isLoading && searchTerm && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div className="animate-spin h-5 w-5 border-2 border-gray-500 rounded-full border-t-transparent"></div>
          </div>
        )}

        <button
          onClick={handleSubmit}
          title="t"
          type="button"
          className="z-10 absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        >
          <Search className="cursor-pointer h-5 w-5 text-gray-400" />
        </button>
      </div>

      {/* Debug information */}
      {!searchTerm ? (
        <Modal className="border p-4 rounded w-full bg-zinc-700 d absolute z-10 mt-4 text-sm text-gray-600">
          <p>Immediate value: {searchTerm}</p>
          <p>Debounced value: {deferredSearchTerm}</p>
        </Modal>
      ) : null}

      {/* <button title="t" type="submit" className="z-10 pl-3 flex items-center ">
        <Search className="cursor-pointer h-5 w-5 text-gray-400" />
      </button> */}
    </form>
  );
};

export default SearchComponent;
