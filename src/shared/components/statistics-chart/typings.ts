export type WeeklyActivityItemType = {
  date: string;
  lessonsCompleted: number;
  testsPassed: number;
};

export type StatisticsChartPropsType = {
  weeklyActivity: WeeklyActivityItemType[];
};
