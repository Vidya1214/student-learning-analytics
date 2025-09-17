import { useMemo } from "react";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
} from "recharts";

export default function ChartScatter({ students }) {
  const data = useMemo(() => {
    return students.map((s) => ({
      x: Number(s.attention) || 0,
      y: Number(s.assessment_score) || 0,
      name: s.name,
      id: s.student_id,
      cls: s.class,
    }));
  }, [students]);

  return (
    <div className="rounded-lg border border-black/10 dark:border-white/15 p-4">
      <h3 className="font-medium mb-3">Attention vs Assessment (Scatter)</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid />
            <XAxis type="number" dataKey="x" name="Attention" />
            <YAxis type="number" dataKey="y" name="Assessment" />
            <ReTooltip cursor={{ strokeDasharray: "3 3" }} content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const p = payload[0].payload;
                return (
                  <div className="rounded border bg-background px-2 py-1 text-sm shadow">
                    <div className="font-semibold">{p.name}</div>
                    <div>Attention: {p.x}</div>
                    <div>Assessment: {p.y}</div>
                  </div>
                );
              }
              return null;
            }} />
            <Scatter name="Students" data={data} fill="#f59e0b" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}


