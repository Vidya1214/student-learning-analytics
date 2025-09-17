import dynamic from "next/dynamic";
const ChartBar = dynamic(() => import("./ChartBar.jsx"), { ssr: false });
const ChartScatter = dynamic(() => import("./ChartScatter.jsx"), { ssr: false });
const ChartRadar = dynamic(() => import("./ChartRadar.jsx"), { ssr: false });

export default function ChartsSection({ students, personaProfiles }) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-4">Charts</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartBar students={students} />
        <ChartScatter students={students} />
        <div className="lg:col-span-2"><ChartRadar students={students} personaProfiles={personaProfiles} /></div>
      </div>
    </section>
  );
}

