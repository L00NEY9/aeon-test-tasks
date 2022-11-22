import React from 'react';
import styles from "./taskTree.styles.module.scss"
import TaskItem from "./taskItem/taskItem";
import {useAppSelector} from "../../../hooks/selector.hook";

const TaskTree = () => {
  const currentProject = useAppSelector(state => state.project.currentProject)!

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        Work Item
      </div>

      <div/> {/* plug */}

      {
        currentProject.chart.map((currentChart) => {
          const previousChartByNesting = currentProject.chart.find(chart => chart.nesting === currentChart.nesting - 1)
          if(currentChart.id !== 1 && (!previousChartByNesting || !previousChartByNesting.disclosures)) return <></>
          return <TaskItem chart={currentChart}/>
        })
      }
    </div>
  );
};

export default TaskTree;
