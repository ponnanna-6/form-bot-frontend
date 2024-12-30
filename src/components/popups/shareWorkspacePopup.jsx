import { useState } from 'react';
import styles from './popup.module.css'; // Replace with your actual CSS file
import { alertToast, errorToast } from '../../helper/toast';
import { validateEmail } from '../../helper/utils';
import { shareWorkspace } from '../../services/workspace';

const SharePopup = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [accessType, setAccessType] = useState('view');

    const sendInvite = async () => {
        if (validateEmail(email.trim())) {
            // Send invite to the user
            const res = await shareWorkspace({ email: email.trim(), accessType: accessType });
            if (res.status == 200) {
                alertToast(res.message)
                onClose();
            } else {
                errorToast(res.message)
            }
        } else {
            errorToast("Enter a valid Email");
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.sharePopup}>
                <h1 onClick={onClose}>X</h1>
                <div className={styles.rowContainer}>
                    <h2>Invite by Email</h2>
                    <select
                        value={accessType}
                        onChange={(e) => setAccessType(e.target.value)}
                        className={styles.select}
                    >
                        <option value="view">View</option>
                        <option value="edit">Edit</option>
                    </select>
                </div>
                <input
                    type="text"
                    placeholder={"Enter email id"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                />
                <button onClick={() => sendInvite()} className={styles.shareButton}>Send Invite</button>

                <h2 style={{ marginBottom: '20px' }}>Invite by link</h2>
                <button onClick={() => { alertToast("Copied to clipboard") }} className={styles.shareButton}>Copy link</button>
            </div>
        </div>
    );
};

export default SharePopup;
