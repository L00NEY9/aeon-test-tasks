import React, {useCallback} from 'react';
import {TaskItemProps} from "./taskItem.interface";
import styles from "./taskItem.styles.module.scss";
import {IconChevronDown} from "@tabler/icons";
import {useAppDispatch} from "../../../../hooks/dispatch.hook";
import {nestingLevelIcons} from "../../../../constants/nesting";
import {toggleDisclosuresTask} from "../../../../store/slices/project.slice";

const TaskItem: React.FC<TaskItemProps> = ({ chart}) => {
  const dispatch = useAppDispatch()

  const onTaskClickedHandler = useCallback(() => {
    dispatch(toggleDisclosuresTask(chart.id))
  }, [chart])

  return (
    <div
      style={{
        paddingLeft: (chart.nesting * 20) + "px"
      }}
      onClick={onTaskClickedHandler}
      className={styles.container}
    >
      {
        chart.childrenAmount > 0
        &&
        <IconChevronDown
            style={{
              transform: `rotateZ(${chart.disclosures ? "270" : "360"}deg)`
            }}
            className={styles.chevronIcon}
            size={15}
        />
      }
      {
        nestingLevelIcons[chart.nesting - 1] || nestingLevelIcons.at(-1)!
      }
      <i className={styles.subLength}>
        {
          chart.childrenAmount
        }
      </i>
      <span className={styles.title}>
          {
            chart.title
          }
        </span>
    </div>
  );
};

export default TaskItem;
