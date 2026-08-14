import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

const logoDataUrl = `data:image/png;base64,${fs
  .readFileSync(path.join(process.cwd(), "assets", "Logo.png"))
  .toString("base64")}`;

export const size = { width: 48, height: 48 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <img
          src={logoDataUrl}
          width={size.width}
          height={size.height}
          style={{ width: "95%", height: "95%", objectFit: "contain" }}
        />
      </div>
    ),
    { ...size }
  );
}
