import React from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import styles from "./NavigationArrows.module.css";
import { useNavigate } from "react-router-dom";

function NavigationArrows() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate(1);
  };

  const handlePrev = () => {
    navigate(-1);
  };

  return (
    <div className={styles.navigationArrows}>
      <LeftOutlined className={styles.arrowIcon} onClick={handlePrev} />
      <RightOutlined className={styles.arrowIcon} onClick={handleNext} />
    </div>
  );
}

export default NavigationArrows;
