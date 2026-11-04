
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ProductCard from "./products/ProductCard";

export default function Hero() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const scrollRef = useRef(null);

  // FETCH PRODUCTS
  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch(
          "https://dummyjson.com/products/category/groceries?limit=8"
        );

        if (!response.ok) {
          throw new Error("Could not fetch products");
        }

        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        console.error("Product loading error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  // CAROUSEL SCROLL
  function scrollProducts(direction) {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;

      scrollRef.current.scrollBy({
        left: direction * scrollAmount,
        behavior: "smooth",
      });
    }
  }

  return (
    <section
      className="
        w-full
        bg-gradient-to-br
        from-secondary
        to-background
        transition-colors duration-300
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          px-4 py-6
          sm:px-8 sm:py-7
          lg:px-10 lg:py-8
        "
      >
        {/* HERO CONTENT */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            items-center
            gap-5
            sm:gap-6
            lg:gap-10
            min-h-64
          "
        >
          {/* HERO TEXT */}
          <div className="max-w-[30rem] sm:pl-4">
            <span
              className="
                inline-block
                mb-3
                text-[11px]
                font-bold
                tracking-[0.16em]
                uppercase
                text-accent
              "
            >
              FRESHNESS EVERY DAY
            </span>

            <h1
              className="
                mb-4
                text-[clamp(2.3rem,4vw,3.5rem)]
                tracking-[-0.04em]
                text-foreground
              "
            >
              From farm to
              <br />
              your kitchen.
            </h1>

            <p
              className="
                max-w-[23rem]
                mb-6
                text-[0.95rem]
                text-text-secondary
              "
            >
              Discover the freshest and finest groceries,
              delivered quickly and conveniently.
              Find your new everyday favourites.
            </p>
          </div>

          {/* HERO IMAGE */}
          <div
            className="
              flex
              items-center
              justify-center
              min-h-64
            "
          >
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=85"
              alt="Fresh vegetables and groceries"
              className="
                block
                w-full
                h-64
                object-cover
                object-center
                rounded-3xl
                shadow-lg
              "
            />
          </div>
        </div>

        {/* POPULAR PRODUCTS */}
        <div className="mt-5">
          {/* PRODUCTS HEADING */}
          <div
            className="
              flex
              items-center
              justify-between
              gap-4
              mb-3
            "
          >
            <div>
              <h2 className="text-xl text-foreground">
                Popular products
              </h2>

              <p className="mt-1 text-xs text-text-secondary">
                Discover our everyday favourites
              </p>
            </div>

            <Link
              href="/products"
              className="
                group
                inline-flex
                items-center
                gap-2
                whitespace-nowrap
                text-sm
                font-bold
                text-primary
                transition-opacity duration-300
                hover:opacity-60
              "
            >
              View all products

              <span
                className="
                  transition-transform duration-300
                  group-hover:translate-x-1
                "
              >
                →
              </span>
            </Link>
          </div>

          {/* LOADING STATE */}
          {loading && (
            <p className="text-sm text-text-secondary">
              Loading products...
            </p>
          )}

          {/* ERROR STATE */}
          {error && (
            <p className="text-sm text-text-secondary">
              Could not load products. Please try again later.
            </p>
          )}

          {/* PRODUCT CAROUSEL */}
          {!loading && !error && products.length > 0 && (
            <div
              className="
                flex
                items-center
                gap-3
                w-full
              "
            >
              {/* PREVIOUS BUTTON */}
              <button
                type="button"
                className="
                  grid
                  shrink-0
                  place-items-center
                  w-11 h-11
                  rounded-full
                  border border-primary
                  bg-primary
                  text-white
                  shadow-sm
                  transition-all duration-200
                  hover:!bg-white
                  hover:!text-primary
                  hover:scale-105
                  active:scale-95
                  focus-visible:outline-2
                  focus-visible:outline-foreground
                  focus-visible:outline-offset-2
                "
                onClick={() => scrollProducts(-1)}
                aria-label="Previous products"
              >
                ←
              </button>

              {/* PRODUCT SCROLL */}
              <div
                ref={scrollRef}
                className="
                  flex
                  flex-1
                  gap-4
                  min-w-0
                  overflow-x-auto
                  overflow-y-hidden
                  py-2
                  scroll-smooth
                  snap-x
                  snap-mandatory
                  [scrollbar-width:none]
                  [&::-webkit-scrollbar]:hidden
                  [-webkit-overflow-scrolling:touch]
                "
              >
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="
                      shrink-0
                      min-w-0
                      w-[175px]
                      sm:w-[210px]
                      lg:w-[230px]
                      snap-start
                    "
                  >
                    <ProductCard
                      product={product}
                      compact
                      heroCard
                    />
                  </div>
                ))}
              </div>

              {/* NEXT BUTTON */}
              <button
                type="button"
                className="
                  grid
                  shrink-0
                  place-items-center
                  w-11 h-11
                  rounded-full
                  border border-primary
                  bg-primary
                  text-white
                  shadow-sm
                  transition-all duration-200
                  hover:!bg-white
                  hover:!text-primary
                  hover:scale-105
                  active:scale-95
                  focus-visible:outline-2
                  focus-visible:outline-foreground
                  focus-visible:outline-offset-2
                "
                onClick={() => scrollProducts(1)}
                aria-label="Next products"
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
