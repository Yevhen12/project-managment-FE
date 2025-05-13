import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./LoadingSpinner.module.scss";

const LoadingSpinner = () => {
  //
  return (
    <div className={styles.spinnerWrapper}>
      <CircularProgress />
    </div>
  );
};

export default LoadingSpinner;
