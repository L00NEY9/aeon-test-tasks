import {DefaultProject, DefaultProjectChart, Project, ProjectChart} from "../models/project.model";
import {getDatesFromChartPeriod} from "./dates";

function reformatProjectChart(defaultProjectChart: DefaultProjectChart, nesting = 1): ProjectChart[] {
  const result: ProjectChart[] =  [
    {
      id: defaultProjectChart.id,
      title: defaultProjectChart.title,
      childrenAmount: defaultProjectChart.sub ? defaultProjectChart.sub.length : 0,
      periodDates: getDatesFromChartPeriod(defaultProjectChart.period_start, defaultProjectChart.period_end),
      nesting,
      disclosures: true
    }
  ]

  if(defaultProjectChart.sub) {
    for (const chart of defaultProjectChart.sub) {
      result.push(...reformatProjectChart(chart, nesting + 1))
    }
  }

  return result
}

export function reformatProject(defaultProject: DefaultProject): Project {
  const periodParts = defaultProject.period.split("-")
  if(periodParts.length < 2) throw new Error("Invalid Project")
  return {
    chart: reformatProjectChart(defaultProject.chart),
    name: defaultProject.project,
    periodStart: periodParts.at(0)!,
    periodEnd: periodParts.at(1)!
  }
}
