import styles from './auth.module.css'
import { useState } from 'react'
import Form from '../../components/form/form'
import { useNavigate } from 'react-router-dom'
import { alertToast, errorToast } from '../../helper/toast'
import { registerUser } from '../../services/auth'
import { validateEmail } from '../../helper/utils'
import GoogleSignInButton from './googleSignInButton'

export default function Register() {
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
            label: "Username",
            onChange: (e) => {
                setFormData({ ...formData, name: e.target.value })
                setError({ ...error, name: false })
            },
        },
        {
            name: "email",
            placeholder: "Enter your email",
            type: "email",
            value: formData?.email,
            label: "Email",
            onChange: (e) => {
                setFormData({ ...formData, email: e.target.value })
                setError({ ...error, email: false })
            },
        },
        {
            name: "password",
            placeholder: "********",
            type: "password",
            value: formData?.password,
            showPassword: false,
            label: "Password",
            onChange: (e) => {
                setFormData({ ...formData, password: e.target.value })
                setError({ ...error, password: false })
            },
        },
        {
            name: "confirmPassword",
            placeholder: "********",
            type: "password",
            value: formData?.confirmPassword,
            showPassword: false,
            label: "Confirm Password",
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
            isValid: formData.password.length >= 8,
            onError: () => {
                setError((error) => ({ ...error, password: true }))
            }
        },
        confirmPassword: {
            message: "Password should be min 8 characters",
            isValid: formData.confirmPassword == formData.password,
            onError: () => {
                setError((error) => ({ ...error, password: true }))
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
            const res = await registerUser(formData)

            if (res.status == 200) {
                navigate('/login')
                alertToast(res.message)
            } else {
                errorToast(res.message)
            }
        } else {
            console.log(error)
        }
    }

    return (
        <div className={styles.container}>
            <Form
                formFields={formFields}
                errorMessages={errorMessages}
                error={error}
                onSubmit={onSubmit}
                buttonText={"Register"}
            />
            <p>OR</p>
            <GoogleSignInButton />
            <p className={styles.lightText}>
                Already have an account ?&nbsp;
                <span
                    className={styles.buttonStyle}
                    onClick={() => navigate('/login')}>Login
                </span>
            </p>
        </div>
    )
}