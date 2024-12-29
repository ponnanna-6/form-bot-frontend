import React, { useEffect, useState } from "react";
import styles from "./workspace.module.css";
import logo from '../../assets/logo.png';
import { useNavigate } from "react-router-dom";
import { getAllWorkspaces } from '../../services/workspace'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Workspace = () => {
    const navigate = useNavigate()
    const [isDark, setIsDark] = useState('light');
    const [workspaces, setWorkspaces] = useState([]);
    const [selectedWorkspace, setSelectedWorkspace] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const getData = async () => {
            const res = await getAllWorkspaces()
            if (res.status == 200) {
                setWorkspaces(res.data.workspaces)
                setSelectedWorkspace(res.data.workspaces[0])
            }
        }
        getData()
    }, []);

    const toggleTheme = () => {
        setIsDark(!isDark);
        onToggle && onToggle(!isDark);
    }

    function onWorkspaceClick(workspace) {
        setSelectedWorkspace(workspace);
        setShowDropdown(false);
    }

    const WorkspaceDropDown = () => {
        return (
            <div className={styles.dropdown}>
                <div className={styles.dropdownButton} onClick={() => { setShowDropdown(!showDropdown) }}>
                    {selectedWorkspace?.name}{showDropdown ? <IoIosArrowUp className={styles.dropdownIcon} /> : <IoIosArrowDown className={styles.dropdownIcon} />}
                </div>
                {showDropdown && (
                    <div className={styles.dropdownContent}>
                        {workspaces && workspaces.map((workspace) => (
                            <div key={workspace.id} onClick={() => { onWorkspaceClick(workspace) }}>{workspace.name}</div>
                        ))}
                        <div onClick={() => { navigate('/settings') }}>Settings</div>
                        <div onClick={() => { navigate('/login') }} style={{ color: '#FFA54C', border: 'none'}}>Logout</div>
                    </div>
                )}

            </div>
        );
    };

    const ToggleContainer = () => {
        return (
            <div className={styles.toggleContainer}>
                <span>Light</span>
                <div
                    className={`${styles.toggleSwitch} ${isDark ? styles.dark : ""}`}
                    onClick={toggleTheme}
                >
                    <div className={styles.toggleCircle}></div>
                </div>
                <span>Dark</span>
            </div>
        )
    }
    return (
        <div className={styles.container}>
            {/* Header Section */}
            <div className={styles.header}>
                <div className={styles.headerDiv}></div>
                {/* make a drop down */}
                <div className={styles.headerDiv}>
                <WorkspaceDropDown />
                </div>
                {/* theme toggler */}
                <div className={styles.headerDiv}>
                    <ToggleContainer />
                    {/* Share button */}
                    <button className={styles.shareButton} onClick={() => { navigate('/login') }}>Share</button>
                </div>
            </div>
            <div> Workspace</div>
        </div>
    );
};

export default Workspace;
