import { useMemo } from "react";

export default function Insights({ students }) {
  const insights = useMemo(() => {
    if (!students.length) return [];
    const n = students.length;
    const avg = (arr) => arr.reduce((a, b) => a + b, 0) / (arr.length || 1);
    const get = (k) => students.map((s) => Number(s[k]) || 0);

    const attention = get("attention");
    const assessment = get("assessment_score");
    const retention = get("retention");

    const corr = (x, y) => {
      const mx = avg(x);
      const my = avg(y);
      let num = 0;
      let dx = 0;
      let dy = 0;
      for (let i = 0; i < x.length; i++) {
        const a = x[i] - mx;
        const b = y[i] - my;
        num += a * b;
        dx += a * a;
        dy += b * b;
      }
      const den = Math.sqrt(dx) * Math.sqrt(dy) || 1;
      return num / den;
    };

    const attentionCorr = corr(attention, assessment);
    const retentionCorr = corr(retention, assessment);

    const topAttention = avg(attention.filter((v) => v >= 80));
    const topAttentionAssess = avg(
      students.filter((s) => s.attention >= 80).map((s) => s.assessment_score)
    );
    const restAssess = avg(
      students.filter((s) => s.attention < 80).map((s) => s.assessment_score)
    );

    const msgs = [];
    msgs.push(
      `Students with higher attention levels tend to score better (correlation: ${attentionCorr.toFixed(
        2
      )}).`
    );
    msgs.push(
      `Retention has a ${retentionCorr > 0 ? "positive" : "negative"} correlation (${retentionCorr.toFixed(
        2
      )}) with assessment scores.`
    );
    msgs.push(
      `Students with attention ≥ 80 average ${topAttentionAssess.toFixed(
        1
      )} vs ${restAssess.toFixed(1)} for others.`
    );

    return msgs;
  }, [students]);

  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-4">Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((text, idx) => (
          <div key={idx} className="rounded-xl border border-black/10 dark:border-white/10 bg-gradient-to-b from-white/60 to-white/20 dark:from-white/10 dark:to-white/5 p-4 shadow-sm">
            {text}
          </div>
        ))}
      </div>
    </section>
  );
}


