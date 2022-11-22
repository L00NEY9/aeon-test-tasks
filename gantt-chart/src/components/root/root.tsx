import React, {useEffect} from 'react';
import {ProjectAPI} from "../../API/project";
import Header from "../header/header";
import GanttChart from "../ganttChart/ganttChart";
import {useAppDispatch} from "../../hooks/dispatch.hook";
import {setCurrentProject} from "../../store/slices/project.slice";
import {useAppSelector} from "../../hooks/selector.hook";

const Root = () => {
  const { isLoading, error, data: project } = ProjectAPI.useGetProjectQuery(undefined)
  const currentProject = useAppSelector(state => state.project.currentProject)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (project) {
      dispatch(setCurrentProject(project))
    }
  }, [project])

  if (isLoading) return <span>Загрузка...</span>
  if (error) return <span>Произошла ошибка! Попробуйте снова!</span>
  if(!currentProject) return <></>

  return (
    <>
      <Header/>
      <GanttChart/>
    </>
  );
};

export default Root;
