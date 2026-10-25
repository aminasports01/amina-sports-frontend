import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const SITE_NAME = "Amina Sports";
const LAST_UPDATED = "October 25, 2026";

const INSIDE_DHAKA_FEE = 90;
const OUTSIDE_DHAKA_FEE = 130;

const DELIVERY_TIME_INSIDE = "1-2 working days";
const DELIVERY_TIME_OUTSIDE = "3-5 working days";
const RETURN_DAYS = "3 days";

const PRIVACY_POLICY_HREF = "/privacy-policy";

const CONTACT = {
  email: "aminasports01@gmail.com",
  phone: "+8801791815131",
  address: "",
};

type Section = {
  title: string;
  points: string[];
};

const sections: Section[] = [
  {
    title: "General",
    points: [
      `By placing an order with ${SITE_NAME}, you agree to the terms below.`,
      "Please read these terms before you order.",
    ],
  },
  {
    title: "Orders and Confirmation",
    points: [
      "Please give your correct name, mobile number, and full address when you order.",
      "After you order, our team will call you to confirm it.",
      "If we cannot reach you, or your details are wrong, your order may be delayed.",
    ],
  },
  {
    title: "Price and Stock",
    points: [
      "The price shown on the website is the final price. Prices may change, but you will pay the price shown when you placed your order.",
      "If an item is out of stock, we will tell you. You can then cancel your order or choose another size or color.",
    ],
  },
  {
    title: "Payment (Cash on Delivery)",
    points: [
      "We only accept Cash on Delivery. You pay when you receive your order.",
      "You do not need to pay anything in advance.",
      "Total bill = product price + delivery charge.",
    ],
  },
  {
    title: "Delivery",
    points: [
      `We deliver all over Bangladesh. The delivery charge is ৳${INSIDE_DHAKA_FEE} inside Dhaka and ৳${OUTSIDE_DHAKA_FEE} outside Dhaka.`,
      `Delivery usually takes ${DELIVERY_TIME_INSIDE} inside Dhaka and ${DELIVERY_TIME_OUTSIDE} outside Dhaka.`,
      "Natural disasters, strikes, or courier problems may cause delays.",
      "Please keep your phone on when your order is on the way.",
    ],
  },
  {
    title: "When You Receive Your Order",
    points: [
      "Check the size, color, and model in front of the delivery person.",
      "If the product is wrong or has a problem, tell the delivery person right away and call us.",
    ],
  },
  {
    title: "Return and Exchange",
    points: [
      `If you receive the wrong product, the wrong size (our mistake), or a damaged product, tell us within ${RETURN_DAYS} of delivery. We will exchange it for you.`,
      "If the size does not fit, you can exchange it for another size if we have it in stock. You will need to pay the delivery charge for both ways.",
      "The product must be unused, clean, and in its original packaging.",
      "Used or damaged products cannot be returned or exchanged.",
      "If we do not have stock for an exchange, we will refund your money.",
    ],
  },
  {
    title: "Order Cancellation",
    points: [
      "You can cancel your order by phone before we hand it to the courier.",
      "If you place fake orders, or often refuse to accept your delivery for no reason, we may refuse your orders in the future.",
    ],
  },
  {
    title: "Product Photos and Colors",
    points: [
      "We try to show real photos and correct details of our products.",
      "Colors may look a little different from the photos because of your phone or computer screen.",
    ],
  },
  {
    title: "Your Information",
    points: ["We use your information only to process and deliver your order."],
  },
  {
    title: "Changes to These Terms",
    points: [
      "We may change these terms when needed. The latest terms will always be on this page.",
    ],
  },
];

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-6 md:py-12 text-foreground sm:px-6 md:py-16">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <header className="border-b border-border pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-title md:text-4xl">
            Terms and Conditions
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Last updated: {LAST_UPDATED}
          </p>
        </header>

        {/* Intro */}
        <p className="mt-8 text-base leading-relaxed text-body">
          Welcome to {SITE_NAME}. These simple rules help us make your shopping
          easy and fair for everyone.
        </p>

        {/* Sections */}
        <div className="mt-10 space-y-8">
          {sections.map((section, index) => (
            <section key={section.title}>
              <h2 className="flex items-baseline gap-2 text-lg font-semibold text-title md:text-xl">
                <span className="text-muted-foreground">{index + 1}.</span>
                {section.title}
              </h2>

              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-body marker:text-muted-foreground md:text-base">
                {section.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="mt-8 text-sm text-body md:text-base">
          To learn how we use your information, please read our{" "}
          <Link
            href={PRIVACY_POLICY_HREF}
            className="font-semibold text-link underline underline-offset-2 hover:text-link-hover"
          >
            Privacy Policy
          </Link>
          .
        </p>

        {/* Contact */}
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="text-lg font-semibold text-title md:text-xl">
            Contact Us
          </h2>
          <p className="mt-2 text-sm text-body md:text-base">
            If you have any questions or problems, contact {SITE_NAME}:
          </p>

          <div className="mt-4 space-y-3 text-sm md:text-base">
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-3 text-foreground transition-colors hover:text-hover-text"
            >
              <Mail className="h-4 w-4 text-muted-foreground" />
              {CONTACT.email}
            </a>

            <a
              href={`tel:${CONTACT.phone}`}
              className="flex items-center gap-3 text-foreground transition-colors hover:text-hover-text"
            >
              <Phone className="h-4 w-4 text-muted-foreground" />
              {CONTACT.phone}
            </a>

            {CONTACT.address && (
              <p className="flex items-start gap-3 text-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                {CONTACT.address}
              </p>
            )}
          </div>

          <p className="mt-8 text-xs text-muted-foreground">
            Thank you for shopping with {SITE_NAME}.
          </p>
        </section>
      </div>
    </main>
  );
}
