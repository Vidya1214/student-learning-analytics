import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  Legend,
} from "recharts";

const SKILL_OPTIONS = [
  { key: "comprehension", label: "Comprehension" },
  { key: "attention", label: "Attention" },
  { key: "focus", label: "Focus" },
  { key: "retention", label: "Retention" },
  { key: "engagement_time", label: "Engagement Time" },
];

export default function ChartBar({ students }) {
  const [skill, setSkill] = useState("comprehension");

  const data = useMemo(() => {
    return students.map((s) => ({
      name: s.name || `S${s.student_id}`,
      skill: Number(s[skill]) || 0,
      assessment_score: Number(s.assessment_score) || 0,
      id: s.student_id,
      cls: s.class,
    }));
  }, [students, skill]);

  return (
    <div className="rounded-lg border border-black/10 dark:border-white/15 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium">Skill vs Assessment (Bar)</h3>
        <select
          className="border rounded px-2 py-1 bg-background"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        >
          {SKILL_OPTIONS.map((o) => (
            <option key={o.key} value={o.key}>{o.label}</option>
          ))}
        </select>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" hide={true} />
            <YAxis />
            <ReTooltip content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const p = payload[0].payload;
                return (
                  <div className="rounded border bg-background px-2 py-1 text-sm shadow">
                    <div className="font-semibold">{p.name}</div>
                    <div>ID: {p.id}</div>
                    <div>Class: {p.cls}</div>
                    <div>Skill: {p.skill}</div>
                    <div>Assessment: {p.assessment_score}</div>
                  </div>
                );
              }
              return null;
            }} />
            <Legend />
            <Bar dataKey="skill" name="Selected Skill" fill="#60a5fa" />
            <Bar dataKey="assessment_score" name="Assessment" fill="#34d399" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}


