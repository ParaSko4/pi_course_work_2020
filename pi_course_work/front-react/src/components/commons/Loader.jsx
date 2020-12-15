import React from "react";
import styles from "../../AppComponent.module.css";
import {Spin} from "antd";

export const Loader = () => {
    return <div className={styles.parentLoaderDiv}>
        <Spin size="large" />
    </div>
}