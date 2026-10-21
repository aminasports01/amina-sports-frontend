import Link from "next/link";
import { getProducts } from "@/services/product.service";
import { IProduct } from "@/types/products.type";
import { ProductCard1 } from "@/components/product-card1";

const TopDeal = async () => {
  const data = await getProducts({
    isFeatured: true,
    limit: 10,
  });

  const isProducts: IProduct[] = data?.data?.data || [];

  return (
    <div className="w-full  ">
      <div className="container mx-auto sm:px-4 md:px-5 lg:px-0">
        {/* Header Section */}
        <div className="my-5 px-3 flex items-center justify-between gap-3 sm:mb-6 md:mb-8">
          <h2 className="text-lg font-bold text-gray-800 sm:text-xl md:text-2xl lg:text-3xl">
            New Arrivals
          </h2>

          <Link
            href="/products"
            className="text-base text-foreground hover:opacity-60 transition-opacity underline underline-offset-4"
          >
            <span>View All</span>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 lg:gap-4 xl:grid-cols-5">
          {isProducts.slice(0, 5).map((product) => {
            return (
              <ProductCard1
                key={product.id}
                product={product}
                isFeatured={true}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopDeal;
