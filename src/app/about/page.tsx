import Image from "next/image";
import Button from "@/components/ui/Button";

const skills = [
  "UI/UX Design",
  "Web Design",
  "HTML + CSS",
  "Typesetting",
  "Presentation",
  "Brand Identity",
  "Logo design",
  "Motion Design",
  "Publication design",
];

const contactLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/in/devanshkh" },
  { label: "Email",    href: "mailto:devanshkh@gmail.com" },
];

const clients = [
  "Noise Labs",
  "VIDA (Hero Motocorp)",
  "Tanishq (Titan, Tata)",
  "Hidesign",
  "Péro",
];

const schools = [
  "Parsons School of Design",
  "National Institute of Design",
  "Royal Academy of Art",
];

export default function About() {
  return (
    <div className="pt-[var(--height-nav)]">

      {/* ── Bio + Headshot ──────────────────────────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-20 px-6 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20">
        <div className="flex flex-col gap-6 md:gap-8">
          <p
            className="text-foreground-muted"
            style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-body)" }}
          >
            <strong className="text-foreground font-semibold">Devansh Khajanchi</strong> is a digital product designer based in{" "}
            <strong className="text-foreground font-semibold">New York</strong>, currently the Head of Design at{" "}
            <strong className="text-foreground font-semibold">Noise Labs</strong> and a Design Consultant at{" "}
            <strong className="text-foreground font-semibold">VIDA Electric</strong>. He holds a Masters degree in Communication Design from{" "}
            <strong className="text-foreground font-semibold">Parsons School of Design</strong> and a Bachelor of Design from the{" "}
            <strong className="text-foreground font-semibold">National Institute of Design, Ahmedabad</strong>.
          </p>

          <p
            className="text-foreground-muted"
            style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-body)" }}
          >
            With a background spanning spatial and digital systems, he has designed retail experiences for brands like{" "}
            <strong className="text-foreground font-semibold">Hidesign</strong> and{" "}
            <strong className="text-foreground font-semibold">Tanishq</strong>, and crafted digital interfaces for{" "}
            <strong className="text-foreground font-semibold">Hero Motocorp</strong>. Devansh&apos;s practice is rooted in accessibility, clarity, and design that bridges the physical and digital to create meaningful experiences for users.
          </p>

          <div className="mt-4 md:mt-8">
            <Button href="mailto:devanshkh@gmail.com" variant="primary">
              Let&apos;s Chat
            </Button>
          </div>
        </div>

        <div>
          <Image
            src="/assets/images/about/headshot.jpg"
            alt="Devansh Khajanchi"
            width={2224}
            height={2965}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="w-full h-auto"
            priority
          />
        </div>
      </section>

      {/* ── Lists ───────────────────────────────────────────────── */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 lg:gap-12 px-6 md:px-8 lg:px-12 pb-16 md:pb-20 lg:pb-24">
        <ListColumn heading="What I do"   items={skills} />
        <ListColumn heading="Contact"     items={contactLinks} />
        <ListColumn heading="Worked for"  items={clients} />
        <ListColumn heading="Studied at"  items={schools} />
      </section>

    </div>
  );
}

type ListItem = string | { label: string; href: string };

function ListColumn({ heading, items }: { heading: string; items: readonly ListItem[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h3
        className="text-primary"
        style={{
          fontSize: "var(--text-h6)",
          fontWeight: "var(--weight-semibold)",
          lineHeight: "var(--leading-h6)",
          letterSpacing: "var(--tracking-h6)",
        }}
      >
        {heading}
      </h3>
      <ul className="flex flex-col gap-1">
        {items.map((item) => {
          const isLink = typeof item !== "string";
          const key = isLink ? item.label : item;
          return (
            <li
              key={key}
              className="text-foreground"
              style={{ fontSize: "var(--text-body-sm)", lineHeight: "var(--leading-body-sm)" }}
            >
              {isLink ? (
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-foreground no-underline"
                >
                  {item.label}
                </a>
              ) : (
                item
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
