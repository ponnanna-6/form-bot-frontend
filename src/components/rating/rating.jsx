import React, { useState } from "react";
import styles from "./rating.module.css";

const RatingComponent = ({ onRate }) => {
    const [rating, setRating] = useState(0);


    const handleClick = (value) => {
        setRating(value);
        if (onRate) onRate(value); // Callback for external use
    };

    return (
        <div className={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((number) => (
                <div
                    key={number}
                    className={`${styles.circle} ${rating == number ? styles.active : ""}`}
                    onClick={() => handleClick(number)}
                >
                    {number}
                </div>
            ))}
        </div>
    );
};

export default RatingComponent;
