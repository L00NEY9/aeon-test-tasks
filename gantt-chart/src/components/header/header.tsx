import React, {useCallback} from 'react';
import styles from "./header.styles.module.scss"
import {useAppSelector} from "../../hooks/selector.hook";
import {IconArrowBarToDown} from "@tabler/icons";

const Header = () => {
  const currentProject = useAppSelector(state => state.project.currentProject)!

  const onDownloadButtonClickedHandler = useCallback(() => {
    const fileContent = JSON.stringify(currentProject, null, 4)
    const objectURL = URL.createObjectURL(new Blob([fileContent]))
    const anchor = document.createElement("a")
    anchor.download = `${currentProject.name}.json`
    anchor.href = objectURL
    anchor.click()
    URL.revokeObjectURL(objectURL)
  }, [currentProject])

  return (
    <header className={styles.container}>
      <h2>
        {
          currentProject.name + " / " + currentProject.periodStart + " - " + currentProject.periodEnd
        }
      </h2>
      <button onClick={onDownloadButtonClickedHandler}>
        <IconArrowBarToDown/>
        <span>Export</span>
      </button>
    </header>
  );
};

export default Header;
