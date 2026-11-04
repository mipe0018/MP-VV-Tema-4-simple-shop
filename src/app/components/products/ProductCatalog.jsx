
"use client";

import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";

import ProductFilters from "./ProductFilters";
import ProductCard from "./ProductCard";

export default function ProductCatalog({
  products = [],
  searchTerm = "",
  children,
}) {
  // HIGHEST PRODUCT PRICE
  const highestPrice = Math.ceil(
    Math.max(
      0,
      ...products
        .filter((product) => product.category === "groceries")
        .map((product) => Number(product.price) || 0)
    )
  );

  // FILTER STATES
  const [maxPrice, setMaxPrice] = useState(highestPrice);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("groceries");
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);

  // UPDATE MAX PRICE WHEN PRODUCTS LOAD
  useEffect(() => {
    setMaxPrice(highestPrice);
  }, [highestPrice]);

  // RESET FILTERS
  const resetFilters = () => {
    setMaxPrice(highestPrice);
    setMinRating(0);
    setSortBy("default");
    setSelectedCategory("groceries");
    setOnlyDiscounted(false);
  };

  // FUSE SEARCH
  const fuse = useMemo(() => {
    return new Fuse(products, {
      keys: ["title", "description", "category"],
      threshold: 0.3,
      ignoreLocation: true,
      minMatchCharLength: 2,
    });
  }, [products]);

  // SEARCH PRODUCTS
  const searchedProducts = useMemo(() => {
    const query = searchTerm.trim();

    if (!query) {
      return products;
    }

    return fuse.search(query).map((result) => result.item);
  }, [searchTerm, fuse, products]);

  // FILTER PRODUCTS
  const filteredProducts = useMemo(() => {
    return searchedProducts.filter((product) => {
      const price = Number(product.price);
      const rating = Number(product.rating);
      const discount = Number(product.discountPercentage);

      const matchesCategory =
        product.category === "groceries" &&
        (selectedCategory === "all" ||
          product.category === selectedCategory);

      const matchesPrice = price <= maxPrice;
      const matchesRating = rating >= minRating;

      const matchesDiscount =
        !onlyDiscounted ||
        (Number.isFinite(discount) &&
          Math.round(discount) > 0 &&
          discount < 100);

      return (
        matchesCategory &&
        matchesPrice &&
        matchesRating &&
        matchesDiscount
      );
    });
  }, [
    searchedProducts,
    maxPrice,
    minRating,
    selectedCategory,
    onlyDiscounted,
  ]);

  // SORT PRODUCTS
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortBy]);

  return (
    <section className="flex flex-col gap-6 md:flex-row">

      {/* FILTER SIDEBAR */}
      <div className="w-full shrink-0 md:w-64">
        <ProductFilters
          categories={["groceries"]}
          maxPrice={maxPrice}
          highestPrice={highestPrice}
          setMaxPrice={setMaxPrice}
          minRating={minRating}
          setMinRating={setMinRating}
          sortBy={sortBy}
          setSortBy={setSortBy}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onlyDiscounted={onlyDiscounted}
          setOnlyDiscounted={setOnlyDiscounted}
          resetFilters={resetFilters}
        />
      </div>

      {/* PRODUCT CATALOG */}
      <div className="min-w-0 flex-1">

        {/* PRODUCT HERO */}
        {children && (
          <div className="mb-8 w-full">
            {children}
          </div>
        )}

        {/* PRODUCT COUNT */}
        <div
          id="products"
          className="mb-4 flex items-center justify-between"
        >
          <p className="text-sm text-text-secondary">
            Showing {sortedProducts.length} products
          </p>
        </div>

        {/* PRODUCT GRID */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-border p-8 text-center">
            <h3 className="mb-2 font-semibold">
              No products found
            </h3>

            <p className="mb-4 text-sm text-text-secondary">
              Try changing your search or filters.
            </p>

            <button
              onClick={resetFilters}
              className="text-sm font-medium text-primary hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
