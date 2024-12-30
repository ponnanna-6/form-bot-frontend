import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getFormById } from "../../services/form"
import styles from "./formSetup.module.css"
import { FiMessageSquare } from "react-icons/fi";
import { CiImageOn } from "react-icons/ci";
import { BiText } from "react-icons/bi";
import { GoHash } from "react-icons/go";
import { MdAlternateEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { TiInputChecked } from "react-icons/ti";

const FormSetup = () => {
    // theme toggler
    const [isDark, setIsDark] = useState('light');
    const [formData, setFormData] = useState({})
    const { formId } = useParams();

    // flow and response toggle
    const [flowSelected, setFlowSelected] = useState(true);


    //Bubble options
    const bubbleOptions = [
        { id: 1, name: "Text", image: <FiMessageSquare /> },
        { id: 2, name: "Image", image: <CiImageOn /> },
    ];

    const inputOptions = [
        { id: 1, name: "Text", image: <BiText /> },
        { id: 2, name: "Number", image: <GoHash /> },
        { id: 3, name: "Email", image: <MdAlternateEmail /> },
        { id: 4, name: "Phone", image: <FiPhone /> },
        { id: 5, name: "Date", image: <MdOutlineDateRange /> },
        { id: 6, name: "Rating", image: <FaRegStar /> },
        { id: 7, name: "Button", image: <TiInputChecked /> },
    ];

    useEffect(() => {
        const getFormData = async () => {
            const res = await getFormById(formId)
            console.log(res)
            if (res.status == 200) {
                setFormData(res.data.form)
            }
        }
        getFormData();
    }, [])

    const toggleTheme = () => {
        setIsDark(!isDark);
        onToggle && onToggle(!isDark);
    }
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

    const OptionItem = (option, from) => {
        return (
            <div className={styles.bubble} key={option.id}>
                <div className={styles.iconWrapper} style={{ color: from === "bubble" ? "#7EA6FF" : "#FFA54C" }}>{option.image}</div>
                <p>{option.name}</p>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            {/* Header Section */}
            <div className={styles.header}>
                <div className={styles.headerDiv}>
                    <input type="text" className={styles.formNameInput} placeholder="Enter Form Name" value={formData?.name} />
                </div>
                {/* Flow/response toggle */}
                <div className={styles.headerDiv} style={{ justifyContent: "center" }}>
                    <button
                        className={`${styles.flowButton} ${flowSelected ? styles.selectedButton : ''}`}
                        onClick={() => { setFlowSelected(true) }}
                    >
                        Flow
                    </button>
                    <button
                        className={`${styles.responseButton} ${!flowSelected ? styles.selectedButton : ''}`}
                        onClick={() => { setFlowSelected(false) }}
                    >
                        Response
                    </button>
                </div>
                {/* theme toggler */}
                <div className={styles.headerDiv}>
                    <ToggleContainer />
                    {/* button */}
                    <button
                        className={styles.shareButton}
                        onClick={() => { }}
                    >
                        Share
                    </button>
                    <button
                        className={styles.saveButton}
                        onClick={() => { }}
                    >
                        Save
                    </button>
                    <button
                        className={styles.closeButton}
                        onClick={() => { }}
                    >
                        X
                    </button>
                </div>
            </div>
            {/* Main Section */}
            <div className={styles.main}>
                <div className={styles.formOptionsContainer}>
                    <h3>Bubbles</h3>
                    <div className={styles.bubbleContainer}>
                        {bubbleOptions.map((item) => OptionItem(item, "bubble"))}
                    </div>
                    <h3>Inputs</h3>
                    <div className={styles.inputsContainer}>
                        {inputOptions.map((item) => OptionItem(item, "input"))}
                    </div>
                </div>
                <div className={styles.formContainer}>

                </div>
            </div>
        </div>
    )
}

export default FormSetup