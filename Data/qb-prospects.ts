// types.ts
export interface QBStats {
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
  
  export interface HistoricalComparison {
    name: string;
    year: number;
    similarity: number;
    nfl_success_score: number | null;
    stats: QBStats;
  }
  
  export interface QBProspect {
    name: string;
    school: string;
    stats: QBStats;
    comparisons: HistoricalComparison[];
  }
  
  // Sample data structure
  export const sampleProspect: QBProspect = {
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
      // Add other comparisons similarly
    ]
  };