import type { Metadata } from "next";
import BACLandingPage from "@/components/pages/BACLandingPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "BAC Calculator - Estimate Blood Alcohol Content Instantly",
  description:
    "Free BAC calculator using the Widmark formula to estimate blood alcohol content, legal thresholds, and time to sober.",
  path: "/",
});

export default function HomePage() {
  return <BACLandingPage />;
}
