'use client';

import React, { useState } from 'react';

type SortValue = string | number | null;

interface PerGameStats {
  yards: number;
  touchdowns: number;
  attempts: number;
  completions: number;
  big_time_throws: number;
}

interface QBStats {
  rank: number;
  completions: number;
  attempts: number;
  yards: number;
  touchdowns: number;
  interceptions: number;
  grade: number;               // Add this - used in getGradeColor
  grades_offense: number;
  grades_pass: number;
  first_downs: number;
  success_probability: number; // Add this - used in formatProbability
  per_game: PerGameStats;     // Add this - used in expanded view
}

interface QBProspect {
  name: string;
  school: string;
  stats: QBStats;
}

interface QBProspectsTableProps {
  prospects: QBProspect[];
}

const QBProspectsTable: React.FC<QBProspectsTableProps> = ({ prospects }) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  
  // Rest of your component code...
  const [sortField, setSortField] = useState<string>('stats.rank');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const getGradeColor = (grade: number): string => {
    if (grade >= 90) return 'bg-green-100 text-green-800 font-semibold';
    if (grade >= 80) return 'bg-blue-100 text-blue-800 font-semibold';
    if (grade >= 70) return 'bg-yellow-100 text-yellow-800 font-semibold';
    if (grade >= 60) return 'bg-orange-100 text-orange-800 font-semibold';
    return 'bg-red-100 text-red-800 font-semibold';
  };

  const formatProbability = (prob: number): string => {
    return prob ? `${(prob * 100).toFixed(1)}%` : 'N/A';
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedProspects = [...prospects].sort((a, b) => {
    let aValue: SortValue;
    let bValue: SortValue;
    
    switch (sortField) {
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
      case 'stats.yards':
        aValue = a.stats.yards;
        bValue = b.stats.yards;
        break;
      default:
        return 0;
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <div className="space-y-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-800">
          <tr>
            <th 
              onClick={() => handleSort('name')}
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer hover:bg-gray-700"
            >
              Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th 
              onClick={() => handleSort('school')}
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer hover:bg-gray-700"
            >
              School {sortField === 'school' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th 
              onClick={() => handleSort('stats.rank')}
              className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider cursor-pointer hover:bg-gray-700"
            >
              Rank {sortField === 'stats.rank' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th 
              onClick={() => handleSort('stats.completions')}
              className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider cursor-pointer hover:bg-gray-700"
            >
              Comp/Att {sortField === 'stats.completions' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th 
              onClick={() => handleSort('stats.yards')}
              className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider cursor-pointer hover:bg-gray-700"
            >
              Yards {sortField === 'stats.yards' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th 
              onClick={() => handleSort('stats.grade')}
              className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider cursor-pointer hover:bg-gray-700"
            >
              Grade {sortField === 'stats.grade' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedProspects.map((prospect) => (
            <React.Fragment key={prospect.name}>
              <tr 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => setExpandedRow(expandedRow === prospect.name ? null : prospect.name)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{prospect.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{prospect.school}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-medium text-gray-900">#{prospect.stats.rank}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-medium text-gray-900">
                    {prospect.stats.completions}/{prospect.stats.attempts}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-medium text-gray-900">{prospect.stats.yards}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`px-2 py-1 rounded-full text-sm ${getGradeColor(prospect.stats.grade)}`}>
                    {prospect.stats.grade.toFixed(1)}
                  </span>
                </td>
              </tr>
              {expandedRow === prospect.name && (
                <tr>
                  <td colSpan={6} className="px-6 py-4 bg-white border-t border-gray-100">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg shadow">
                        <div className="text-sm font-medium text-gray-900">Pass Grade</div>
                        <div className="text-lg font-bold text-gray-900">
                          {prospect.stats.grades_pass.toFixed(1)}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg shadow">
                        <div className="text-sm font-medium text-gray-900">Offense Grade</div>
                        <div className="text-lg font-bold text-gray-900">
                          {prospect.stats.grades_offense.toFixed(1)}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg shadow">
                        <div className="text-sm font-medium text-gray-900">Success Probability</div>
                        <div className="text-lg font-bold text-gray-900">
                          {formatProbability(prospect.stats.success_probability)}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg shadow">
                        <div className="text-sm font-medium text-gray-900">Per Game Stats</div>
                        <div className="text-sm font-medium text-gray-900">
                          <div>Yards: {prospect.stats.per_game.yards.toFixed(1)}</div>
                          <div>TDs: {prospect.stats.per_game.touchdowns.toFixed(1)}</div>
                          <div>Big Time Throws: {prospect.stats.per_game.big_time_throws.toFixed(1)}</div>
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

export default QBProspectsTable;