import styles from './auth.module.css'
import { useEffect, useState } from 'react'
import Form from '../../components/form/form'
import { useNavigate } from 'react-router-dom'
import { alertToast, errorToast } from '../../helper/toast'
import { getUserInfo, registerUser, updateUserData } from '../../services/auth'
import { getIdFromToken, validateEmail } from '../../helper/utils'
import { MdLogout } from "react-icons/md";
import { updateFormData } from '../../services/form'

export default function Settings() {

    useEffect(() => {
        const getUserData = async () => {
            if (getIdFromToken()) {
                const res = await getUserInfo()
                if (res.status == 200) {
                    setFormData({
                        name: res.data.name,
                        email: res.data.email,
                        password: "",
                        confirmPassword: ""
                    })
                }
            }
        }

        getUserData()
    }, [])

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [error, setError] = useState({
        name: false,
        email: false,
        password: false,
        confirmPassword: false
    })

    const formFields = [
        {
            name: "name",
            placeholder: "Enter a Username",
            type: "text",
            value: formData?.name,
            onChange: (e) => {
                setFormData({ ...formData, name: e.target.value })
                setError({ ...error, name: false })
            },
        },
        {
            name: "email",
            placeholder: "Update Email",
            type: "email",
            value: formData?.email,
            onChange: (e) => {
                setFormData({ ...formData, email: e.target.value })
                setError({ ...error, email: false })
            },
        },
        {
            name: "password",
            placeholder: "Old Password",
            type: "password",
            value: formData?.password,
            showPassword: false,
            onChange: (e) => {
                setFormData({ ...formData, password: e.target.value })
                setError({ ...error, password: false })
            },
        },
        {
            name: "confirmPassword",
            placeholder: "New Password",
            type: "password",
            value: formData?.confirmPassword,
            showPassword: false,
            onChange: (e) => {
                setFormData({ ...formData, confirmPassword: e.target.value })
                setError({ ...error, confirmPassword: false })
            },
        }
    ]

    const errorMessages = {
        name: {
            message: "Enter your name",
            isValid: formData?.name.length > 0,
            onError: () => {
                setError((error) => ({ ...error, name: true }))
            }
        },
        email: {
            message: "Enter valid email address",
            isValid: validateEmail(formData?.email),
            onError: () => {
                setError((error) => ({ ...error, email: true }))
            }
        },
        password: {
            message: "Password should be min 8 characters",
            isValid: formData.password.length >= 8 || formData.password.length == 0,
            onError: () => {
                setError((error) => ({ ...error, password: true }))
            }
        },
        confirmPassword: {
            message: "Password should be min 8 characters",
            isValid: formData.confirmPassword.length >= 8,
            onError: () => {
                setError((error) => ({ ...error, confirmPassword: true }))
            }
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        let isError = false
        Object.keys(errorMessages).map((key) => {
            if (!errorMessages[key].isValid) {
                isError = true
                errorMessages[key].onError()
            }
        })
        if (!isError) {
            const res = await updateUserData({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                newPassword: formData.confirmPassword
            })

            if (res.status == 200) {
                // navigate('/login')
                alertToast(res.message)
            } else {
                errorToast(res.message)
            }
        } else {
            console.log(error)
        }
    }

    const logOut = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <div className={styles.container}>
            <h1 style={{ marginBottom: 20 }}>Settings</h1>
            <Form
                formFields={formFields}
                errorMessages={errorMessages}
                error={error}
                onSubmit={onSubmit}
                buttonText={"Update"}
            />
            <div className={styles.logoutDiv} onClick={() => logOut()}>
                <MdLogout className={styles.logoutIcon} />
                <p> Log out </p>
            </div>

        </div>
    )
}