'use client';

import React, { useState } from 'react';

interface PerGameStats {
  yards: number;
  touchdowns: number;
  attempts: number;
  completions: number;
  big_time_throws: number;
}

interface QBStats {
  rank: number;
  games_played: number;
  grade: number;
  success_probability: number;
  completions: number;
  attempts: number;
  yards: number;
  touchdowns: number;
  grades_offense: number;
  grades_pass: number;
  per_game: PerGameStats;
}

interface QBPrediction {
  name: string;
  school: string;
  stats: QBStats;
}

interface QBGradesTableProps {
  predictions: QBPrediction[];
}

type SortConfig = {
  key: string;
  direction: 'asc' | 'desc';
};

const QBGradesTable: React.FC<QBGradesTableProps> = ({ predictions = [] }) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'stats.grade', direction: 'desc' });

  const getGradeColor = (grade?: number): string => {
    if (!grade) return 'bg-gray-100 text-gray-800 font-semibold';
    if (grade >= 90) return 'bg-green-100 text-green-800 font-semibold';
    if (grade >= 80) return 'bg-blue-100 text-blue-800 font-semibold';
    if (grade >= 70) return 'bg-yellow-100 text-yellow-800 font-semibold';
    if (grade >= 60) return 'bg-orange-100 text-orange-800 font-semibold';
    return 'bg-red-100 text-red-800 font-semibold';
  };

  const formatGrade = (grade?: number): string => {
    return grade ? grade.toFixed(1) : 'N/A';
  };

  const formatProbability = (prob?: number): string => {
    return prob ? `${(prob * 100).toFixed(1)}%` : 'N/A';
  };

  const sortData = (data: QBPrediction[]) => {
    const sortedData = [...data].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortConfig.key) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'school':
          aValue = a.school;
          bValue = b.school;
          break;
        case 'stats.rank':
          aValue = a.stats.rank;
          bValue = b.stats.rank;
          break;
        case 'stats.grade':
          aValue = a.stats.grade;
          bValue = b.stats.grade;
          break;
        case 'stats.success_probability':
          aValue = a.stats.success_probability;
          bValue = b.stats.success_probability;
          break;
        case 'stats.games_played':
          aValue = a.stats.games_played;
          bValue = b.stats.games_played;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return sortedData;
  };

  const handleSort = (key: string) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) return '↕️';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-800">
          <tr>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer hover:bg-gray-700"
              onClick={() => handleSort('name')}
            >
              Name {getSortIcon('name')}
            </th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer hover:bg-gray-700"
              onClick={() => handleSort('school')}
            >
              School {getSortIcon('school')}
            </th>
            <th 
              className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider cursor-pointer hover:bg-gray-700"
              onClick={() => handleSort('stats.rank')}
            >
              Big Board {getSortIcon('stats.rank')}
            </th>
            <th 
              className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider cursor-pointer hover:bg-gray-700"
              onClick={() => handleSort('stats.grade')}
            >
              Grade {getSortIcon('stats.grade')}
            </th>
            <th 
              className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider cursor-pointer hover:bg-gray-700"
              onClick={() => handleSort('stats.success_probability')}
            >
              Success {getSortIcon('stats.success_probability')}
            </th>
            <th 
              className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider cursor-pointer hover:bg-gray-700"
              onClick={() => handleSort('stats.games_played')}
            >
              Games {getSortIcon('stats.games_played')}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortData(predictions)?.map((prediction) => (
            <React.Fragment key={prediction?.name || 'unknown'}>
              <tr 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => setExpandedRow(expandedRow === prediction?.name ? null : prediction?.name)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{prediction?.name || 'N/A'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{prediction?.school || 'N/A'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-medium text-gray-900">
                    {prediction?.stats?.rank ? `#${prediction.stats.rank}` : 'N/A'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`px-2 py-1 rounded-full text-sm ${getGradeColor(prediction?.stats?.grade)}`}>
                    {formatGrade(prediction?.stats?.grade)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-medium text-gray-900">
                    {formatProbability(prediction?.stats?.success_probability)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-medium text-gray-900">
                    {prediction?.stats?.games_played || 'N/A'}
                  </div>
                </td>
              </tr>
              {expandedRow === prediction?.name && (
                <tr>
                  <td colSpan={6} className="px-6 py-4 bg-white border-t border-gray-100">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg shadow">
                        <div className="text-sm font-medium text-gray-900">Completions/Attempts</div>
                        <div className="text-lg font-bold text-gray-900">
                          {prediction?.stats?.completions || 0}/{prediction?.stats?.attempts || 0}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg shadow">
                        <div className="text-sm font-medium text-gray-900">Pass Grade</div>
                        <div className="text-lg font-bold text-gray-900">
                          {prediction?.stats?.grades_pass?.toFixed(1) || 'N/A'}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg shadow">
                        <div className="text-sm font-medium text-gray-900">Offense Grade</div>
                        <div className="text-lg font-bold text-gray-900">
                          {prediction?.stats?.grades_offense?.toFixed(1) || 'N/A'}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg shadow">
                        <div className="text-sm font-medium text-gray-900">Per Game Averages</div>
                        <div className="text-sm font-medium text-gray-900">
                          <div>Yards: {prediction?.stats?.per_game?.yards?.toFixed(1) || 'N/A'}</div>
                          <div>TDs: {prediction?.stats?.per_game?.touchdowns?.toFixed(1) || 'N/A'}</div>
                          <div>Big Time Throws: {prediction?.stats?.per_game?.big_time_throws?.toFixed(1) || 'N/A'}</div>
                        </div>
                      </div>
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

export default QBGradesTable;