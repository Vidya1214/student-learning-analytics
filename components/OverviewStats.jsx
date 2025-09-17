export default function OverviewStats({ students }) {
  const metrics = [
    { key: "comprehension", label: "Comprehension" },
    { key: "attention", label: "Attention" },
    { key: "focus", label: "Focus" },
    { key: "retention", label: "Retention" },
    { key: "engagement_time", label: "Engagement (min)" },
    { key: "assessment_score", label: "Assessment Score" },
  ];

  const averages = metrics.map((m) => {
    const sum = students.reduce((acc, s) => acc + (Number(s[m.key]) || 0), 0);
    const avg = students.length ? sum / students.length : 0;
    return { ...m, value: avg };
  });

  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-4">Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {averages.map((m) => (
          <div key={m.key} className="group relative overflow-hidden rounded-xl border border-black/10 dark:border-white/10 bg-gradient-to-b from-white/60 to-white/20 dark:from-white/10 dark:to-white/5 p-4 shadow-sm">
            <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-indigo-400/10 blur-2xl group-hover:bg-indigo-400/20 transition" />
            <div className="text-xs uppercase tracking-wide text-black/60 dark:text-white/60">{m.label}</div>
            <div className="text-3xl font-bold mt-2">
              {m.key === "engagement_time" ? m.value.toFixed(1) : m.value.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


