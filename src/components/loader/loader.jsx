// Loader.js
import React from 'react';
import { ClipLoader, PacmanLoader } from 'react-spinners';
import styles from './loader.module.css';

const Loader = ({ loading }) => {
    if (!loading) return null;

    return (
        <div className={styles.loaderOverlay}>
            <div className={styles.loaderContainer}>
                <PacmanLoader color={"#FC8A06"} size={30} />
            </div>
        </div>
    );
};

export default Loader;