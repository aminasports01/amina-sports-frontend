import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { IProduct } from "@/types/products.type";

interface ProductCard1Props {
  product: IProduct;
  isFeatured?: boolean;
}

const ProductCard1 = ({ product }: ProductCard1Props) => {
  const salePrice = product.specialPrice ?? product.price;

  const hasDiscount =
    product.specialPrice != null && product.specialPrice < product.price;

  const discountPercent =
    hasDiscount && product.price > 0
      ? Math.round(((product.price - salePrice) / product.price) * 100)
      : 0;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block h-full min-w-0"
    >
      <article className="flex h-full flex-col bg-white dark:bg-slate-900">
        {/* PRODUCT IMAGE */}
        <div className="w-full overflow-hidden bg-[#f1f1f1] dark:bg-slate-800">
          <AspectRatio ratio={1} className="w-full">
            {product.thumbnail ? (
              <Image
                src={product.thumbnail}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-gray-400">
                No Image
              </div>
            )}
          </AspectRatio>
        </div>

        {/* PRODUCT INFORMATION */}
        <div className="flex flex-1 flex-col gap-1 px-2 py-2 sm:px-2.5 sm:py-2.5">
          {/* PRODUCT NAME */}
          <h3 className="line-clamp-2 text-sm leading-snug font-semibold text-gray-900 dark:text-gray-100">
            {product.name}
          </h3>

          {/* SHORT DESCRIPTION */}
          {product.description && (
            <p className="line-clamp-2 text-sm leading-snug font-normal text-gray-600 dark:text-gray-400">
              {product.description}
            </p>
          )}

          {/* PRICE */}
          <div className="mt-0.5 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
            <span className="text-base leading-snug font-semibold text-gray-900 dark:text-white">
              ৳{salePrice.toLocaleString("en-BD")}
            </span>

            {/* {hasDiscount && (
              <>
                <span className="text-sm text-gray-500 line-through">
                  ৳{product.price.toLocaleString("en-BD")}
                </span>

                <span className="text-sm font-medium text-emerald-600">
                  {discountPercent}% off
                </span>
              </>
            )} */}
          </div>
        </div>
      </article>
    </Link>
  );
};

export { ProductCard1 };
