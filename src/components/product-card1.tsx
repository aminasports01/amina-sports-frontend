import Image from "next/image";
import Link from "next/link";
import { IProduct } from "@/types/products.type";

interface ProductCard1Props {
  product: IProduct;
  isFeatured?: boolean;
}

const ProductCard1 = ({ product }: ProductCard1Props) => {
  const hasDiscount =
    product.specialPrice != null &&
    product.specialPrice > 0 &&
    product.specialPrice < product.price;

  // const discountPercent = hasDiscount
  //   ? Math.round(
  //       ((product.price - product.specialPrice!) / product.price) * 100,
  //     )
  //   : 0;

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <article>
        {/* PRODUCT IMAGE */}
        <div className="relative aspect-3/4 w-full max-h-100 overflow-hidden bg-white md:max-h-105 2xl:max-h-150">
          {product.thumbnail ? (
            <Image
              src={product.thumbnail}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain object-center transition-transform duration-500 sm:group-hover:scale-105"
              quality={90}
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-400">
              No Image
            </div>
          )}
        </div>

        {/* PRODUCT INFORMATION */}
        <div className="sm:px-0 px-3.5 pb-1">
          {/* PRODUCT BRAND */}
          <p className="font-body text-base 2xl:text-xl font-semibold text-foreground leading-snug mt-2">
            {product.brand}
          </p>
          {/* PRODUCT NAME */}
          <p className="font-body text-base font-medium text-foreground leading-snug truncate">
            {product.name}
          </p>

          {/* PRICE */}
          <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            {hasDiscount ? (
              <>
                {/* Discount Price */}
                <span className="font-body text-base font-bold leading-snug text-red-600">
                  ৳{product.specialPrice!.toLocaleString("en-BD")}
                </span>

                {/* Original Price */}
                <span className="font-body text-sm leading-snug text-gray-500 line-through dark:text-gray-400">
                  ৳{product.price.toLocaleString("en-BD")}
                </span>

                {/* Discount Percentage */}
                {/* <span className="text-xs font-semibold text-green-700 dark:text-green-400">
                  -{discountPercent}%
                </span> */}
              </>
            ) : (
              /* Regular Price */
              <span className="font-body text-base font-bold leading-snug text-gray-900 dark:text-white">
                ৳{product.price.toLocaleString("en-BD")}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
};

export { ProductCard1 };
