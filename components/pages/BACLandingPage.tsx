import {getTranslations} from "next-intl/server";
import BACCalculator from "@/components/calculator/BACCalculator";
import BACTable from "@/components/content/BACTable";
import FAQ from "@/components/content/FAQ";
import FactorsGrid from "@/components/content/FactorsGrid";
import LegalLimits from "@/components/content/LegalLimits";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import {faqSchema, webAppSchema} from "@/lib/metadata";

function JsonLd({data}: {data: object}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(data)}}
    />
  );
}

export default async function BACLandingPage() {
  const t = await getTranslations("landing");

  return (
    <>
      <JsonLd data={webAppSchema} />
      <JsonLd data={faqSchema} />
      <Header />
      <main className="min-h-screen">
        <BACCalculator />
        <section className="border-b border-border py-20">
          <div className="mx-auto grid w-full max-w-5xl gap-12 px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
                {t("eyebrow")}
              </p>
              <h1 className="max-w-3xl text-5xl leading-tight md:text-6xl">
                {t("title")}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-muted">
                {t("description")}
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#calculator"
                  className="inline-flex items-center justify-center rounded-sm bg-accent px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-black"
                >
                  {t("primaryCta")}
                </a>
                <a
                  href="#learn-more"
                  className="inline-flex items-center justify-center rounded-sm border border-border px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-text"
                >
                  {t("secondaryCta")}
                </a>
              </div>
            </div>
            <div className="rounded-sm border border-accent/20 bg-[linear-gradient(180deg,rgba(0,212,170,0.08),rgba(255,255,255,0.02))] p-6">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                {t("cardTitle")}
              </p>
              <div className="space-y-4 text-sm leading-relaxed text-muted">
                {(t.raw("cardLines") as string[]).map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
        <div id="learn-more">
          <BACTable />
          <FactorsGrid />
          <LegalLimits />
          <FAQ />
        </div>
      </main>
      <Footer />
    </>
  );
}
