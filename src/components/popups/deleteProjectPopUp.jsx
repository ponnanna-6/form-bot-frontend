import { useState } from 'react';
import styles from './popup.module.css'; // Replace with your actual CSS file
import { errorToast } from '../helper/toast';

const DeleteFolderPopUp = ({ onClose, onConfirm, folder}) => {

    return (
        <div className={styles.overlay}>
            <div className={styles.deletePopup}>
                <h2>Are you sure you want to delete this {folder ? 'folder' : 'form'}?</h2>
                <div className={styles.buttonContainer}>
                    <button onClick={onConfirm} className={styles.doneButton}>Confirm</button>
                    <button onClick={onClose} className={styles.cancelButton}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteFolderPopUp;
