import type { Metadata } from "next";
import BACLandingPage from "@/components/pages/BACLandingPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "BAC Calculator - Check Blood Alcohol Content Online",
  description:
    "Use this BAC calculator to estimate blood alcohol content, compare common legal limits, and understand the Widmark formula.",
  path: "/bac-calculator",
});

export default function BACCalculatorPage() {
  return <BACLandingPage />;
}
