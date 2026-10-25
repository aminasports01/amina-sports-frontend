import { Mail, MapPin, Phone } from "lucide-react";

const SITE_NAME = "Amina Sports";
const LAST_UPDATED = "October 25, 2026";

const CONTACT = {
  email: "aminasports01@gmail.com",
  phone: "+8801791815131",
  address: "",
};

type Section = {
  title: string;
  text?: string;
  bullets?: string[];
};

const sections: Section[] = [
  {
    title: "Information We Collect",
    text: "When you place an order, we collect the information you provide:",
    bullets: [
      "Your name and phone number.",
      "Your delivery address (district, thana, and full address).",
      "Order details such as product, size, color, quantity, and price.",
      "Any note you add to your order.",
    ],
  },
  {
    title: "Payment Information",
    text: "We currently accept Cash on Delivery only. We do not collect or store your card, bank, or mobile banking details.",
  },
  {
    title: "How We Use Your Information",
    bullets: [
      "To confirm, pack, and deliver your order.",
      "To call you about your order when needed.",
      "To provide customer support and handle returns or exchanges.",
      "To prevent fake or fraudulent orders.",
      "To understand how our website is used and improve it.",
    ],
  },
  {
    title: "Sharing Your Information",
    text: "We do not sell your personal information. We share it only when needed:",
    bullets: [
      "With delivery and courier partners, so they can deliver your order.",
      "With analytics and advertising tools, to measure website and ad performance.",
      "When required by law or to protect our rights and safety.",
    ],
  },
  {
    title: "Data Security",
    text: "We take reasonable steps to protect your information from unauthorized access or misuse. However, no method of internet transmission or electronic storage is completely secure.",
  },
  {
    title: "Data Retention",
    text: "We keep your order information only as long as needed for delivery, support, accounting, and legal purposes.",
  },
  {
    title: "Your Rights",
    text: `You can ask us to access, correct, or delete your personal information at any time by contacting us using the details below.`,
  },
  {
    title: "Cookies",
    text: "We use cookies to remember your preferences and understand how visitors use our website. You can control or disable cookies from your browser settings.",
  },
  {
    title: "Changes to This Policy",
    text: "We may update this policy from time to time. The latest version will always be available on this page with the updated date.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-4 py-6 sm:px-6 md:py-16">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <header className="border-b border-border pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-title md:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Last updated: {LAST_UPDATED}
          </p>
        </header>

        {/* Intro */}
        <p className="mt-8 text-base leading-relaxed text-body">
          {SITE_NAME} respects your privacy. This policy explains what
          information we collect when you shop with us, how we use it, and how
          we keep it safe.
        </p>

        {/* Sections */}
        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-semibold text-title md:text-xl">
                {section.title}
              </h2>

              {section.text && (
                <p className="mt-2 text-sm leading-relaxed text-body md:text-base">
                  {section.text}
                </p>
              )}

              {section.bullets && (
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-body marker:text-muted-foreground md:text-base">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* Contact */}
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="text-lg font-semibold text-title md:text-xl">
            Contact Us
          </h2>
          <p className="mt-2 text-sm text-body md:text-base">
            If you have any questions about this policy, contact {SITE_NAME}:
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
        </section>
      </div>
    </main>
  );
}
