import React from 'react';
import styles from "./ganttChart.styles.module.scss"
import TaskTree from "./taskTree/taskTree";
import TimeLine from "./timeLine/timeLine";

const GanttChart = () => {
  return (
    <div className={styles.container}>
        <TaskTree/>
        <TimeLine/>
    </div>
  );
};

export default GanttChart;
