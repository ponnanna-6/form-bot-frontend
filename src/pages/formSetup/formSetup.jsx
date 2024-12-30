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
import { HiFlag } from "react-icons/hi";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { PieChart } from 'react-minimal-pie-chart';

const FormSetup = () => {
    // theme toggler
    const [isDark, setIsDark] = useState('light');
    const [formData, setFormData] = useState({})
    const { formId } = useParams();

    // flow and response toggle
    const [flowSelected, setFlowSelected] = useState(true);

    const [formArray, setFormArray] = useState([]);

    console.log(formArray)
    //Bubble options
    const bubbleOptions = [
        { id: 1, name: "Text", image: <FiMessageSquare />, hint: "Click to Enter Text" },
        { id: 2, name: "Image", image: <CiImageOn />, hint: "Click to add a link" },
    ];

    const inputOptions = [
        { id: 1, name: "Text", image: <BiText />, type: "text", hint: "User will input a text on this form" },
        { id: 2, name: "Number", image: <GoHash />, type: "number", hint: "User will input a number on this form" },
        { id: 3, name: "Email", image: <MdAlternateEmail />, type: "email", hint: "User will input an email on this form" },
        { id: 4, name: "Phone", image: <FiPhone />, type: "tel", hint: "User will enter a phone number on this form" },
        { id: 5, name: "Date", image: <MdOutlineDateRange />, type: "date", hint: "User will select a date" },
        { id: 6, name: "Rating", image: <FaRegStar />, type: "range", hint: "User will tap to rate out of 5" },
        { id: 7, name: "Button", image: <TiInputChecked />, type: "button", hint: "Submit" },
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


    function onBubbleSelect(option, from) {
        setFormArray([
            ...formArray,
            { option: option, from: from }
        ]);
    }

    function deleteInput(index) {
        formArray.splice(index, 1);
        setFormArray([...formArray]);
    }


    const OptionItem = (option, from) => {
        return (
            <div className={styles.bubble} key={option.id} onClick={() => onBubbleSelect(option, from)}>
                <div className={styles.iconWrapper} style={{ color: from === "bubble" ? "#7EA6FF" : "#FFA54C" }}>{option.image}</div>
                <p>{option.name}</p>
            </div>
        )
    }

    const InputItem = (option, from, index) => {
        return (
            <div className={styles.inputItem} key={option.id}>
                <div className={styles.deleteIconWrapper}>
                    <RiDeleteBin6Line
                        className={styles.deleteIcon}
                        onClick={() => { deleteInput(index) }}
                    />
                </div>
                <h4>{option.name}</h4>
                {from == "bubble" && <input type="text" placeholder={option.hint} />}
                {from == "input" && <p>Hint: {option.hint}</p>}
            </div>
        )
    }

    const StatBox = (label, value) => {
        return (
            <div className={styles.statBox}>
                <p>{label}</p>
                <p>{value}</p>
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
            {flowSelected ?
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
                        <div className={styles.startItem}>
                            <div className={styles.iconWrapper}><HiFlag /></div>
                            <p>Start</p>
                        </div>
                        {formArray &&
                            formArray.map((item, index) =>
                                <div key={`item-${index}`}>{InputItem(item.option, item.from, index)}</div>
                            )}
                    </div>
                </div>
                :
                <div className={styles.responseContainer}>
                    <div className={styles.responseStats}>
                        {StatBox("Views", "0")}
                        {StatBox("Starts", "0")}
                    </div>
                    <div className={styles.responseTable}>
                    </div>
                    <div className={styles.responseStats}>
                        <PieChart
                            data={[
                                { title: 'Completed', value: 10, color: '#3B82F6' },
                                { title: '', value: 15, color: '#909090' },
                            ]}
                            lineWidth={15}
                            className={styles.pieChart}
                            label={({ dataEntry }) => `${dataEntry.title}: ${dataEntry.value}%`}
                            labelStyle={{
                                fontSize: '5px',
                                fontFamily: 'sans-serif',
                            }}
                        />
                        {StatBox("Completion rate", "0")}
                    </div>
                </div>
            }
        </div>
    )
}

export default FormSetup