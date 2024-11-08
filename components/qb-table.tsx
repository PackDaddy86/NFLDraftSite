'use client';

import React, { useState } from 'react';

interface QBStats {
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
  stats: QBStats;
}

interface QBProspect {
  name: string;
  school: string;
  stats: QBStats;
  comparisons: Comparison[];
}

type SortField = 'name' | 'school' | 'rank' | 'completions' | 'yards' | 'touchdowns' | 'grades_offense';
type SortDirection = 'asc' | 'desc';

const QBProspectsTable = () => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{field: SortField, direction: SortDirection}>({
    field: 'rank',
    direction: 'asc'
  });

  const getGradeColor = (grade: number): string => {
    if (grade >= 90) return 'bg-green-100 text-green-800 font-semibold';
    if (grade >= 80) return 'bg-blue-100 text-blue-800 font-semibold';
    if (grade >= 70) return 'bg-yellow-100 text-yellow-800 font-semibold';
    if (grade >= 60) return 'bg-orange-100 text-orange-800 font-semibold';
    return 'bg-red-100 text-red-800 font-semibold';
  };

  // Sample data - replace with your actual data
  const prospects: QBProspect[] = [{
    name: "Shedeur Sanders",
    school: "Colorado",
    stats: {
      rank: 3,
      completions: 195,
      attempts: 272,
      yards: 2268,
      touchdowns: 19,
      interceptions: 6,
      big_time_throws: 18,
      turnover_worthy_plays: 4,
      grades_offense: 91.0,
      grades_pass: 90.4,
      first_downs: 109
    },
    comparisons: [
      {
        name: "Justin Fields",
        year: 2020,
        similarity: 0.949,
        nfl_success_score: 42.1,
        stats: {
          rank: 5,
          completions: 158,
          attempts: 226,
          yards: 2098,
          touchdowns: 22,
          interceptions: 6,
          big_time_throws: 19,
          turnover_worthy_plays: 7,
          grades_offense: 93.5,
          grades_pass: 92.0,
          first_downs: 115
        }
      }
    ]
  }];

  const handleSort = (field: SortField) => {
    setSortConfig(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortedProspects = [...prospects].sort((a, b) => {
    const direction = sortConfig.direction === 'asc' ? 1 : -1;
    
    switch (sortConfig.field) {
      case 'name':
        return a.name.localeCompare(b.name) * direction;
      case 'school':
        return a.school.localeCompare(b.school) * direction;
      case 'rank':
        return (a.stats.rank - b.stats.rank) * direction;
      case 'completions':
        return (a.stats.completions - b.stats.completions) * direction;
      case 'yards':
        return (a.stats.yards - b.stats.yards) * direction;
      case 'touchdowns':
        return (a.stats.touchdowns - b.stats.touchdowns) * direction;
      case 'grades_offense':
        return (a.stats.grades_offense - b.stats.grades_offense) * direction;
      default:
        return 0;
    }
  });

  const getSortIcon = (field: SortField) => {
    if (sortConfig.field !== field) return '↕️';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="space-y-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-800">
          <tr>
            <th 
              onClick={() => handleSort('name')}
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer hover:bg-gray-700"
            >
              Name {getSortIcon('name')}
            </th>
            <th 
              onClick={() => handleSort('school')}
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer hover:bg-gray-700"
            >
              School {getSortIcon('school')}
            </th>
            <th 
              onClick={() => handleSort('rank')}
              className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider cursor-pointer hover:bg-gray-700"
            >
              Rank {getSortIcon('rank')}
            </th>
            <th 
              onClick={() => handleSort('completions')}
              className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider cursor-pointer hover:bg-gray-700"
            >
              Comp/Att {getSortIcon('completions')}
            </th>
            <th 
              onClick={() => handleSort('yards')}
              className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider cursor-pointer hover:bg-gray-700"
            >
              Yards {getSortIcon('yards')}
            </th>
            <th 
              onClick={() => handleSort('touchdowns')}
              className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider cursor-pointer hover:bg-gray-700"
            >
              TD/INT {getSortIcon('touchdowns')}
            </th>
            <th 
              onClick={() => handleSort('grades_offense')}
              className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider cursor-pointer hover:bg-gray-700"
            >
              Grade {getSortIcon('grades_offense')}
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
                  <div className="text-sm font-medium text-gray-900">
                    {prospect.stats.touchdowns}/{prospect.stats.interceptions}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`px-2 py-1 rounded-full text-sm ${getGradeColor(prospect.stats.grades_offense)}`}>
                    {prospect.stats.grades_offense.toFixed(1)}
                  </span>
                </td>
              </tr>
              {expandedRow === prospect.name && (
                <tr>
                  <td colSpan={7} className="px-6 py-4 bg-white border-t border-gray-100">
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-gray-900">Historical Comparisons</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-900">Player (Year)</th>
                              <th className="px-4 py-2 text-center text-xs font-medium text-gray-900">Similarity</th>
                              <th className="px-4 py-2 text-center text-xs font-medium text-gray-900">NFL Score</th>
                              <th className="px-4 py-2 text-center text-xs font-medium text-gray-900">Comp/Att</th>
                              <th className="px-4 py-2 text-center text-xs font-medium text-gray-900">Yards</th>
                              <th className="px-4 py-2 text-center text-xs font-medium text-gray-900">TD/INT</th>
                              <th className="px-4 py-2 text-center text-xs font-medium text-gray-900">Grade</th>
                            </tr>
                          </thead>
                          <tbody>
                            {prospect.comparisons.map((comp) => (
                              <tr key={`${comp.name}-${comp.year}`} className="hover:bg-gray-100">
                                <td className="px-4 py-2 whitespace-nowrap font-medium text-gray-900">
                                  {comp.name} ({comp.year})
                                </td>
                                <td className="px-4 py-2 text-center font-medium text-gray-900">
                                  {(comp.similarity * 100).toFixed(1)}%
                                </td>
                                <td className="px-4 py-2 text-center font-medium text-gray-900">
                                  {comp.nfl_success_score ? comp.nfl_success_score.toFixed(1) : 'N/A'}
                                </td>
                                <td className="px-4 py-2 text-center font-medium text-gray-900">
                                  {comp.stats.completions}/{comp.stats.attempts}
                                </td>
                                <td className="px-4 py-2 text-center font-medium text-gray-900">
                                  {comp.stats.yards}
                                </td>
                                <td className="px-4 py-2 text-center font-medium text-gray-900">
                                  {comp.stats.touchdowns}/{comp.stats.interceptions}
                                </td>
                                <td className="px-4 py-2 text-center">
                                  <span className={`px-2 py-1 rounded-full text-sm ${getGradeColor(comp.stats.grades_offense)}`}>
                                    {comp.stats.grades_offense.toFixed(1)}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
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