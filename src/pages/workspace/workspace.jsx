import React, { useEffect, useState } from "react";
import styles from "./workspace.module.css";
import logo from '../../assets/logo.png';
import { useNavigate } from "react-router-dom";
import { getAllWorkspaces } from '../../services/workspace'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { getAllFoldersInWorkspace } from "../../services/folders";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiOutlineFolderAdd } from "react-icons/hi";

const Workspace = () => {
    const navigate = useNavigate()
    const [isDark, setIsDark] = useState('light');
    const [workspaces, setWorkspaces] = useState([]);
    const [selectedWorkspace, setSelectedWorkspace] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    //folder states
    const [folders, setFolders] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [showCreateFolderPopup, setShowCreateFolderPopup] = useState(false);

    //form states
    const [forms, setForms] = useState([]);

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

    useEffect(() => {
        const getFolderData = async () => {
            const res = await getAllFoldersInWorkspace(selectedWorkspace?._id)
            if (res.status == 200) {
                setFolders(res.data.folders)
            }
        }
        if (selectedWorkspace) {
            getFolderData()
        }
    }, [selectedWorkspace]);



    const toggleTheme = () => {
        setIsDark(!isDark);
        onToggle && onToggle(!isDark);
    }

    const logOut = () => {
        localStorage.removeItem('token')
        navigate('/login')
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
                        {workspaces && workspaces.map((workspace, index) => (
                            <div key={`workspace-${index}`} onClick={() => { onWorkspaceClick(workspace) }}>{workspace.name}</div>
                        ))}
                        <div onClick={() => { navigate('/settings') }}>Settings</div>
                        <div onClick={() => { logOut() }} style={{ color: '#FFA54C', border: 'none' }}>Log Out</div>
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

    const folderItem = (folder) => {
        function selectFolder() {
            console.log(folder)
            setSelectedFolder(folder)
        }
        return (
            <div
                className={styles.folderItem}
                onClick={selectFolder}
                style={folder?._id === selectedFolder?._id ? { backgroundColor: '#D9D9D9', color: '#000' } : {}}
            >
                <p>{folder?.name}</p>
                <RiDeleteBin6Line className={styles.deleteIcon} />
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
            <div className={styles.main}>
                <div className={styles.folderContainer}>
                    <div
                        className={styles.folderItem}
                        onClick={() => { setShowCreateFolderPopup(true) }}

                    >
                        <HiOutlineFolderAdd className={styles.folderIcon} />
                        <p>Create a Folder</p>
                    </div>
                    {folders && folders.map((folder, index) => folderItem(folder))}
                </div>
                <div className={styles.formContainer}></div>
            </div>
        </div>
    );
};

export default Workspace;
