'use client';

import { useEffect, useState } from 'react';
import QBProspectsTable from '../components/qb_prospects_table';  // Note the underscore

export default function Home() {  // Note: this is Home, not GradesPage
  const [prospects, setProspects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/qb_prospects_2025.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        console.log('Loaded data:', data);
        setProspects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading data:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error}</div>;

  return (
    <main className="p-8">
      <QBProspectsTable prospects={prospects} />
    </main>
  );
}