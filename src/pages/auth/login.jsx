import styles from './auth.module.css'
import { useEffect, useState } from 'react'
import Form from '../../components/form/form'
import { useNavigate } from 'react-router-dom'
import { getIdFromToken, validateEmail } from '../../helper/utils'
import { loginUser } from '../../services/auth'
import { alertToast, errorToast } from '../../helper/toast'

export default function Login() {
    const navigate = useNavigate()

    useEffect(() => {
        if (getIdFromToken()) {
            // navigate('/')
        }
    }, [])

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [error, setError] = useState({
        email: false,
        password: false
    })

    const errorMessages = {
        email: {
            message: "Enter valid email address",
            isValid: validateEmail(formData?.email),
            onError: () => {
                setError((error) => ({ ...error, email: true }))
            }
        },
        password: {
            message: "Password should be min 8 characters",
            isValid: formData.password.length >= 8,
            onError: () => {
                setError((error) => ({ ...error, password: true }))
            }
        }
    }

    const formFields = [
        {
            name: "email",
            placeholder: "Example@gmail.com",
            type: "email",
            value: formData?.email,
            onChange: (e) => {
                setFormData({ ...formData, email: e.target.value })
                setError({ ...error, email: false })
            },
        },
        {
            name: "password",
            placeholder: "Atleast 8 characters",
            type: "password",
            value: formData?.password,
            showPassword: false,
            onChange: (e) => {
                setFormData({ ...formData, password: e.target.value })
                setError({ ...error, password: false })
            },
        }
    ]

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
            const res = await loginUser(formData)

            if (res.status == 200) {
                alertToast(res.data.message)
                localStorage.setItem('token', res.data.token)
                navigate('/')
            } else {
                errorToast(res.message)
            }
        } else {
            console.log(error)
        }
    }

    return (
        <div className={styles.parentContainer}>
            <div className={styles.container}>
                <Form
                    formFields={formFields}
                    errorMessages={errorMessages}
                    error={error}
                    onSubmit={onSubmit}
                    buttonText={"Login"}
                />
                <p className={styles.lightText}>
                    Dont have an account?&nbsp;
                    <span
                        className={styles.buttonStyle}
                        onClick={() => navigate('/register')}>Register now
                    </span>
                </p>
            </div>
        </div>
    )
}