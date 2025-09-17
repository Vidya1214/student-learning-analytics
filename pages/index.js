import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import OverviewStats from '../components/OverviewStats.jsx';
import Layout from '../components/Layout.jsx';
const ChartsSection = dynamic(() => import('../components/ChartsSection.jsx'), { ssr: false });
import StudentTable from '../components/StudentTable.jsx';
import Insights from '../components/Insights.jsx';

export default function Home() {
  const [students, setStudents] = useState([]);
  const [personaProfiles, setPersonaProfiles] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch('/data/student_data.json').then((r) => r.json()),
      fetch('/data/persona_profiles.json').then((r) => r.json()),
    ]).then(([s, p]) => {
      setStudents(Array.isArray(s) ? s : []);
      setPersonaProfiles(Array.isArray(p) ? p : []);
    }).catch(() => {
      setStudents([]);
      setPersonaProfiles([]);
    });
  }, []);

  return (
    <Layout>
      <section className="mb-6">
        <h1 className="text-2xl font-bold">Student Performance Dashboard</h1>
        <p className="text-black/60 dark:text-white/70">Visualize cognitive skills and outcomes</p>
      </section>

      <OverviewStats students={students} />

      <div id="charts">
        <ChartsSection students={students} personaProfiles={personaProfiles} />
      </div>

      <div id="students">
        <StudentTable students={students} />
      </div>

      <div id="insights">
        <Insights students={students} />
      </div>
    </Layout>
  );
}
