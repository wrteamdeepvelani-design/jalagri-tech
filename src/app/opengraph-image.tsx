/**
 * Site-wide Open Graph / social card, generated at build time by next/og.
 * Twitter reuses it via twitter-image.tsx. The logo is read off disk and
 * inlined as a data URI — ImageResponse cannot resolve /public URLs.
 */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Jal Agritech India Pvt Ltd — irrigation, landscaping and agriculture solutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(
    join(process.cwd(), "public/images/logo/logo.png"),
  );
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1b3d1f 0%, #2f5d2a 100%)",
          color: "#ffffff",
          padding: 80,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={190} height={190} alt="" />
        <div
          style={{
            marginTop: 36,
            fontSize: 62,
            fontWeight: 700,
            letterSpacing: -1,
            textAlign: "center",
          }}
        >
          Jal Agritech India Pvt Ltd
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: 30,
            color: "#cfe3c4",
            textAlign: "center",
          }}
        >
          Irrigation · Landscaping · Agriculture Solutions
        </div>
        <div style={{ marginTop: 14, fontSize: 24, color: "#a9c79c" }}>
          15+ years · Bhuj-Kutch, Gujarat · Pan-India
        </div>
      </div>
    ),
    size,
  );
}
