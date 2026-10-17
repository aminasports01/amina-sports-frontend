import React from "react";
import { Mail, Phone, MapPin, Clock, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const categories = [
    { name: "Men's Shoes", link: "/products?category=Men" },
    { name: "Women's Shoes", link: "/products?category=Women" },
    { name: "Kids' Footwear", link: "/products?category=Kids" },
    { name: "Sneakers & Casual", link: "/products?sub=Sneakers" },
    { name: "Sports & Gym", link: "/products?sub=Gym-Sports" },
    { name: "Top Brands", link: "/products?sort=top-brands" },
  ];

  const quickLinks = [
    { name: "Home", link: "/" },
    { name: "All Shoes", link: "/products" },
    { name: "Featured Deals", link: "/products?sort=deals" },
    { name: "About Us", link: "/about" },
    { name: "Contact Us", link: "/contact" },
  ];

  const customerService = [
    { name: "Privacy Policy", link: "/privacy-policy" },
    { name: "Warranty Policy", link: "/warranty-policy" },
    { name: "Terms & Conditions", link: "/terms-conditions" },
    { name: "Return & Refund Policy", link: "/return-refund" },
    { name: "Size Guide", link: "/size-guide" },
  ];

  const SOCIAL_ICONS = [
    {
      title: "Facebook",
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/facebook-icon.svg",
      link: "https://facebook.com",
    },
    {
      title: "X",
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/x.svg",
      className: "dark:invert",
      link: "https://x.com",
    },
    {
      title: "Instagram",
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/instagram-icon.svg",
      link: "https://instagram.com",
    },
  ];

  return (
    <footer className="bg-card text-[var(--color-body)] border-t border-border transition-colors">
      {/* Main Footer */}
      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info Section */}
          <div className="space-y-4">
            {/* Minimalist Text Logo matching Theme Title Color */}
            <Link href="/" className="inline-block">
              <span className="text-xl md:text-2xl font-light tracking-[0.18em] uppercase text-[var(--color-title)] select-none">
                AMINA
                <span className="font-bold tracking-[0.22em] ml-1.5 text-primary">
                  SPORTS
                </span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-[var(--color-body)] leading-relaxed font-light">
              Premium quality footwear, sports shoes, and sneakers. Step into
              your style with authentic brands and everyday comfort.
            </p>

            {/* Contact Info */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center gap-3 text-xs sm:text-sm">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span className="text-[var(--color-body)]">
                  Sunamganj, Sylet (Online Store)
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <a
                  href="tel:+8801748456508"
                  className="text-[var(--color-body)] hover:text-primary transition-colors"
                >
                  +8801791-815131
                </a>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a
                  href="mailto:aminasports@gmail.com"
                  className="text-[var(--color-body)] hover:text-primary transition-colors"
                >
                  aminasports01@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm">
                <Clock className="h-4 w-4 text-primary shrink-0" />
                <span className="text-[var(--color-body)]">
                  24/7 Support: 9AM - 10PM
                </span>
              </div>
            </div>
          </div>

          {/* Categories Section */}
          <div>
            <h3 className="text-[var(--color-title)] font-semibold text-base sm:text-lg mb-4">
              Shoe Categories
            </h3>
            <ul className="space-y-2">
              {categories.map((category, idx) => (
                <li key={idx}>
                  <Link
                    href={category.link}
                    className="text-[var(--color-body)] hover:text-primary transition-colors duration-300 flex items-center gap-1.5 text-xs sm:text-sm group"
                  >
                    <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all duration-300 text-primary" />
                    <span>{category.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-[var(--color-title)] font-semibold text-base sm:text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.link}
                    className="text-[var(--color-body)] hover:text-primary transition-colors duration-300 flex items-center gap-1.5 text-xs sm:text-sm group"
                  >
                    <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all duration-300 text-primary" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service Section */}
          <div>
            <h3 className="text-[var(--color-title)] font-semibold text-base sm:text-lg mb-4">
              Customer Service
            </h3>
            <ul className="space-y-2">
              {customerService.map((service, idx) => (
                <li key={idx}>
                  <Link
                    href={service.link}
                    className="text-[var(--color-body)] hover:text-primary transition-colors duration-300 flex items-center gap-1.5 text-xs sm:text-sm group"
                  >
                    <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all duration-300 text-primary" />
                    <span>{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-6 mt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 sm:gap-6">
            {/* Copyright */}
            <div className="text-[var(--color-body)] text-xs sm:text-sm text-center">
              © {currentYear}{" "}
              <span className="font-semibold text-[var(--color-title)]">
                Amina Sports
              </span>
              . All rights reserved.
            </div>

            {/* Social Icons */}
            <div className="flex gap-4">
              {SOCIAL_ICONS.map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  aria-label={social.title}
                >
                  <Image
                    src={social.src}
                    alt={social.title}
                    width={20}
                    height={20}
                    className={`h-5 w-5 ${social.className || ""}`}
                  />
                </a>
              ))}
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-2 opacity-80">
              <Image
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/payment-methods/visa.svg"
                alt="Visa"
                height={20}
                width={32}
                className="h-5 w-auto"
              />
              <Image
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/payment-methods/mastercard.svg"
                alt="Mastercard"
                height={20}
                width={32}
                className="h-5 w-auto"
              />
              <Image
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/payment-methods/amex.svg"
                alt="American Express"
                height={20}
                width={32}
                className="h-5 w-auto"
              />
              <Image
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/payment-methods/paypal.svg"
                alt="PayPal"
                height={20}
                width={32}
                className="h-5 w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
