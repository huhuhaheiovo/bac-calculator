const factors = [
  {
    title: "Body Weight",
    body: "Heavier individuals have a larger volume of body fluids, which dilutes alcohol more efficiently than in lighter individuals.",
  },
  {
    title: "Biological Sex",
    body: "Differences in body composition and alcohol dehydrogenase levels can change how alcohol distributes through the body.",
  },
  {
    title: "Time Elapsed",
    body: "Your liver metabolizes alcohol over time, usually around 0.015% BAC per hour on average.",
  },
  {
    title: "Food Intake",
    body: "Eating before or during drinking slows absorption, which can reduce and delay peak BAC.",
  },
  {
    title: "Medications",
    body: "Prescription and over-the-counter drugs can amplify impairment or change how your body responds to alcohol.",
  },
  {
    title: "Genetics & Tolerance",
    body: "Genetic variation changes metabolism speed. Tolerance can affect how impaired you feel, but not your actual BAC.",
  },
];

export default function FactorsGrid() {
  return (
    <section className="border-b border-border py-16">
      <div className="mx-auto w-full max-w-5xl px-6">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Science
        </p>
        <h2 className="mb-4 text-3xl md:text-4xl">Factors That Affect Your BAC</h2>
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-muted">
          No two people metabolize alcohol identically. The Widmark formula
          covers the major physiological variables, but context still matters.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {factors.map((factor, index) => (
            <article
              key={factor.title}
              className="rounded-sm border border-border bg-card p-5 transition-colors hover:border-accent/30"
            >
              <p className="mb-3 font-mono text-xs text-muted">
                0{index + 1}
              </p>
              <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                {factor.title}
              </h3>
              <p className="text-xs leading-relaxed text-muted">{factor.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
