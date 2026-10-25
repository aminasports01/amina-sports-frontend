import Link from "next/link";
import { Mail, Phone } from "lucide-react";

const SITE_NAME = "Amina Sports";

const RETURN_HREF = "/return-refund";

const CONTACT = {
  email: "aminasports01@gmail.com",
  phone: "+8801791815131",
};

/* ---------- Size tables ---------- */

// Shoes: EU size (the size you choose when ordering)
const shoeSizes = [
  { eu: "36", cm: "22.5", inch: "8.9" },
  { eu: "37", cm: "23.2", inch: "9.1" },
  { eu: "38", cm: "23.8", inch: "9.4" },
  { eu: "39", cm: "24.5", inch: "9.6" },
  { eu: "40", cm: "25.2", inch: "9.9" },
  { eu: "41", cm: "25.8", inch: "10.2" },
  { eu: "42", cm: "26.5", inch: "10.4" },
  { eu: "43", cm: "27.2", inch: "10.7" },
  { eu: "44", cm: "27.8", inch: "10.9" },
  { eu: "45", cm: "28.5", inch: "11.2" },
];

const th = "px-4 py-2.5 text-left font-semibold text-title";
const td = "px-4 py-2.5 text-body";

export default function SizeGuidePage() {
  return (
    <main className="min-h-screen bg-background px-4 py-6 text-foreground sm:px-6 md:py-16">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <header className="border-b border-border pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-title md:text-4xl">
            Size Guide
          </h1>
          <p className="mt-3 text-base leading-relaxed text-body">
            Find your right shoe size easily. Measure once, order with
            confidence.
          </p>
        </header>

        {/* Shoes */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-title">Shoe Sizes</h2>
          <p className="mt-2 text-sm leading-relaxed text-body md:text-base">
            Our shoe sizes are in EU size. Measure your foot length and pick the
            closest size. Most women in Bangladesh wear EU 36–40 and most men
            wear EU 40–44.
          </p>

          <div className="mt-4 overflow-x-auto rounded-md border border-border">
            <table className="w-full min-w-[320px] text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className={th}>EU Size</th>
                  <th className={th}>Foot Length (cm)</th>
                  <th className={th}>Foot Length (inch)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {shoeSizes.map((row) => (
                  <tr key={row.eu}>
                    <td className="px-4 py-2.5 font-semibold text-foreground">
                      {row.eu}
                    </td>
                    <td className={td}>{row.cm}</td>
                    <td className={td}>{row.inch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* How to measure */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-title">
            How to Measure Your Foot
          </h2>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-body marker:text-muted-foreground md:text-base">
            <li>Put a paper on the floor, against a wall.</li>
            <li>Stand on the paper with your heel touching the wall.</li>
            <li>Mark the tip of your longest toe on the paper.</li>
            <li>Measure from the wall to the mark.</li>
            <li>Match your number with the table above.</li>
          </ol>
        </section>

        {/* Tips */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-title">Helpful Tips</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-body marker:text-muted-foreground md:text-base">
            <li>
              Measure your feet in the evening. Feet are a little bigger by
              then.
            </li>
            <li>
              Between two sizes? Choose the bigger size, especially if you have
              wide feet.
            </li>
            <li>
              For running and sports shoes, many people like one size bigger for
              comfort.
            </li>
            <li>If you wear thick socks, choose a slightly bigger size.</li>
            <li>
              Sizes can differ a little between styles. If you are not sure,
              call us before you order.
            </li>
          </ul>
        </section>

        {/* Help box */}
        <section className="mt-12 rounded-md border border-border bg-muted p-5">
          <h2 className="text-lg font-semibold text-title">
            Not sure about your size?
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-body md:text-base">
            Call or email {SITE_NAME}. We will help you choose. If the size does
            not fit, you can exchange it. Please read our{" "}
            <Link
              href={RETURN_HREF}
              className="font-semibold text-link underline underline-offset-2 hover:text-link-hover"
            >
              Return Policy
            </Link>
            .
          </p>

          <div className="mt-4 flex flex-col gap-3 text-sm sm:flex-row sm:gap-8 md:text-base">
            <a
              href={`tel:${CONTACT.phone}`}
              className="flex items-center gap-2 text-foreground transition-colors hover:text-hover-text"
            >
              <Phone className="h-4 w-4 text-muted-foreground" />
              {CONTACT.phone}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-2 text-foreground transition-colors hover:text-hover-text"
            >
              <Mail className="h-4 w-4 text-muted-foreground" />
              {CONTACT.email}
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
