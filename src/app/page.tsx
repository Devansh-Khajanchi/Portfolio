const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

const colorFamilies = [
  { name: "Orange", prefix: "orange", label: "Primary — #DD3B00" },
  { name: "Blue",   prefix: "blue",   label: "Secondary — #0080FF" },
  { name: "Grey",   prefix: "grey",   label: "Neutral" },
  { name: "Yellow", prefix: "yellow", label: "Caution" },
  { name: "Red",    prefix: "red",    label: "Error" },
  { name: "Green",  prefix: "green",  label: "Success" },
  { name: "Purple", prefix: "purple", label: "AI" },
] as const;

const semanticTokens = [
  { label: "Background",       var: "--background" },
  { label: "Surface",          var: "--surface" },
  { label: "Surface Raised",   var: "--surface-raised" },
  { label: "Foreground",       var: "--foreground" },
  { label: "Foreground Muted", var: "--foreground-muted" },
  { label: "Border",           var: "--border" },
  { label: "Primary",          var: "--primary" },
  { label: "Primary Subtle",   var: "--primary-subtle" },
  { label: "Secondary",        var: "--secondary" },
  { label: "Secondary Subtle", var: "--secondary-subtle" },
  { label: "Error",            var: "--error" },
  { label: "Error Subtle",     var: "--error-subtle" },
  { label: "Success",          var: "--success" },
  { label: "Success Subtle",   var: "--success-subtle" },
  { label: "Caution",          var: "--caution" },
  { label: "Caution Subtle",   var: "--caution-subtle" },
  { label: "AI",               var: "--ai" },
  { label: "AI Subtle",        var: "--ai-subtle" },
];

const shadowScale = [
  { token: "--shadow-xs",  label: "xs",  role: "Button rest" },
  { token: "--shadow-sm",  label: "sm",  role: "Card rest" },
  { token: "--shadow-md",  label: "md",  role: "Tooltip" },
  { token: "--shadow-lg",  label: "lg",  role: "Popover / Dropdown" },
  { token: "--shadow-xl",  label: "xl",  role: "Modal" },
  { token: "--shadow-2xl", label: "2xl", role: "Full overlay" },
] as const;

const motionTokens = [
  { label: "instant",  token: "--duration-instant",  value: "50ms" },
  { label: "fast",     token: "--duration-fast",      value: "100ms" },
  { label: "normal",   token: "--duration-normal",    value: "200ms" },
  { label: "slow",     token: "--duration-slow",      value: "400ms" },
  { label: "slower",   token: "--duration-slower",    value: "600ms" },
] as const;

const zIndexLayers = [
  { label: "base",     token: "--z-base",     value: "0" },
  { label: "raised",   token: "--z-raised",   value: "10" },
  { label: "dropdown", token: "--z-dropdown", value: "100" },
  { label: "sticky",   token: "--z-sticky",   value: "200" },
  { label: "overlay",  token: "--z-overlay",  value: "300" },
  { label: "modal",    token: "--z-modal",    value: "400" },
  { label: "toast",    token: "--z-toast",    value: "500" },
  { label: "tooltip",  token: "--z-tooltip",  value: "600" },
] as const;

const spacingScale = [
  { token: "--space-1",  px: "4px",   label: "2xs" },
  { token: "--space-2",  px: "8px",   label: "xs" },
  { token: "--space-3",  px: "12px",  label: "sm" },
  { token: "--space-4",  px: "16px",  label: "md" },
  { token: "--space-6",  px: "24px",  label: "lg" },
  { token: "--space-8",  px: "32px",  label: "xl" },
  { token: "--space-12", px: "48px",  label: "2xl" },
  { token: "--space-16", px: "64px",  label: "3xl" },
  { token: "--space-24", px: "96px",  label: "4xl" },
  { token: "--space-32", px: "128px", label: "5xl" },
] as const;

const radiiScale = [
  { token: "--radius-none", px: "0px",    label: "none" },
  { token: "--radius-sm",   px: "4px",    label: "sm" },
  { token: "--radius-md",   px: "8px",    label: "md" },
  { token: "--radius-lg",   px: "12px",   label: "lg" },
  { token: "--radius-xl",   px: "16px",   label: "xl" },
  { token: "--radius-2xl",  px: "24px",   label: "2xl" },
  { token: "--radius-3xl",  px: "32px",   label: "3xl" },
  { token: "--radius-pill", px: "9999px", label: "pill" },
] as const;

const typeScale = [
  { role: "Display",   sizeVar: "--text-display",  leadingVar: "--leading-display",  weightVar: "--weight-display",  trackingVar: "--tracking-display",  sample: "The quick brown fox" },
  { role: "H1",        sizeVar: "--text-h1",        leadingVar: "--leading-h1",        weightVar: "--weight-h1",        trackingVar: "--tracking-h1",        sample: "The quick brown fox" },
  { role: "H2",        sizeVar: "--text-h2",        leadingVar: "--leading-h2",        weightVar: "--weight-h2",        trackingVar: "--tracking-h2",        sample: "The quick brown fox" },
  { role: "H3",        sizeVar: "--text-h3",        leadingVar: "--leading-h3",        weightVar: "--weight-h3",        trackingVar: "--tracking-h3",        sample: "The quick brown fox" },
  { role: "H4",        sizeVar: "--text-h4",        leadingVar: "--leading-h4",        weightVar: "--weight-h4",        trackingVar: "--tracking-h4",        sample: "The quick brown fox jumps" },
  { role: "H5",        sizeVar: "--text-h5",        leadingVar: "--leading-h5",        weightVar: "--weight-h5",        trackingVar: "--tracking-h5",        sample: "The quick brown fox jumps over" },
  { role: "H6",        sizeVar: "--text-h6",        leadingVar: "--leading-h6",        weightVar: "--weight-h6",        trackingVar: "--tracking-h6",        sample: "The quick brown fox jumps over the lazy dog" },
  { role: "Body LG",   sizeVar: "--text-body-lg",   leadingVar: "--leading-body-lg",   weightVar: "--weight-body-lg",   trackingVar: "--tracking-body-lg",   sample: "The quick brown fox jumps over the lazy dog" },
  { role: "Body",      sizeVar: "--text-body",      leadingVar: "--leading-body",      weightVar: "--weight-body",      trackingVar: "--tracking-body",      sample: "The quick brown fox jumps over the lazy dog. Sphinx of black quartz, judge my vow." },
  { role: "Body SM",   sizeVar: "--text-body-sm",   leadingVar: "--leading-body-sm",   weightVar: "--weight-body-sm",   trackingVar: "--tracking-body-sm",   sample: "The quick brown fox jumps over the lazy dog. Sphinx of black quartz, judge my vow." },
  { role: "Label",     sizeVar: "--text-label",     leadingVar: "--leading-label",     weightVar: "--weight-label",     trackingVar: "--tracking-label",     sample: "Button label / Nav item" },
  { role: "Caption",   sizeVar: "--text-caption",   leadingVar: "--leading-caption",   weightVar: "--weight-caption",   trackingVar: "--tracking-caption",   sample: "Supporting text, metadata, timestamps" },
  { role: "Overline",  sizeVar: "--text-overline",  leadingVar: "--leading-overline",  weightVar: "--weight-overline",  trackingVar: "--tracking-overline",  sample: "SECTION LABEL / OVERLINE" },
  { role: "Code",      sizeVar: "--text-code",      leadingVar: "--leading-code",      weightVar: "--weight-code",      trackingVar: "--tracking-code",      sample: "const x = designSystem.tokens" },
] as const;

export default function Home() {
  return (
    <div style={{ padding: "48px 32px", maxWidth: 960 }}>

      {/* ── Color Palette ─────────────────────────────────────── */}
      <p style={overlineStyle}>Design System — Color Palette</p>
      <h1 style={pageTitleStyle}>Color scales</h1>
      <p style={subtitleStyle}>7 families · 11 stops each · OKLCH · Review and request changes.</p>

      <table style={{ borderCollapse: "collapse", width: "100%", marginBottom: 56 }}>
        <thead>
          <tr>
            <th style={thStyle}>Family</th>
            {shades.map((s) => (
              <th key={s} style={{ ...thStyle, textAlign: "center", minWidth: 48 }}>{s}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {colorFamilies.map(({ name, prefix, label }) => (
            <tr key={prefix}>
              <td style={labelCellStyle}>
                <span style={{ fontWeight: 600, display: "block", fontSize: 13 }}>{name}</span>
                <span style={{ fontSize: 11, opacity: 0.45 }}>{label}</span>
              </td>
              {shades.map((shade) => (
                <td key={shade} style={{ padding: "4px 3px" }}>
                  <div
                    title={`--${prefix}-${shade}`}
                    style={{
                      background: `var(--${prefix}-${shade})`,
                      height: 48,
                      borderRadius: 8,
                      outline: "1px solid rgba(0,0,0,0.06)",
                      outlineOffset: -1,
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Semantic tokens */}
      <p style={overlineStyle}>Semantic tokens — Light mode</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 72 }}>
        {semanticTokens.map(({ label, var: v }) => (
          <div key={v} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8, flexShrink: 0,
              background: `var(${v})`,
              outline: "1px solid rgba(0,0,0,0.08)", outlineOffset: -1,
            }} />
            <div>
              <div style={{ fontWeight: 500, fontSize: 12 }}>{label}</div>
              <div style={{ opacity: 0.4, fontFamily: "var(--font-geist-mono)", fontSize: 10 }}>{v}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Spacing ───────────────────────────────────────────── */}
      <p style={overlineStyle}>Design System — Spacing</p>
      <h2 style={pageTitleStyle}>Spacing scale</h2>
      <p style={{ ...subtitleStyle, marginBottom: 32 }}>4px base unit · 32 primitives · 11 semantic aliases (3xs → 5xl)</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 72 }}>
        {spacingScale.map(({ token, px, label }) => (
          <div key={token} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 48, fontSize: 11, fontWeight: 600, opacity: 0.4, letterSpacing: "0.06em", textTransform: "uppercase", flexShrink: 0 }}>
              {label}
            </div>
            <div style={{ width: 36, fontSize: 10, opacity: 0.35, fontFamily: "var(--font-geist-mono)", flexShrink: 0, textAlign: "right" }}>
              {px}
            </div>
            <div style={{
              height: 20,
              width: `var(${token})`,
              background: "var(--primary)",
              borderRadius: 3,
              minWidth: 2,
              opacity: 0.8,
            }} />
          </div>
        ))}
      </div>

      {/* ── Corner Radius ─────────────────────────────────────── */}
      <p style={overlineStyle}>Design System — Corner Radius</p>
      <h2 style={pageTitleStyle}>Radius scale</h2>
      <p style={{ ...subtitleStyle, marginBottom: 32 }}>9 steps · Semantic role aliases: button, card, modal, chip, avatar</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 24, marginBottom: 72 }}>
        {radiiScale.map(({ token, px, label }) => (
          <div key={token} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 64,
              height: 64,
              background: "var(--primary-subtle)",
              border: "2px solid var(--primary)",
              borderRadius: `var(${token})`,
            }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.6 }}>{label}</div>
              <div style={{ fontSize: 10, opacity: 0.35, fontFamily: "var(--font-geist-mono)" }}>{px}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Shadows ───────────────────────────────────────────── */}
      <p style={overlineStyle}>Design System — Elevation</p>
      <h2 style={pageTitleStyle}>Shadow scale</h2>
      <p style={{ ...subtitleStyle, marginBottom: 32 }}>6 levels · Dark mode uses higher-opacity blacks</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 24, marginBottom: 72 }}>
        {shadowScale.map(({ token, label, role }) => (
          <div key={token} style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
            <div style={{
              width: 80,
              height: 80,
              borderRadius: "var(--radius-lg)",
              background: "var(--surface)",
              boxShadow: `var(${token})`,
            }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.6 }}>{label}</div>
              <div style={{ fontSize: 10, opacity: 0.35, fontFamily: "var(--font-geist-mono)" }}>{token}</div>
              <div style={{ fontSize: 10, opacity: 0.4, marginTop: 2 }}>{role}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Motion ────────────────────────────────────────────── */}
      <p style={overlineStyle}>Design System — Motion</p>
      <h2 style={pageTitleStyle}>Duration & easing</h2>
      <p style={{ ...subtitleStyle, marginBottom: 32 }}>Respects prefers-reduced-motion · All durations collapse to 0ms</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
        {motionTokens.map(({ label, token, value }) => (
          <div key={token} style={{ display: "grid", gridTemplateColumns: "72px 64px 1fr", alignItems: "center", gap: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.4, letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</div>
            <div style={{ fontSize: 10, opacity: 0.4, fontFamily: "var(--font-geist-mono)" }}>{value}</div>
            <div style={{ height: 4, borderRadius: 2, background: "var(--primary)", width: `${parseInt(value) / 6}px`, opacity: 0.7, minWidth: 4 }} />
          </div>
        ))}
      </div>

      {/* ── Z-index ───────────────────────────────────────────── */}
      <p style={{ ...overlineStyle, marginTop: 40 }}>Design System — Stacking</p>
      <h2 style={pageTitleStyle}>Z-index scale</h2>
      <p style={{ ...subtitleStyle, marginBottom: 32 }}>Named layers with intentional gaps for intermediate needs</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 72, border: "1px solid var(--border)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
        {zIndexLayers.map(({ label, token, value }, i) => (
          <div key={token} style={{
            display: "grid",
            gridTemplateColumns: "96px 48px 1fr",
            alignItems: "center",
            gap: 16,
            padding: "12px 16px",
            borderBottom: i < zIndexLayers.length - 1 ? "1px solid var(--border)" : "none",
            background: i % 2 === 0 ? "transparent" : "var(--surface-raised)",
          }}>
            <div style={{ fontSize: 12, fontWeight: 600 }}>{label}</div>
            <div style={{ fontSize: 11, opacity: 0.4, fontFamily: "var(--font-geist-mono)" }}>{value}</div>
            <div style={{ fontSize: 10, opacity: 0.35, fontFamily: "var(--font-geist-mono)" }}>{token}</div>
          </div>
        ))}
      </div>

      {/* ── Type Scale ────────────────────────────────────────── */}
      <p style={overlineStyle}>Design System — Typography</p>
      <h2 style={pageTitleStyle}>Type scale</h2>
      <p style={{ ...subtitleStyle, marginBottom: 40 }}>
        DM Sans · 14 roles · Desktop min 14px / Mobile min 16px · All sizes via CSS variables.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {typeScale.map(({ role, sizeVar, leadingVar, weightVar, trackingVar, sample }) => (
          <div key={role} style={{
            display: "grid",
            gridTemplateColumns: "80px 1fr",
            gap: "0 24px",
            alignItems: "center",
            padding: "16px 0",
            borderBottom: "1px solid var(--border)",
          }}>
            <div style={{ flexShrink: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.4, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {role}
              </div>
              <div style={{ fontSize: 9, opacity: 0.3, fontFamily: "var(--font-geist-mono)", marginTop: 2, lineHeight: 1.4 }}>
                {sizeVar}
              </div>
            </div>
            <div
              style={{
                fontSize: `var(${sizeVar})`,
                lineHeight: `var(${leadingVar})`,
                fontWeight: `var(${weightVar})`,
                letterSpacing: `var(${trackingVar})`,
                fontFamily: role === "Code" ? "var(--font-geist-mono)" : "var(--font-dm-sans)",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {sample}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

const overlineStyle: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  opacity: 0.4,
  marginBottom: 8,
};

const pageTitleStyle: React.CSSProperties = {
  fontSize: 28,
  fontWeight: 600,
  marginBottom: 4,
};

const subtitleStyle: React.CSSProperties = {
  fontSize: 14,
  opacity: 0.5,
  marginBottom: 40,
};

const thStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 500,
  opacity: 0.4,
  paddingBottom: 10,
  textAlign: "left",
  letterSpacing: "0.05em",
};

const labelCellStyle: React.CSSProperties = {
  paddingRight: 20,
  paddingTop: 4,
  paddingBottom: 4,
  whiteSpace: "nowrap",
  verticalAlign: "middle",
};
