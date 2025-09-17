import { useMemo, useState, useEffect } from "react";

export default function StudentTable({ students }) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("student_id");
  const [sortDir, setSortDir] = useState("asc");
  const [visibleCount, setVisibleCount] = useState(50);

  useEffect(() => {
    setVisibleCount(50);
  }, [query, sortKey, sortDir]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q
      ? students.filter(
          (s) =>
            (s.name || "").toLowerCase().includes(q) ||
            (s.class || "").toLowerCase().includes(q)
        )
      : students;
    const sorted = [...base].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "number" && typeof bv === "number") {
        return sortDir === "asc" ? av - bv : bv - av;
      }
      return sortDir === "asc"
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
    return sorted;
  }, [students, query, sortKey, sortDir]);

  const headers = [
    { key: "student_id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "class", label: "Class" },
    { key: "comprehension", label: "Comprehension" },
    { key: "attention", label: "Attention" },
    { key: "focus", label: "Focus" },
    { key: "retention", label: "Retention" },
    { key: "engagement_time", label: "Engagement" },
    { key: "assessment_score", label: "Assessment" },
    { key: "persona", label: "Persona" },
  ];

  const onSort = (k) => {
    if (k === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(k);
      setSortDir("asc");
    }
  };

  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-4">Students</h2>
      <div className="flex items-center justify-between mb-4 gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or class..."
          className="border rounded-lg px-3 py-2 w-full sm:w-80 bg-background shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <div className="text-sm text-black/60 dark:text-white/70">
          {Math.min(visibleCount, filtered.length)} of {filtered.length} results
        </div>
      </div>
      <div className="overflow-auto rounded-xl border border-black/10 dark:border-white/15 shadow-sm">
        <table className="min-w-[900px] w-full text-sm">
          <thead className="bg-black/5 dark:bg-white/5 sticky top-0 z-10">
            <tr>
              {headers.map((h) => (
                <th
                  key={h.key}
                  className="text-left px-3 py-2 cursor-pointer whitespace-nowrap select-none"
                  onClick={() => onSort(h.key)}
                >
                  {h.label}
                  {sortKey === h.key ? (sortDir === "asc" ? " ▲" : " ▼") : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 dark:divide-white/10">
            {filtered.slice(0, visibleCount).map((s, idx) => (
              <tr key={s.student_id} className={idx % 2 === 0 ? "bg-white/40 dark:bg-white/5" : ""}>
                <td className="px-3 py-2">{s.student_id}</td>
                <td className="px-3 py-2">{s.name}</td>
                <td className="px-3 py-2">{s.class}</td>
                <td className="px-3 py-2">{s.comprehension}</td>
                <td className="px-3 py-2">{s.attention}</td>
                <td className="px-3 py-2">{s.focus}</td>
                <td className="px-3 py-2">{s.retention}</td>
                <td className="px-3 py-2">{s.engagement_time}</td>
                <td className="px-3 py-2">{s.assessment_score}</td>
                <td className="px-3 py-2">{s.persona}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {visibleCount < filtered.length && (
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={() => setVisibleCount((c) => Math.min(c + 50, filtered.length))}
            className="px-4 py-2 rounded-md bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Show more
          </button>
          <button
            onClick={() => setVisibleCount(filtered.length)}
            className="px-4 py-2 rounded-md bg-black/10 dark:bg-white/10 text-black dark:text-white hover:bg-black/15 dark:hover:bg-white/15"
          >
            Show all
          </button>
        </div>
      )}
    </section>
  );
}


