export interface DefaultProjectChart {
  id: number;
  title: string;
  period_start: string;
  period_end: string;
  sub?: DefaultProjectChart[];
}

export interface DefaultProject {
  chart: DefaultProjectChart;
  period: string;
  project: string;
}


// reformatted for optimization:

export interface ProjectChart {
  id: number;
  title: string;
  periodDates: string[];
  nesting: number;
  childrenAmount: number;
  disclosures: boolean;
}

export interface Project {
  chart: ProjectChart[];
  periodStart: string;
  periodEnd: string;
  name: string;
}
