import React, {useCallback, useEffect, useMemo, useRef, WheelEventHandler} from 'react';
import styles from "./timeLine.styles.module.scss"
import {useAppSelector} from "../../../hooks/selector.hook";
import {formatProjectPeriodToWeeks} from "../../../utils/weeks";
import cn from "classnames"
import {nestingLevelColorsSchemes} from "../../../constants/nesting";

const TimeLine = () => {
  const currentProject = useAppSelector(state => state.project.currentProject)!
  const timelineRef = useRef<HTMLDivElement>(null)
  const fadeRef = useRef<HTMLDivElement>(null)
  const weeks = useMemo(() => formatProjectPeriodToWeeks(currentProject.periodStart, currentProject.periodEnd), [currentProject])

  const onMouseMoveHandler = useCallback((ev: MouseEvent) => {
    if (!timelineRef.current) return
    timelineRef.current.scrollLeft -= ev.movementX
    fadeRef.current!.style.right = -timelineRef.current.scrollLeft + "px"
    timelineRef.current.style.cursor = "grabbing"
  }, [])

  const onMouseUpHandler = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.style.cursor = "grab"
    }
    window.removeEventListener("mousemove", onMouseMoveHandler)
    window.removeEventListener("mouseup", onMouseUpHandler)
  }, [])

  const onTimeLineMouseDownHandler = useCallback(() => {
    window.addEventListener("mousemove", onMouseMoveHandler)
    window.addEventListener("mouseup", onMouseUpHandler)
  }, [])

  const onWheelHandler = useCallback<WheelEventHandler>((ev) => {
    if (!timelineRef.current) return
    timelineRef.current.scrollLeft += ev.deltaY
    fadeRef.current!.style.right = -timelineRef.current.scrollLeft + "px"
  }, [])

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (!fadeRef.current || !timelineRef.current) return
      fadeRef.current.style.right = "0px"
    })
  }, [])

  return (
    <div
      ref={timelineRef}
      onMouseDown={onTimeLineMouseDownHandler}
      onWheel={onWheelHandler}
      className={styles.container}>
      {
        weeks.map(week => (
          <div className={styles.point} key={week.title}>
            <span>
              {
                week.title
              }
            </span>
            <div className={styles.subPointsContainer}>
              {
                week.days.map((day, index) => {
                  return (
                    <div key={index} className={styles.subPoint}>
                      <span>
                        {
                          day.date
                        }
                      </span>
                      <div className={styles.plug}/>
                      {
                        currentProject.chart.map(task => {
                          const currentDayInTaskPeriod = task.periodDates.findIndex(date => date === day.fullDate)
                          const currentNestingLevelColorSchema = nestingLevelColorsSchemes[task.nesting - 1] || nestingLevelColorsSchemes.at(-1)!
                          if (currentDayInTaskPeriod !== -1) {
                            return (
                              <div key={task.id} className={styles.taskContainer}>
                                <div
                                  style={{
                                    background: currentNestingLevelColorSchema.backgroundColor,
                                    borderColor: currentNestingLevelColorSchema.borderColor
                                  }}
                                  className={cn(
                                    styles.taskBody,
                                    currentDayInTaskPeriod === 0 && styles.taskHead,
                                    currentDayInTaskPeriod === task.periodDates.length - 1 && styles.taskTail
                                  )}/>
                                {
                                  currentDayInTaskPeriod === task.periodDates.length - 1
                                  &&
                                    <span className={styles.taskName}>
                                    {
                                      task.title
                                    }
                                  </span>
                                }
                              </div>
                            )
                          }
                          return null
                        })
                      }
                    </div>
                  )
                })
              }
            </div>
          </div>
        ))
      }
      <div ref={fadeRef} className={styles.fade}/>
    </div>
  );
};

export default TimeLine;
