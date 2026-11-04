
"use client";

import Link from "next/link";
import { useFavoritesStore } from "../../store/FavoritesStore";
import { useCartStore } from "../../store/cartStore";

export default function Header() {
  const favoriteCount = useFavoritesStore(
    (state) => state.favorites.length
  );

  const cartCount = useCartStore((state) =>
    state.cart.reduce(
      (total, item) => total + (item.quantity || 1),
      0
    )
  );

  return (
    <header
      className="
        w-full
        border-b border-border
        bg-background
        text-foreground
        transition-colors duration-300
      "
    >
      <nav
        aria-label="Main navigation"
        className="
          mx-auto
          grid
          w-full
          max-w-7xl
          grid-cols-2
          items-center
          gap-4
          px-4 py-4
          sm:px-6
          md:grid-cols-[1fr_360px_1fr]
          md:gap-6
          md:px-8
          md:py-5
        "
      >
        {/* NAVIGATION LINKS */}
        <ul
          className="
            flex
            items-center
            justify-start
            gap-5
            p-0
            m-0
            list-none
            sm:gap-8
          "
        >
          <li>
            <Link
              href="/"
              className="
                text-xs font-semibold uppercase tracking-wide
                text-foreground transition-colors duration-200
                hover:text-foreground/50 sm:text-sm
              "
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/products"
              className="
                text-xs font-semibold uppercase tracking-wide
                text-foreground transition-colors duration-200
                hover:text-foreground/50 sm:text-sm
              "
            >
              Products
            </Link>
          </li>

          <li>
            <Link
              href="/favorites"
              className="
                flex items-center gap-1
                whitespace-nowrap
                text-xs font-semibold uppercase tracking-wide
                text-foreground transition-colors duration-200
                hover:text-primary sm:text-sm
              "
            >
              <span className="text-lg">♥</span>
              <span>Favorites ({favoriteCount})</span>
            </Link>
          </li>
        </ul>

        {/* SEARCH FORM */}
        <form
          action="/products"
          method="GET"
          className="
            col-span-2 row-start-2
            flex w-full items-center gap-3
            rounded-md border border-border
            bg-background-secondary
            px-4 py-3
            transition-colors duration-200
            focus-within:border-primary
            md:col-span-1 md:col-start-2 md:row-start-1
          "
        >
          <button
            type="submit"
            aria-label="Search"
            className="
              flex shrink-0 items-center justify-center
              bg-transparent text-text-secondary
              transition-colors hover:text-primary
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>

          <input
            type="search"
            name="search"
            placeholder="Search products..."
            aria-label="Search products"
            autoComplete="off"
            className="
              w-full min-w-0
              bg-transparent text-sm text-foreground
              outline-none placeholder:text-text-secondary
            "
          />
        </form>

        {/* SHOPPING CART */}
        <Link
          href="/cart"
          className="
            flex items-center justify-self-end gap-2
            whitespace-nowrap
            text-xs font-semibold uppercase tracking-wide
            text-foreground transition-colors duration-200
            hover:text-foreground/50 sm:text-sm
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>

          <span>Cart ({cartCount})</span>
        </Link>
      </nav>
    </header>
  );
}
