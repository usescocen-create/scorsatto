import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { formatPrice, type Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/produto/$slug"
      params={{ slug: product.slug }}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-bone">
        <motion.img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          width={1200}
          height={1500}
          className="h-full w-full object-cover"
          initial={false}
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt=""
            loading="lazy"
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        )}
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-lg leading-tight text-foreground">
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {product.shortDescription}
          </p>
        </div>
        <p className="shrink-0 text-sm tabular-nums text-foreground">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}