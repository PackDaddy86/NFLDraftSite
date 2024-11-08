'use client';

import { useEffect, useState } from 'react';
import QBGradesTable from '../../../components/qb-grades-table';

export default function GradesPage() {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/qb_predictions_2025.json')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Loaded predictions:', data);
        setPredictions(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading QB predictions:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (error) {
    return <div className="p-8 text-red-600">Error loading data: {error}</div>;
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">2025 QB Draft Grades</h1>
      {loading ? (
        <div className="text-center py-8">Loading QB predictions...</div>
      ) : (
        <>
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Grade Scale</h2>
            <div className="grid grid-cols-5 gap-4 bg-white p-4 rounded-lg shadow">
              <div className="text-center p-2 bg-green-100 rounded">
                <div className="font-medium text-green-800">90+ Elite</div>
              </div>
              <div className="text-center p-2 bg-blue-100 rounded">
                <div className="font-medium text-blue-800">80-89 Good</div>
              </div>
              <div className="text-center p-2 bg-yellow-100 rounded">
                <div className="font-medium text-yellow-800">70-79 Average</div>
              </div>
              <div className="text-center p-2 bg-orange-100 rounded">
                <div className="font-medium text-orange-800">60-69 Below Avg</div>
              </div>
              <div className="text-center p-2 bg-red-100 rounded">
                <div className="font-medium text-red-800">&lt;60 Poor</div>
              </div>
            </div>
          </div>
          <QBGradesTable predictions={predictions} />
        </>
      )}
    </main>
  );
}