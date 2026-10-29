import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// The preview card LinkedIn, Slack and iMessage show when the link is shared.
// Rendered once at build time to out/og.png.
export const dynamic = "force-static";

const ink = "#18202e";
const paper = "#eef1ef";
const cobalt = "#2343e0";

const fontFile = (weight: number) =>
  readFile(
    join(
      process.cwd(),
      `node_modules/@fontsource/archivo-narrow/files/archivo-narrow-latin-${weight}-normal.woff`,
    ),
  );

function Box({ label, filled = false, dashed = false }: { label: string; filled?: boolean; dashed?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 28px",
        height: 66,
        whiteSpace: "nowrap",
        border: `3px ${dashed ? "dashed" : "solid"} ${ink}`,
        background: filled ? ink : dashed ? "transparent" : "#f8f9f7",
        color: filled ? paper : ink,
        fontSize: 28,
        fontWeight: 700,
      }}
    >
      {label}
    </div>
  );
}

function Arrow() {
  return (
    <svg width="72" height="24" viewBox="0 0 72 24">
      <path d="M0 12 H58" stroke={cobalt} strokeWidth="4" />
      <path d="M56 3 L70 12 L56 21 Z" fill={cobalt} />
    </svg>
  );
}

export async function GET() {
  const [regular, bold] = await Promise.all([fontFile(400), fontFile(700)]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          background: paper,
          color: ink,
          fontFamily: "Archivo Narrow",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 128, fontWeight: 700, letterSpacing: -2, lineHeight: 1 }}>
            Khant Phyo Wai
          </div>
          <div style={{ marginTop: 26, fontSize: 40, maxWidth: 960, lineHeight: 1.22 }}>
            I find the problem worth solving and work out the tech and the money behind the fix.
            Then I get a team to build it.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Box label="A messy problem" dashed />
          <Arrow />
          <Box label="KP" filled />
          <Arrow />
          <Box label="Something that works" />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Archivo Narrow", data: regular, weight: 400, style: "normal" },
        { name: "Archivo Narrow", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
