import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getFormById } from "../../services/form";
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
    const [responses, setResponses] = useState({});
    const [rating, setRating] = useState(0);

    useEffect(() => {
        const getFormData = async () => {
            const res = await getFormById(formId)
            if (res.status == 200) {
                setFormArray(res.data.form.formData)
            } else {
                errorToast(res.data.message)
            }
        }
        getFormData();
    }, [])

    return (
        <div className={styles.container}>
            {formArray.map((item, index) => {
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
                                    <button>
                                        <AiOutlineSend fontSize={20} color={"#fff"} />
                                    </button>
                                </div>
                            ) : item.option.type == "button" ? (
                                <div className={styles.inputItem}>
                                    <button>
                                        Submit
                                    </button>
                                </div>
                            ) : (
                                <div className={styles.inputItem}>
                                    <input
                                        type={item.option.type}
                                        placeholder={item.option?.placeholder}
                                    />
                                    <button>
                                        <AiOutlineSend fontSize={20} color={"#fff"} />
                                    </button>
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