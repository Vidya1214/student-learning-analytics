import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
} from "recharts";

export default function ChartRadar({ students, personaProfiles }) {
  const [mode, setMode] = useState("student");
  const [selectedStudentId, setSelectedStudentId] = useState(
    students?.[0]?.student_id || ""
  );
  const [selectedPersona, setSelectedPersona] = useState(0);

  const data = useMemo(() => {
    const axes = [
      { key: "comprehension", label: "Comprehension" },
      { key: "attention", label: "Attention" },
      { key: "focus", label: "Focus" },
      { key: "retention", label: "Retention" },
      { key: "engagement_time", label: "Engagement" },
      { key: "assessment_score", label: "Assessment" },
    ];

    if (mode === "student") {
      const s = students.find((x) => x.student_id === Number(selectedStudentId));
      if (!s) return [];
      return axes.map((a) => ({ metric: a.label, value: Number(s[a.key]) || 0 }));
    }
    const p = personaProfiles.find((x) => Number(x.persona) === Number(selectedPersona));
    if (!p) return [];
    return axes.map((a) => ({ metric: a.label, value: Number(p[a.key]) || 0 }));
  }, [mode, selectedStudentId, selectedPersona, students, personaProfiles]);

  return (
    <div className="rounded-lg border border-black/10 dark:border-white/15 p-4">
      <div className="flex flex-wrap items-center gap-2 justify-between mb-3">
        <h3 className="font-medium">Cognitive Profile (Radar)</h3>
        <div className="flex items-center gap-2">
          <select
            className="border rounded px-2 py-1 bg-background"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="persona">Persona</option>
          </select>
          {mode === "student" ? (
            <select
              className="border rounded px-2 py-1 bg-background"
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
            >
              {students.slice(0, 200).map((s) => (
                <option key={s.student_id} value={s.student_id}>
                  {s.name} (#{s.student_id})
                </option>
              ))}
            </select>
          ) : (
            <select
              className="border rounded px-2 py-1 bg-background"
              value={selectedPersona}
              onChange={(e) => setSelectedPersona(Number(e.target.value))}
            >
              <option value={0}>Persona 0</option>
              <option value={1}>Persona 1</option>
              <option value={2}>Persona 2</option>
            </select>
          )}
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="70%">
            <PolarGrid />
            <PolarAngleAxis dataKey="metric" />
            <PolarRadiusAxis />
            <Radar name="Profile" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}


