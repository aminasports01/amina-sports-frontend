import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const shopLinks = [
    { name: "Men's Shoes", link: "/products?category=Men" },
    { name: "Women's Shoes", link: "/products?category=Women" },
    { name: "Kids' Footwear", link: "/products?category=Kids" },
    { name: "All Shoes", link: "/products" },
    { name: "Featured Deals", link: "/products?sort=deals" },
  ];

  const helpLinks = [
    { name: "About Us", link: "/about" },
    { name: "Contact Us", link: "/contact" },
    { name: "Size Guide", link: "/size-guide" },
    { name: "Return & Refund", link: "/return-refund" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", link: "/privacy-policy" },
    { name: "Terms & Conditions", link: "/terms-conditions" },
    { name: "Warranty Policy", link: "/warranty-policy" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61595058702349",
      Icon: FaFacebook,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/aminasports01/?hl=en",
      Icon: FaInstagram,
    },
  ];

  const linkSections = [
    { title: "SHOP", links: shopLinks },
    { title: "HELP", links: helpLinks },
    { title: "LEGAL", links: legalLinks },
  ];

  return (
    <footer className="border-t border-border bg-secondary text-sm text-body transition-colors">
      <div className="mx-auto max-w-[1800px] px-5 pt-10 pb-6 sm:px-8 sm:pt-12 lg:px-10 lg:pt-14">
        {/* MAIN FOOTER */}
        <div className="grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(440px,0.72fr)] lg:gap-16">
          {/* BRAND SECTION */}
          <div className="flex flex-col items-start gap-4">
            <Link
              href="/"
              aria-label="Amina Sports homepage"
              className="inline-block"
            >
              <span className="text-2xl font-light tracking-[0.1em] text-title sm:text-3xl">
                AMINA{" "}
                <span className="font-bold tracking-[0.12em] text-primary">
                  SPORTS
                </span>
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-7 text-body">
              Premium imported footwear for everyday style.
              <br className="hidden sm:block" />
              Quality, comfort, and confidence in every step.
            </p>

            {/* SOCIAL LINKS */}
            <div className="mt-1 flex items-center gap-5">
              {socialLinks.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="text-muted-foreground transition-colors duration-200 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>

          {/* FOOTER LINK SECTIONS */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3 sm:gap-x-8">
            {linkSections.map((section) => (
              <div key={section.title}>
                <h3 className="mb-5 text-sm font-semibold tracking-[0.1em] text-title">
                  {section.title}
                </h3>

                <ul className="space-y-3">
                  {section.links.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.link}
                        className="inline-block text-sm leading-5 text-body transition-colors duration-200 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM FOOTER */}
        <div className="mt-10 border-t border-border pt-5 sm:mt-12 sm:pt-6 lg:mt-14">
          <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:items-center sm:text-left sm:gap-5">
            {/* COPYRIGHT */}
            <p className="text-sm leading-6 text-body">
              © {currentYear}{" "}
              <span className="font-medium text-title">Amina Sports</span>. All
              rights reserved.
            </p>

            {/* BRAND TAGLINE */}
            <p className="text-sm leading-6 sm:text-right text-body">
              Premium Imported Footwear
              <span className="mx-2 text-muted-foreground">·</span>
              Step Into Style
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
