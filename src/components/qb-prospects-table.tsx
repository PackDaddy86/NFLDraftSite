'use client';

import React, { useState } from 'react';

const QBProspectsTable = ({ prospects }) => {
  const [expandedRow, setExpandedRow] = useState(null);
  
  return (
    <div className="space-y-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Big Board</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Comp/Att</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Yards</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">PFF Off</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">PFF Pass</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {prospects.map((prospect) => (
            <React.Fragment key={prospect.name}>
              <tr 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => setExpandedRow(expandedRow === prospect.name ? null : prospect.name)}
              >
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                  {prospect.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {prospect.school}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-gray-700">
                  #{prospect.stats.rank}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-gray-700">
                  {prospect.stats.completions}/{prospect.stats.attempts}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-gray-700">
                  {prospect.stats.yards}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-gray-700">
                  {prospect.stats.grades_offense.toFixed(1)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-gray-700">
                  {prospect.stats.grades_pass.toFixed(1)}
                </td>
              </tr>
              {expandedRow === prospect.name && (
                <tr>
                  <td colSpan={7} className="px-6 py-4 bg-gray-50">
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900 text-lg">Historical Comparisons</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Player (Year)</th>
                              <th className="px-4 py-2 text-center text-xs font-medium text-gray-600">Similarity</th>
                              <th className="px-4 py-2 text-center text-xs font-medium text-gray-600">NFL Score</th>
                              <th className="px-4 py-2 text-center text-xs font-medium text-gray-600">Comp/Att</th>
                              <th className="px-4 py-2 text-center text-xs font-medium text-gray-600">Yards</th>
                              <th className="px-4 py-2 text-center text-xs font-medium text-gray-600">PFF Off</th>
                              <th className="px-4 py-2 text-center text-xs font-medium text-gray-600">PFF Pass</th>
                            </tr>
                          </thead>
                          <tbody>
                            {prospect.comparisons.map((comp) => (
                              <tr key={`${comp.name}-${comp.year}`} className="hover:bg-gray-100">
                                <td className="px-4 py-2 whitespace-nowrap text-gray-700 font-medium">
                                  {comp.name} ({comp.year})
                                </td>
                                <td className="px-4 py-2 text-center text-gray-700">
                                  {(comp.similarity * 100).toFixed(1)}%
                                </td>
                                <td className="px-4 py-2 text-center text-gray-700">
                                  {comp.nfl_success_score ? comp.nfl_success_score.toFixed(1) : 'N/A'}
                                </td>
                                <td className="px-4 py-2 text-center text-gray-700">
                                  {comp.stats.completions}/{comp.stats.attempts}
                                </td>
                                <td className="px-4 py-2 text-center text-gray-700">
                                  {comp.stats.yards}
                                </td>
                                <td className="px-4 py-2 text-center text-gray-700">
                                  {comp.stats.grades_offense.toFixed(1)}
                                </td>
                                <td className="px-4 py-2 text-center text-gray-700">
                                  {comp.stats.grades_pass.toFixed(1)}
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