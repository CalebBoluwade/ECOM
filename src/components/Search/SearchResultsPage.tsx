// app/search/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Products from "../Product/Products";
import { RootState } from "@/lib/store/store";
import { connect } from "react-redux";
// import { productList } from "@/lib/utils/products";

// Mock API function - replace with your actual API call
const searchAPI = async (
  query: string,
  products: IProduct[]
): Promise<IProduct[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return products.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
  );
};

const SearchResults = ({ products }: { products: IProduct[] }) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [results, setResults] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const searchResults = await searchAPI(query, products);
        console.log(searchResults);
        setResults(query ? searchResults : products);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch search results");
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, products]);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Search metadata */}
        {query && !loading && !error && (
          <div className="mb-6">
            <h1 className="text-lg text-gray-700">
              Search results for &quot; {query} &quot;
            </h1>
            <p className="text-sm text-gray-500">
              Found {results.length} results
            </p>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="p-4 text-red-500 bg-red-50 rounded-md">{error}</div>
        )}

        {/* No results */}
        {!loading && query && results.length === 0 && !error && (
          <div className="text-center text-gray-500 py-8">
            No results found for &quot; {query} &quot;
          </div>
        )}

        {/* Results list */}
        <div className="space-y-6">
          <Products products={results} displayAllProducts />
        </div>
      </main>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  products: state.products.allProducts,
});

export default connect(mapStateToProps)(SearchResults);
