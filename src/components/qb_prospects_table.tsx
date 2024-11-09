'use client';

import React, { useState } from 'react';

interface Stats {
  rank: number;
  completions: number;
  attempts: number;
  yards: number;
  touchdowns: number;
  interceptions: number;
  big_time_throws: number;
  turnover_worthy_plays: number;
  grades_offense: number;
  grades_pass: number;
  first_downs: number;
}

interface Comparison {
  name: string;
  year: number;
  similarity: number;
  nfl_success_score: number | null;
  stats: Stats;
}

interface Prospect {
  name: string;
  school: string;
  stats: Stats;
  comparisons: Comparison[];
}

interface QBProspectsTableProps {
  prospects: Prospect[];
}

const QBProspectsTable: React.FC<QBProspectsTableProps> = ({ prospects = [] }) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-800">
          <tr>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Name
            </th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              School
            </th>
            <th 
              className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              Rank
            </th>
            <th 
              className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              Grade
            </th>
            <th 
              className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              Yards
            </th>
            <th 
              className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              TDs
            </th>
            <th 
              className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              INTs
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {prospects.map((prospect) => (
            <React.Fragment key={prospect.name}>
              <tr 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => setExpandedRow(expandedRow === prospect.name ? null : prospect.name)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{prospect.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{prospect.school}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-medium text-gray-900">{prospect.stats.rank}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-medium text-gray-900">{prospect.stats.grades_offense ?? 'N/A'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-medium text-gray-900">{prospect.stats.yards}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-medium text-gray-900">{prospect.stats.touchdowns}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-medium text-gray-900">{prospect.stats.interceptions}</div>
                </td>
              </tr>
              {expandedRow === prospect.name && (
                <tr>
                  <td colSpan={7} className="px-6 py-4 bg-white border-t border-gray-100">
                    <div className="mt-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Comparisons
                      </h3>
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                              Name
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                              Year
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                              Similarity (%)
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                              NFL Success Score
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {prospect.comparisons.map((comp, idx) => (
                            <tr key={idx}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{comp.name}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-center">
                                <div className="text-sm font-medium text-gray-900">{comp.year}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-center">
                                <div className="text-sm font-medium text-gray-900">{(comp.similarity * 100).toFixed(2)}%</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-center">
                                <div className="text-sm font-medium text-gray-900">
                                  {comp.nfl_success_score !== null ? comp.nfl_success_score : 'N/A'}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QBProspectsTable;