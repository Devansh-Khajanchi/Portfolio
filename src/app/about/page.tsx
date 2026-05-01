import Image from "next/image";

const contactLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/in/devanshkh" },
  { label: "Email",    href: "mailto:devanshkh@gmail.com" },
];

type ExperienceEntry = {
  role: string;
  company: string;
  companyHref?: string;
};

const experience: ExperienceEntry[] = [
  { role: "Head of Design / Design Engineer", company: "Noise",                 companyHref: "https://noise.xyz/" },
  { role: "Design Consultant",                company: "VIDA, Hero MotoCorp",   companyHref: "https://www.vidaworld.com/" },
  { role: "Communication Designer",           company: "VIDA, Hero MotoCorp",   companyHref: "https://www.vidaworld.com/" },
  { role: "Display Stylist",                  company: "Titan Company Limited", companyHref: "https://www.tanishq.co.in/" },
  { role: "Visual Merchandiser",              company: "Hidesign",              companyHref: "https://hidesign.com/" },
];

type EducationEntry = {
  school: string;
  degree: string;
  schoolHref?: string;
};

const education: EducationEntry[] = [
  { school: "Parsons School of Design",        degree: "Masters in Communication Design",            schoolHref: "https://www.newschool.edu/parsons/" },
  { school: "National Institute of Design",    degree: "Bachelor of Design (Visual Communications)", schoolHref: "https://www.nid.edu/home" },
  { school: "Royal Academy of Art (Exchange)", degree: "Interactive Media Design",                   schoolHref: "https://www.kabk.nl/en/" },
];

export default function About() {
  return (
    <div className="pt-[var(--height-nav)] max-w-[1512px] mx-auto">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 md:gap-x-12 lg:gap-x-20 gap-y-12 md:gap-y-16 lg:gap-y-20 px-6 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20 md:items-start">

        {/* Bio — mobile 1, desktop col 1 row 1 */}
        <section className="flex flex-col gap-6 md:gap-8 max-w-[65ch] md:col-start-1 md:row-start-1">
          <p
            className="text-foreground-muted"
            style={{ fontSize: "var(--text-h5)", lineHeight: "var(--leading-h5)" }}
          >
            <BioName>Devansh Khajanchi</BioName> 👨‍💻 is a <BioEm>digital product designer</BioEm> based in 🗽{" "}
            <BioName>New York</BioName>, currently the <BioEm>Head of Design</BioEm> at 📈{" "}
            <BioLink href="https://noise.xyz/">Noise Labs</BioLink> and a <BioEm>Design Consultant</BioEm> at 🛵{" "}
            <BioLink href="https://www.vidaworld.com/">VIDA Electric</BioLink>. He holds a <BioEm>Masters in Communication Design</BioEm> from 🎓{" "}
            <BioLink href="https://www.newschool.edu/parsons/">Parsons School of Design</BioLink> and a <BioEm>Bachelor of Design</BioEm> from the 🏛️{" "}
            <BioLink href="https://www.nid.edu/home">National Institute of Design, Ahmedabad</BioLink>.
          </p>

          <p
            className="text-foreground-muted"
            style={{ fontSize: "var(--text-h5)", lineHeight: "var(--leading-h5)" }}
          >
            With a background spanning <BioEm>spatial</BioEm> and <BioEm>digital</BioEm> systems, he has designed retail experiences for brands like 👜{" "}
            <BioLink href="https://hidesign.com/">Hidesign</BioLink> and 💍{" "}
            <BioLink href="https://www.tanishq.co.in/">Tanishq</BioLink>, and crafted digital interfaces for 🏍️{" "}
            <BioLink href="https://www.heromotocorp.com/">Hero Motocorp</BioLink>. Devansh&apos;s practice is rooted in <BioEm>accessibility</BioEm>, <BioEm>clarity</BioEm>, and design that bridges the physical and digital to create meaningful experiences. 👋
          </p>
        </section>

        {/* Image — mobile 2, desktop col 2 spans all rows */}
        <div className="md:col-start-2 md:row-start-1 md:row-span-4">
          <Image
            src="/assets/images/about/headshot.jpg"
            alt="Devansh Khajanchi"
            width={2224}
            height={2965}
            sizes="(min-width: 768px) 480px, 100vw"
            className="w-full h-auto max-w-[480px] rounded-md"
            priority
          />
        </div>

        {/* Experience — mobile 3, desktop col 1 row 2 */}
        <section className="md:col-start-1 md:row-start-2">
          <SectionEyebrow>Experience</SectionEyebrow>
          <div className="flex flex-col gap-6 md:gap-8 mt-6 md:mt-8">
            {experience.map((entry) => (
              <ExperienceItem key={`${entry.role}-${entry.company}`} entry={entry} />
            ))}
          </div>
        </section>

        {/* Education — mobile 4, desktop col 1 row 3 */}
        <section className="md:col-start-1 md:row-start-3">
          <SectionEyebrow>Education</SectionEyebrow>
          <div className="flex flex-col gap-6 md:gap-8 mt-6 md:mt-8">
            {education.map((entry) => (
              <EducationItem key={`${entry.school}-${entry.degree}`} entry={entry} />
            ))}
          </div>
        </section>

        {/* Contact — mobile 5, desktop col 1 row 4 */}
        <section className="md:col-start-1 md:row-start-4">
          <ListColumn heading="Contact" items={contactLinks} />
        </section>

      </div>

    </div>
  );
}

function BioName({ children }: { children: React.ReactNode }) {
  return <strong className="text-foreground font-semibold">{children}</strong>;
}

function BioLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-foreground font-semibold no-underline transition-colors hover:text-primary"
    >
      {children}
    </a>
  );
}

function BioEm({ children }: { children: React.ReactNode }) {
  return <em className="font-display">{children}</em>;
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-foreground-muted uppercase"
      style={{
        fontSize: "var(--text-overline)",
        fontWeight: "var(--weight-overline)",
        lineHeight: "var(--leading-overline)",
        letterSpacing: "var(--tracking-overline)",
      }}
    >
      {children}
    </h2>
  );
}

function ExperienceItem({ entry }: { entry: ExperienceEntry }) {
  const company = entry.companyHref ? (
    <a
      href={entry.companyHref}
      target="_blank"
      rel="noopener noreferrer"
      className="text-foreground no-underline"
    >
      {entry.company}
    </a>
  ) : (
    entry.company
  );

  return (
    <div className="flex flex-col gap-1">
      <div
        className="text-foreground"
        style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-body)", fontWeight: "var(--weight-semibold)" }}
      >
        {company}
      </div>
      <div
        className="text-foreground-muted"
        style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-body)" }}
      >
        {entry.role}
      </div>
    </div>
  );
}

function EducationItem({ entry }: { entry: EducationEntry }) {
  const school = entry.schoolHref ? (
    <a
      href={entry.schoolHref}
      target="_blank"
      rel="noopener noreferrer"
      className="text-foreground no-underline"
    >
      {entry.school}
    </a>
  ) : (
    entry.school
  );

  return (
    <div className="flex flex-col gap-1">
      <div
        className="text-foreground"
        style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-body)", fontWeight: "var(--weight-semibold)" }}
      >
        {school}
      </div>
      <div
        className="text-foreground-muted"
        style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-body)" }}
      >
        {entry.degree}
      </div>
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
