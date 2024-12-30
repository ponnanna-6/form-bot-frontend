import { useState } from 'react';
import styles from './popup.module.css'; // Replace with your actual CSS file
import { errorToast } from '../../helper/toast';

const CreateFolderPopup = ({ onClose, onCreate, folder}) => {
    const [folderName, setFolderName] = useState('');

    const handleCreate = () => {
        if (folderName.trim()) {
            onCreate(folderName);
            onClose();
        } else {
            errorToast("Folder name cannot be empty");
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <h2>Create New {folder ? 'Folder' : 'Form'}</h2>
                <input 
                    type="text" 
                    placeholder= {folder ? "Enter folder name" : "Enter form name"}
                    value={folderName} 
                    onChange={(e) => setFolderName(e.target.value)} 
                    className={styles.input}
                />
                <div className={styles.buttonContainer}>
                    <button onClick={handleCreate} className={styles.doneButton}>Done</button>
                    <button onClick={onClose} className={styles.cancelButton}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default CreateFolderPopup;
