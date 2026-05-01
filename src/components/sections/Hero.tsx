export default function Hero() {
  return (
    <section className="px-6 md:px-8 lg:px-12 pt-16 md:pt-24 lg:pt-32 pb-12 md:pb-16 lg:pb-20 flex flex-col gap-10 md:gap-14 lg:gap-20">
      <h1
        style={{
          fontSize: "var(--text-display)",
          fontWeight: "var(--weight-display-medium)",
          lineHeight: "var(--leading-display)",
          letterSpacing: "var(--tracking-display)",
        }}
      >
        <span className="block text-foreground-muted">Devansh Khajanchi</span>
      </h1>

      <p
        className="text-foreground"
        style={{
          fontSize: "var(--text-display)",
          fontWeight: "var(--weight-display-medium)",
          lineHeight: "var(--leading-display)",
          letterSpacing: "var(--tracking-display)",
        }}
      >
        <span className="block">Building AI-Driven</span>
        <span className="block">
          Products{" "}
          <span style={{ color: "var(--secondary)" }}>&amp;</span>{" "}
          Experiences
          <span style={{ color: "var(--primary)" }}>.</span>
        </span>
      </p>
    </section>
  );
}
