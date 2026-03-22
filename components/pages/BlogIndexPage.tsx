import {getLocale, getTranslations} from "next-intl/server";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import {Link} from "@/i18n/navigation";
import type {Locale} from "@/i18n/config";
import {getBlogPosts} from "@/lib/content";

export default async function BlogIndexPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("blog");
  const posts = getBlogPosts(locale);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="border-b border-border py-20">
          <div className="mx-auto w-full max-w-3xl px-6">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
              {t("eyebrow")}
            </p>
            <h1 className="mb-4 text-4xl md:text-5xl">{t("title")}</h1>
            <p className="max-w-2xl text-base leading-8 text-muted">
              {t("description")}
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto w-full max-w-3xl divide-y divide-border px-6">
            {posts.map((post) => (
              <article key={post.slug} className="py-8">
                <Link href={`/blog/${post.slug}`} className="group block">
                  <p className="mb-2 font-mono text-xs text-muted">
                    {post.date} · {post.readTime} {t("readSuffix")}
                  </p>
                  <h2 className="mb-2 text-2xl transition-colors group-hover:text-accent">
                    {post.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-muted">
                    {post.excerpt}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
