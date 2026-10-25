"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

const SITE_NAME = "Amina Sports";
const DEFAULT_LANG: Lang = "en";

// ওয়ারেন্টি / ক্লেইমের সময়
const WARRANTY_PERIOD = { bn: "3 দিন", en: "3 days" };
const REVIEW_TIME = { bn: "২-৩ কর্মদিবস", en: "2-3 working days" };

const TERMS_HREF = "/terms-and-conditions";

const CONTACT = {
  email: "aminasports01@gmail.com",
  phone: "+8801791815131",
  address: "",
};

/* ========================================================= */

type Lang = "en" | "bn";

type Section = {
  title: string;
  text?: string;
  points?: string[];
};

type Content = {
  title: string;
  updatedLabel: string;
  updatedDate: string;
  intro: string;
  sections: Section[];
  termsBefore: string;
  termsLink: string;
  termsAfter: string;
  contactTitle: string;
  contactText: string;
  thanks: string;
  numberFormat: (n: number) => string;
};

const bn = (n: number) => n.toLocaleString("bn-BD");

const content: Record<Lang, Content> = {
  /* ------------------------- বাংলা ------------------------- */
  bn: {
    title: "ওয়ারেন্টি পলিসি",
    updatedLabel: "সর্বশেষ আপডেট",
    updatedDate: "২৫ অক্টোবর, ২০২৬",
    intro: `${SITE_NAME} থেকে কেনা প্রোডাক্টে কোনো তৈরির ত্রুটি থাকলে আমরা কীভাবে সাহায্য করি, তা এখানে সহজ ভাষায় লেখা আছে।`,
    sections: [
      {
        title: "কোন সমস্যায় ওয়ারেন্টি পাবেন",
        text: `ডেলিভারির ${WARRANTY_PERIOD.bn}র মধ্যে প্রোডাক্টে তৈরির ত্রুটি থাকলে আপনি ক্লেইম করতে পারবেন। যেমন:`,
        points: [
          "সেলাই খুলে যাওয়া বা ছিঁড়ে যাওয়া।",
          "সোল (তলা) আলাদা হয়ে যাওয়া বা আঠা ছেড়ে দেওয়া।",
          "তৈরির সময়ের অন্য কোনো ত্রুটি।",
          "ভুল প্রোডাক্ট বা ভুল সাইজ পাঠানো (আমাদের ভুলে)।",
        ],
      },
      {
        title: "কোন সমস্যায় ওয়ারেন্টি পাবেন না",
        points: [
          "সাধারণ ব্যবহারে ক্ষয় হওয়া বা পুরোনো হয়ে যাওয়া।",
          "ভুলভাবে ব্যবহার, টানাটানি, কেটে যাওয়া বা পুড়ে যাওয়া।",
          "পানিতে ভেজানো, ভুলভাবে ধোয়া বা রোদে রেখে রঙ নষ্ট হওয়া।",
          "অন্য কেউ মেরামত বা পরিবর্তন করেছে এমন প্রোডাক্ট।",
          "নিজের পছন্দের সাইজ ভুল হওয়া। এর জন্য আমাদের শর্তাবলীর এক্সচেঞ্জ নিয়ম দেখুন।",
        ],
      },
      {
        title: "কীভাবে ক্লেইম করবেন",
        points: [
          `${WARRANTY_PERIOD.bn}র মধ্যে আমাদের ফোন করুন বা ইমেইল করুন।`,
          "আপনার অর্ডার আইডি বা নাম ও ফোন নম্বর জানান।",
          "সমস্যাটির পরিষ্কার ছবি বা ভিডিও পাঠান।",
          "প্রোডাক্ট এবং তার প্যাকেট যত্ন করে রেখে দিন।",
        ],
      },
      {
        title: "আমরা কী করব",
        points: [
          `আপনার ক্লেইম পাওয়ার পর ${REVIEW_TIME.bn}র মধ্যে আমরা প্রোডাক্টটি যাচাই করব।`,
          "ত্রুটি সত্যি হলে সম্ভব হলে মেরামত করে দেব।",
          "মেরামত সম্ভব না হলে একই প্রোডাক্ট এক্সচেঞ্জ করে দেব।",
          "এক্সচেঞ্জের স্টক না থাকলে আপনার টাকা ফেরত দেওয়া হবে।",
        ],
      },
      {
        title: "ডেলিভারি চার্জ কে দেবে",
        points: [
          "ত্রুটি আমাদের কারণে হলে আসা-যাওয়ার ডেলিভারি চার্জ আমরা বহন করব।",
          "ক্লেইম গ্রহণযোগ্য না হলে ডেলিভারি চার্জ আপনাকে দিতে হবে।",
        ],
      },
      {
        title: "ব্র্যান্ডের ওয়ারেন্টি",
        points: [
          "প্রোডাক্টের পেজে আলাদা করে লেখা না থাকলে কোনো ব্র্যান্ড বা কোম্পানির ওয়ারেন্টি দেওয়া হয় না।",
          "এই পেজের ওয়ারেন্টি শুধু আমাদের নিজস্ব তৈরির ত্রুটির ওয়ারেন্টি।",
        ],
      },
      {
        title: "নিয়ম পরিবর্তন",
        points: [
          "আমরা প্রয়োজনে এই নিয়ম বদলাতে পারি। নতুন নিয়ম এই পেজে প্রকাশ করা হবে।",
        ],
      },
    ],
    termsBefore: "রিটার্ন ও এক্সচেঞ্জ সম্পর্কে আরও জানতে আমাদের ",
    termsLink: "শর্তাবলী",
    termsAfter: " দেখুন।",
    contactTitle: "যোগাযোগ",
    contactText: `ওয়ারেন্টি ক্লেইম করতে বা কোনো প্রশ্ন থাকলে ${SITE_NAME}-এর সাথে যোগাযোগ করুন:`,
    thanks: `${SITE_NAME}-এ আপনার আস্থার জন্য ধন্যবাদ।`,
    numberFormat: bn,
  },

  /* ------------------------- English ------------------------- */
  en: {
    title: "Warranty Policy",
    updatedLabel: "Last updated",
    updatedDate: "October 25, 2026",
    intro: `This page explains how we help you if a product from ${SITE_NAME} has a manufacturing problem.`,
    sections: [
      {
        title: "What Is Covered",
        text: `You can make a claim within ${WARRANTY_PERIOD.en} of delivery if the product has a manufacturing defect. For example:`,
        points: [
          "Stitching that comes apart or tears.",
          "The sole coming off or the glue coming loose.",
          "Any other defect from when the product was made.",
          "The wrong product or wrong size was sent (our mistake).",
        ],
      },
      {
        title: "What Is Not Covered",
        points: [
          "Normal wear and tear from regular use.",
          "Damage from rough use, pulling, cuts, or burns.",
          "Damage from water, wrong washing, or color fading from sunlight.",
          "Products that someone else has repaired or changed.",
          "Choosing the wrong size. Please see the exchange rules in our Terms and Conditions.",
        ],
      },
      {
        title: "How to Make a Claim",
        points: [
          `Call or email us within ${WARRANTY_PERIOD.en}.`,
          "Tell us your order ID, or your name and phone number.",
          "Send clear photos or a video of the problem.",
          "Keep the product and its packaging safe.",
        ],
      },
      {
        title: "What We Will Do",
        points: [
          `We will check your product within ${REVIEW_TIME.en} after we receive your claim.`,
          "If the defect is real, we will repair it when possible.",
          "If it cannot be repaired, we will exchange it for the same product.",
          "If we do not have stock for an exchange, we will refund your money.",
        ],
      },
      {
        title: "Who Pays the Delivery Charge",
        points: [
          "If the problem is our fault, we will pay the delivery charge both ways.",
          "If the claim is not accepted, you will need to pay the delivery charge.",
        ],
      },
      {
        title: "Brand Warranty",
        points: [
          "We do not give any brand or company warranty unless it is clearly written on the product page.",
          "The warranty on this page only covers manufacturing defects.",
        ],
      },
      {
        title: "Changes to This Policy",
        points: [
          "We may change this policy when needed. The latest version will always be on this page.",
        ],
      },
    ],
    termsBefore: "To learn more about returns and exchanges, please read our ",
    termsLink: "Terms and Conditions",
    termsAfter: ".",
    contactTitle: "Contact Us",
    contactText: `To make a warranty claim or ask a question, contact ${SITE_NAME}:`,
    thanks: `Thank you for shopping with ${SITE_NAME}.`,
    numberFormat: (n: number) => String(n),
  },
};

const languages: { code: Lang; label: string }[] = [
  { code: "en", label: "En" },
  { code: "bn", label: "বাং" },
];

export default function WarrantyPolicyPage() {
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);
  const t = content[lang];

  return (
    <main
      lang={lang}
      className="min-h-screen bg-background px-4 py-2  text-foreground sm:px-6 md:py-16"
    >
      <div className="mx-auto max-w-3xl">
        {/* Language switch */}
        <div className="md:mb-6 flex justify-end">
          <div
            role="group"
            aria-label="Language"
            className="inline-flex overflow-hidden rounded-md border border-border bg-card text-sm"
          >
            {languages.map((item) => {
              const active = lang === item.code;

              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setLang(item.code)}
                  aria-pressed={active}
                  className={`px-4 py-1.5 font-medium transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-body hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Header */}
        <header className="border-b border-border pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-title md:text-4xl">
            {t.title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {t.updatedLabel}: {t.updatedDate}
          </p>
        </header>

        {/* Intro */}
        <p className="mt-8 text-base leading-relaxed text-body">{t.intro}</p>

        {/* Sections */}
        <div className="mt-10 space-y-8">
          {t.sections.map((section, index) => (
            <section key={section.title}>
              <h2 className="flex items-baseline gap-2 text-lg font-semibold text-title md:text-xl">
                <span className="text-muted-foreground">
                  {t.numberFormat(index + 1)}.
                </span>
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
          {t.termsBefore}
          <Link
            href={TERMS_HREF}
            className="font-semibold text-link underline underline-offset-2 hover:text-link-hover"
          >
            {t.termsLink}
          </Link>
          {t.termsAfter}
        </p>

        {/* Contact */}
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="text-lg font-semibold text-title md:text-xl">
            {t.contactTitle}
          </h2>
          <p className="mt-2 text-sm text-body md:text-base">{t.contactText}</p>

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

          <p className="mt-8 text-xs text-muted-foreground">{t.thanks}</p>
        </section>
      </div>
    </main>
  );
}
