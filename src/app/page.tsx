'use client';

import { useEffect, useState } from 'react';
import QBProspectsTable from '@/components/qb-prospects-table'; // Changed import path

export default function Home() {
  const [prospects, setProspects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/qb_prospects_2025.json')
      .then(res => res.json())
      .then(data => {
        setProspects(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="p-8">
      <QBProspectsTable prospects={prospects} />
    </main>
  );
}