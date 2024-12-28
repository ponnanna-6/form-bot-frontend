import styles from './form.module.css'
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline, MdLockOutline, MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useState } from 'react';

export default function Form ({formFields, errorMessages, error, onSubmit, buttonText}) {
    const [showPassword, setShowPassword] = useState(false)
    const [confirmShowPassword, setConfirmShowPassword] = useState(false)

    function getIcon (name) {
        switch (name) {
            case "name":
                return <FaRegUser className={styles.iconStyle}/>
            case "email":
                return <MdOutlineMailOutline className={styles.iconStyle}/>
            case "password":
            case "confirmPassword":
                return <MdLockOutline className={styles.iconStyle}/>
            default:
                break;
        }
    }

    function togglePasswordVisibility(name) {
        if (name === "password") {
            setShowPassword(prev => !prev);
        } else if (name === "confirmPassword") {
            setConfirmShowPassword(prev => !prev);
        }
    }

    return (
        <form className={styles.formContainer} onSubmit={onSubmit}>
            {formFields.map((item, index) => 
                <>
                    <div key={index} className={styles.inputContainer}>
                        <input 
                            value={item?.value}
                            type={item?.name === "password" && showPassword 
                                ? "text" 
                                : item?.name === "confirmPassword" && confirmShowPassword 
                                ? "text" 
                                : item?.type}
                            onChange={item?.onChange}
                            placeholder={item?.placeholder}
                            className={styles.inputStyle}
                        />
                        {item?.name === "password" && (
                            showPassword 
                                ? <MdOutlineRemoveRedEye className={styles.passwordToggleIcon} onClick={() => togglePasswordVisibility(item.name)}/>
                                : <FaRegEyeSlash className={styles.passwordToggleIcon} onClick={() => togglePasswordVisibility(item.name)}/>
                        )}
                        {item?.name === "confirmPassword" && (
                            confirmShowPassword 
                                ? <MdOutlineRemoveRedEye className={styles.passwordToggleIcon} onClick={() => togglePasswordVisibility(item.name)}/>
                                : <FaRegEyeSlash className={styles.passwordToggleIcon} onClick={() => togglePasswordVisibility(item.name)}/>
                        )}
                    </div>
                    {error[item?.name] && <p className={styles.errorMessage}>{errorMessages[item?.name].message}</p>}
                </>
            )}
            <button className={styles.buttonStyle}>{buttonText}</button>
        </form>
    )
}