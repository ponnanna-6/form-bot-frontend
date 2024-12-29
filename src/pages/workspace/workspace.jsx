import React, { useEffect, useRef, useState } from "react";
import styles from "./workspace.module.css";
import logo from '../../assets/logo.png';
import { useNavigate } from "react-router-dom";
import { getAllWorkspaces } from '../../services/workspace'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { addFolder, deleteFolder, getAllFoldersInWorkspace } from "../../services/folders";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiOutlineFolderAdd } from "react-icons/hi";
import CreateFolderPopup from "../../components/popups/createProjectPopup";
import { toast } from "react-toastify";
import { alertToast } from "../../components/helper/toast";
import DeleteFolderPopUp from "../../components/popups/deleteProjectPopUp";
import SharePopup from "../../components/popups/shareWorkspacePopup";

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
    const [refreshData, setRefreshData] = useState(false);
    const [showDeleteFolderPopup, setShowDeleteFolderPopup] = useState(false);

    //form states
    const [forms, setForms] = useState([{ name: "first" }]);
    const [showCreateFormPopup, setShowCreateFormPopup] = useState(false);
    const [showDeleteFormPopup, setShowDeleteFormPopup] = useState(false);
    const [selectForm, setSelectForm] = useState(null);

    //share states
    const [showSharePopup, setShowSharePopup] = useState(false);
    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

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
        console.log("refreshing data")
        const getFolderData = async () => {
            const res = await getAllFoldersInWorkspace(selectedWorkspace?._id)
            if (res.status == 200) {
                setFolders(res.data.folders)
            }
        }
        if (selectedWorkspace) {
            getFolderData()
        }
    }, [selectedWorkspace, refreshData]);

    const dropdownRef = useRef(null);

    const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };
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
                    <div ref={dropdownRef} className={styles.dropdownContent}>
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

    const deleteFolderOnClick = async () => {
        setShowDeleteFolderPopup(false)
        const res = await deleteFolder({ folderId: selectedFolder?._id })
        if (res.status == 200) {
            alertToast(res.message)
            setRefreshData(!refreshData)
        } else {
            alertToast(res.message)
        }
    }

    const closePopup = () => {
        setShowCreateFolderPopup(false)
        setShowDeleteFolderPopup(false)
        setShowCreateFormPopup(false)
        setShowDeleteFormPopup(false)
    }

    const folderItem = (folder) => {
        function selectFolder() {
            setSelectedFolder(folder)
        }

        return (
            <div
                className={styles.folderItem}
                onClick={selectFolder}
                style={folder?._id === selectedFolder?._id ? { backgroundColor: '#D9D9D9', color: '#000' } : {}}
            >
                <p>{folder?.name}</p>
                <RiDeleteBin6Line
                    className={styles.deleteIcon}
                    onClick={() => { setShowDeleteFolderPopup(true) }}
                />
            </div>
        )
    }

    const formItem = (form) => {
        return (
            <div
                className={styles.formItem}
            >                
                <RiDeleteBin6Line
                    className={styles.deleteIconForm}
                    onClick={() => { setShowDeleteFormPopup(true) }}
                />
                <p>{form?.name}</p>

            </div>
        )
    }

    const onCreateFolder = async (folderName) => {
        setShowCreateFolderPopup(true)
        const res = await addFolder({ workspaceId: selectedWorkspace?._id, name: folderName })
        if (res.status == 200) {
            alertToast(res.message)
            setRefreshData(!refreshData)
        }
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
                    <button
                        className={styles.shareButton}
                        onClick={() => { setShowSharePopup(true) }}
                    >
                        Share
                    </button>
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
                <div className={styles.formContainer}>
                    <div
                        className={styles.formItem}
                        onClick={() => { setShowCreateFormPopup(true) }}
                        style={{ backgroundColor: '#1A5FFF', border: 'none' }}
                    >
                        <p style={{ fontSize: '32px' }}>+</p>
                        <p>Create a typebot</p>
                    </div>
                    {forms && forms.map((form, index) => formItem(form))}
                </div>
            </div>
            {(showCreateFolderPopup || showCreateFormPopup) &&
                <CreateFolderPopup
                    onClose={closePopup}
                    onCreate={onCreateFolder}
                    folder={showCreateFolderPopup}
                />}
            {(showDeleteFolderPopup || showDeleteFormPopup) &&
                <DeleteFolderPopUp
                    onClose={closePopup}
                    onConfirm={deleteFolderOnClick}
                    folder={showDeleteFolderPopup}
                />}
            {showSharePopup &&
                <SharePopup
                    onClose={() => { setShowSharePopup(false) }}
                />}
        </div>
    );
};

export default Workspace;
