import {DefaultProject, Project} from "../../models/project.model";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {reformatProject} from "../../utils/project";

interface ProjectState {
  currentProject?: Project;
}

const initialState: ProjectState = {}

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setCurrentProject(state, action: PayloadAction<DefaultProject>) {
      state.currentProject = reformatProject(action.payload)
    },
    toggleDisclosuresTask(state, action: PayloadAction<number>) {
      if(!state.currentProject) return
      const currentChartIndex = state.currentProject.chart.findIndex(chart => chart.id === action.payload)
      if(currentChartIndex === -1) return
      state.currentProject.chart[currentChartIndex].disclosures = !state.currentProject.chart[currentChartIndex].disclosures
      if(!state.currentProject.chart[currentChartIndex].disclosures) {
        for (const subsequentChart of state.currentProject.chart.slice(currentChartIndex)) {
          subsequentChart.disclosures = false
        }
      }
    }
  }
})

export const {
  setCurrentProject,
  toggleDisclosuresTask
} = projectSlice.actions

export default projectSlice.reducer
