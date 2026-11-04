
"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "../../store/cartStore";
import { useFavoritesStore } from "../../store/FavoritesStore";

export default function ProductCard({
  product,
  compact = false,
  heroCard = false,
}) {
  const [quantity, setQuantity] = useState(1);

  const addToCart = useCartStore((state) => state.addToCart);

  const toggleFavorite = useFavoritesStore(
    (state) => state.toggleFavorite
  );

  const isFavorite = useFavoritesStore((state) =>
    state.favorites.some((item) => item.id === product.id)
  );

  // Ændr antal
  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  // Tilføj valgt antal til kurven
  const handleAddToCart = (event) => {
    event.preventDefault();
    event.stopPropagation();

    addToCart(product, quantity);
    setQuantity(1);
  };

  // Tilføj eller fjern favorit
  const handleToggleFavorite = (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleFavorite(product);
  };

  return (
    <div
      className={`
        group
        overflow-hidden
        rounded-xl
        ${heroCard ? "bg-white" : "bg-secondary/20"}
        border border-border
        shadow-sm
        transition-all duration-200
        hover:-translate-y-1
        hover:shadow-lg
        ${compact ? "h-full" : ""}
      `}
    >
      {/* PRODUCT IMAGE */}
      <div className="relative">
        <Link href={`/products/${product.id}`} className="block">
          <div
            className={`
              overflow-hidden
              bg-background-secondary
              ${compact ? "aspect-[5/3]" : "aspect-square"}
            `}
          >
            {product.thumbnail ? (
              <img
                src={product.thumbnail}
                alt={product.title}
                className="
                  h-full
                  w-full
                  object-cover
                  transition-transform duration-300
                  group-hover:scale-105
                "
              />
            ) : (
              <p className="p-3 text-sm text-text-secondary">
                No image available
              </p>
            )}
          </div>
        </Link>

        {/* FAVORITE BUTTON */}
        <button
          type="button"
          onClick={handleToggleFavorite}
          aria-label={
            isFavorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
          className="
            absolute right-3 top-3 z-10
            flex h-9 w-9 items-center justify-center
            rounded-full bg-background shadow-md
            transition-all duration-200
            hover:scale-110 hover:bg-primary/10
          "
        >
          <span
            className={`text-xl ${
              isFavorite
                ? "text-red-500"
                : "text-text-secondary"
            }`}
          >
            {isFavorite ? "♥" : "♡"}
          </span>
        </button>
      </div>

      {/* PRODUCT INFORMATION */}
      <Link href={`/products/${product.id}`} className="block">
        <div className="p-3">
          <p className="mb-1 text-[10px] uppercase tracking-wider text-text-secondary">
            {product.category}
          </p>

          <h3
            className={`
              font-semibold text-foreground
              ${
                compact
                  ? "mb-1 line-clamp-1 text-sm"
                  : "mb-1 text-base"
              }
            `}
          >
            {product.title}
          </h3>

          {!compact && (
            <p className="mb-2 line-clamp-2 text-xs text-text-secondary">
              {product.description}
            </p>
          )}
        </div>
      </Link>

      {/* PRICE AND QUANTITY */}
      <div className="px-3 pb-3">
        <p
          className={`
            mb-3 font-semibold text-primary
            ${compact ? "text-sm" : "text-base"}
          `}
        >
          ${product.price.toFixed(2)}
        </p>

        {/* QUANTITY SELECTOR */}
        <div
          className="
            mb-3 flex items-center justify-between
            rounded-lg border border-border
            bg-background/50 p-1
          "
        >
          <span className="pl-2 text-xs text-text-secondary">
            Quantity
          </span>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className="
                flex h-8 w-8 items-center justify-center
                rounded-md bg-secondary/20
                text-foreground
                transition-colors
                hover:bg-secondary/50
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              −
            </button>

            <span
              className="
                min-w-4 text-center
                text-sm font-semibold text-foreground
              "
              aria-live="polite"
            >
              {quantity}
            </span>

            <button
              type="button"
              onClick={increaseQuantity}
              aria-label="Increase quantity"
              className="
                flex h-8 w-8 items-center justify-center
                rounded-md bg-secondary/20
                text-foreground
                transition-colors
                hover:bg-secondary/50
              "
            >
              +
            </button>
          </div>
        </div>

        {/* ADD TO CART */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="
            w-full rounded-lg
            bg-foreground px-4 py-2
            text-sm font-semibold text-background
            transition-all duration-200
            hover:opacity-80
            active:scale-[0.98]
          "
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
