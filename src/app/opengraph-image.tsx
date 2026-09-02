import { DATA } from "@/data/resume";
import { ImageResponse } from "next/og";

export const alt = `${DATA.name} — ${DATA.description}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#08090a",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "72px",
            height: "6px",
            backgroundColor: "#f97316",
            marginBottom: "40px",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: "84px",
            fontWeight: 700,
            color: "#fafafa",
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
          }}
        >
          {DATA.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "36px",
            color: "#a3a3a3",
            marginTop: "24px",
          }}
        >
          {DATA.description}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "28px",
            color: "#f97316",
            marginTop: "56px",
          }}
        >
          {DATA.url.replace("https://", "")}
        </div>
      </div>
    ),
    size
  );
}
