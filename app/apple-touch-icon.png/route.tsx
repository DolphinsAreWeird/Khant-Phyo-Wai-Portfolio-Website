import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// The home-screen icon for iPhones: the favicon dolphin rendered to PNG at
// build time.
export const dynamic = "force-static";

export async function GET() {
  const svg = await readFile(join(process.cwd(), "app/icon.svg"), "utf8");
  const src = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#18202e" }}>
        <img src={src} width={180} height={180} alt="" />
      </div>
    ),
    { width: 180, height: 180 },
  );
}
