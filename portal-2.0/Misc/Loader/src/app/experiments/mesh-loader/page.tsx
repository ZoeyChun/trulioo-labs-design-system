import type { Metadata } from "next";
import { MeshLoaderDemo } from "./demo";

export const metadata: Metadata = {
  title: "Mesh loader",
  description: "Animated mesh gradient circle with the Trulioo dots logo.",
};

export default function MeshLoaderPage() {
  return <MeshLoaderDemo />;
}
