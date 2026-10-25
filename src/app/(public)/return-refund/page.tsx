import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

const SITE_NAME = "Amina Sports";
const LAST_UPDATED = "October 25, 2026";

const INSIDE_DHAKA_FEE = 90;
const OUTSIDE_DHAKA_FEE = 130;

const DELIVERY_TIME_INSIDE = "1-2 working days";
const DELIVERY_TIME_OUTSIDE = "3-5 working days";

const REPORT_DAYS = "3 days";
const REFUND_TIME = "3-7 working days";

const TERMS_HREF = "/terms-conditions";
const WARRANTY_HREF = "/warranty-policy";

const CONTACT = {
  email: "aminasports01@gmail.com",
  phone: "+8801791815131",
  address: "",
};

type Section = {
  title: string;
  text?: string;
  points?: string[];
};

const sections: Section[] = [
  {
    title: "Delivery",
    points: [
      "We deliver all over Bangladesh.",
      `Delivery charge: ৳${INSIDE_DHAKA_FEE} inside Dhaka and ৳${OUTSIDE_DHAKA_FEE} outside Dhaka.`,
      `Delivery time: ${DELIVERY_TIME_INSIDE} inside Dhaka and ${DELIVERY_TIME_OUTSIDE} outside Dhaka.`,
      "Natural disasters, strikes, or courier problems may cause delays.",
    ],
  },
  {
    title: "When Your Order Arrives",
    points: [
      "Check the package before you accept it. If the package is torn or the product looks broken, do not accept it.",
      "Check the size, color, and model in front of the delivery person.",
      "We suggest you record a short video while opening the package. It helps us if something is missing or damaged.",
      "If you accept a damaged package, we may not be able to accept a claim later.",
    ],
  },
  {
    title: "Wrong or Damaged Product",
    text: `If you receive the wrong product, the wrong size (our mistake), or a damaged product, tell us within ${REPORT_DAYS} of delivery.`,
    points: [
      "Send us clear photos or a video of the problem.",
      "We will exchange the product for free.",
      "We will pay the delivery charge both ways.",
    ],
  },
  {
    title: "Size Exchange",
    points: [
      `If the size does not fit, tell us within ${REPORT_DAYS} of delivery.`,
      "We will exchange it for another size if we have it in stock.",
      "You will need to pay the delivery charge both ways.",
    ],
  },
  {
    title: "Return Conditions",
    text: "To return or exchange a product, it must be:",
    points: [
      "Unused and clean.",
      "In its original packaging, with the box and tags.",
      "Not washed, repaired, or changed in any way.",
    ],
  },
  {
    title: "If You Do Not Like the Product",
    points: [
      "Please call us first. We will try to help.",
      "If the product is unused and in its original packaging, we may allow an exchange.",
      "Used, damaged, or dirty products cannot be returned or exchanged.",
    ],
  },
  {
    title: "Refunds",
    points: [
      "We will refund your money if we cannot exchange your product because it is out of stock.",
      "We will refund your money if we cannot send you the correct product.",
      `Refunds usually take ${REFUND_TIME} after we receive and check the returned product.`,
      "We will send your refund by mobile banking or bank transfer. We will confirm the details with you.",
    ],
  },
  {
    title: "Manufacturing Defects",
    points: [
      "For manufacturing problems like stitching coming apart or the sole coming off, please see our Warranty Policy.",
    ],
  },
  {
    title: "How to Send a Return or Exchange Request",
    points: [
      "Call or email us.",
      "Tell us your order ID, or your name and phone number.",
      "Send clear photos or a video of the product and the problem.",
      "Wait for our team to confirm before you send the product back.",
    ],
  },
];

export default function ReturnAndRefundPolicyPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-6 text-foreground sm:px-6 md:py-16">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <header className="border-b border-border pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-title md:text-4xl">
            Delivery, Return and Refund Policy
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Last updated: {LAST_UPDATED}
          </p>
        </header>

        {/* Intro */}
        <p className="mt-8 text-base leading-relaxed text-body">
          This page explains how delivery, returns, and refunds work at{" "}
          {SITE_NAME}. We want your shopping to be easy and fair.
        </p>

        {/* Sections */}
        <div className="mt-10 space-y-8">
          {sections.map((section, index) => (
            <section key={section.title}>
              <h2 className="flex items-baseline gap-2 text-lg font-semibold text-title md:text-xl">
                <span className="text-muted-foreground">{index + 1}.</span>
                {section.title}
              </h2>

              {section.text && (
                <p className="mt-2 text-sm leading-relaxed text-body md:text-base">
                  {section.text}
                </p>
              )}

              {section.points && (
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-body marker:text-muted-foreground md:text-base">
                  {section.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <p className="mt-8 text-sm text-body md:text-base">
          Please also read our{" "}
          <Link
            href={TERMS_HREF}
            className="font-semibold text-link underline underline-offset-2 hover:text-link-hover"
          >
            Terms and Conditions
          </Link>{" "}
          and{" "}
          <Link
            href={WARRANTY_HREF}
            className="font-semibold text-link underline underline-offset-2 hover:text-link-hover"
          >
            Warranty Policy
          </Link>
          .
        </p>

        {/* Contact */}
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="text-lg font-semibold text-title md:text-xl">
            Contact Us
          </h2>
          <p className="mt-2 text-sm text-body md:text-base">
            For any delivery, return, or refund question, contact {SITE_NAME}:
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
