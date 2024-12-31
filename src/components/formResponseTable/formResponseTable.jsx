import React from "react";
import styles from "./formResponseTable.module.css";

const FormResponseTable = ({ data }) => {
    const responses = data?.formResponse || [];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        }).format(date);
    };

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Submitted at</th>
                        {data?.formData.map((field, index) => (
                            <th key={index}>{field.option.name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {responses.map((response, index) => (
                        <tr key={index}>
                            <td style={{ minWidth: "30px" }}>{index + 1}</td>
                            <td>{formatDate(response?.submittedAt) || ""}</td>
                            {Object.values(response).map((field, index) => (
                                index != Object.keys(response).length - 1
                                && index < data?.formData.length
                                && <td key={index}>{field.option?.value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FormResponseTable;