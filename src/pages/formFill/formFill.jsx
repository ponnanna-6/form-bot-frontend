import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getFormById, getFormByIdForPublic, updateFormResponse } from "../../services/form";
import styles from "./formFill.module.css"
import { AiOutlineSend } from "react-icons/ai";
import { alertToast, errorToast } from "../../helper/toast";
import { FaRegUserCircle } from "react-icons/fa";
import RatingComponent from "../../components/rating/rating";

const FormFill = () => {
    const { formId } = useParams();
    const [formArray, setFormArray] = useState([]);

    const [visibleItems, setVisibleItems] = useState([]);
    const [currentInput, setCurrentInput] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [rating, setRating] = useState(0);

    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        const getFormData = async () => {
            const res = await getFormByIdForPublic(formId)
            if (res.status == 200) {
                setFormArray(res.data.form.formData)
            } else {
                errorToast(res.data.message)
            }
        }
        getFormData();
    }, [])

    useEffect(() => {
        if (formArray.length && visibleItems.length == 0) {
            showNextItems();
        }
    }, [formArray]);

    const showNextItems = () => {
        let nextIndex = currentIndex;
        const newVisibleItems = [];

        while (nextIndex < formArray.length && formArray[nextIndex].from === "bubble") {
            newVisibleItems.push(formArray[nextIndex]);
            nextIndex++;
        }

        if (nextIndex < formArray.length && formArray[nextIndex].from === "input") {
            newVisibleItems.push(formArray[nextIndex]);
            nextIndex++;
        }

        setVisibleItems([...visibleItems, ...newVisibleItems]);
        setCurrentIndex(nextIndex);
    };

    const sendItem = () => {
        setVisibleItems((prevItems) => {
            const updatedItems = [...prevItems];
            if (updatedItems.length > 0) {
                updatedItems[updatedItems.length - 1].option.value = currentInput;
            }
            return updatedItems;
        });
        setCurrentInput("");
        showNextItems();
    }

    const SendButton = () => {
        return (
            <button onClick={() => sendItem()}>
                <AiOutlineSend fontSize={20} color={"#fff"} />
            </button>
        )
    }

    const onSubmitForm = async () => {
        const res = await updateFormResponse(formId, visibleItems);
        if (res.status == 200) {
            setDisabled(true);
            alertToast("Form submitted successfully");
        } else {
            errorToast(res.message)
        }
    }

    return (
        <div className={styles.container}>
            {visibleItems.map((item, index) => {
                return (
                    <div key={index} className={`${styles.chatItem} ${item.from === "input"
                        ? item.option.type === "button"
                            ? styles.centerAlign
                            : styles.rightAlign
                        : styles.leftAlign}`
                    }>
                        {item?.from === "bubble" && (
                            <div className={styles.bubble}>
                                {item.option.name === "Text" &&
                                    <p>{item.option.value}</p>}
                                {item.option.name === "Image" && <img src={item.option.value} alt="User uploaded" />}
                            </div>
                        )}
                        {item?.from === "input" && (
                            item.option.type == "rating" ? (
                                <div className={styles.inputItem}>
                                    <RatingComponent onRate={setRating} />
                                    <SendButton />
                                </div>
                            ) : item.option.type == "button" ? (
                                <div className={styles.inputItem}>
                                    <button onClick={onSubmitForm} disabled={disabled} style={disabled ? { opacity: 0.5 } : {}}>
                                        Submit
                                    </button>
                                </div>
                            ) : (
                                <div className={styles.inputItem}>
                                    <input
                                        type={item.option.type}
                                        placeholder={item.option?.placeholder}
                                        onChange={(e) => { setCurrentInput(e.target.value) }}
                                    />
                                    <SendButton />
                                </div>
                            )
                        )}
                    </div>
                );
            })}
        </div >
    )
}

export default FormFill