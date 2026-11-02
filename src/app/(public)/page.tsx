import Banner from "@/components/layouts/public/banner/Banner";
import AnnouncementBanner from "@/components/layouts/public/navbar/AnnouncementBanner";

import Products from "@/components/layouts/public/product/Products.";
import PromoBanner from "@/components/layouts/public/Promo-Banner/PromoBanner";
import TopDeal from "@/components/layouts/public/topdeal/TopDeal";

export default function Home() {
  return (
    <div>
      <AnnouncementBanner></AnnouncementBanner>
      <Banner></Banner>
      <div className="container mx-auto px-0 md:px-2">
        <TopDeal></TopDeal>
      </div>
      <div className="container mx-auto px-2">
        <PromoBanner></PromoBanner>
      </div>
      <div className="container mx-auto px-0 md:px-2">
        <Products></Products>
      </div>
    </div>
  );
}


