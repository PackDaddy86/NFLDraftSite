'use client';

import { useEffect, useState } from 'react';
import QBProspectsTable from '../components/qb-prospects-table';

export default function Home() {
  const [prospects, setProspects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/qb_prospects_2025.json')
      .then(res => res.json())
      .then(data => {
        setProspects(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading QB prospects:', error);
        setLoading(false);
      });
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">2025 QB Prospects Analysis</h1>
      {loading ? (
        <div className="text-center py-8">Loading prospect data...</div>
      ) : (
        <QBProspectsTable prospects={prospects} />
      )}
    </main>
  );
}
