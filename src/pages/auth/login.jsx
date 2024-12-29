import styles from './auth.module.css'
import { useEffect, useState } from 'react'
import Form from '../../components/form/form'
import { useNavigate } from 'react-router-dom'
import { getIdFromToken, validateEmail } from '../../helper/utils'
import { loginUser } from '../../services/auth'
import { alertToast, errorToast } from '../../helper/toast'
import { IoArrowBack } from 'react-icons/io5';
import triangle from '../../assets/triangle.png'
import GoogleSignInButton from './googleSignInButton'
import rightCircle from '../../assets/rightCircle.png'
import bottomCircle from '../../assets/bottonCircle.png'

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
            label: "Password",
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
        <>
            <div className={styles.backButton} onClick={() => navigate(-1)}>
                <IoArrowBack className={styles.backIcon} />
            </div>
            <div className={styles.container}>
                <img src={triangle} alt="" className={styles.triangleImage} />
                <img src={rightCircle} alt="" className={styles.rightCircleImage} />
                <div className={styles.formContainer}>
                    <Form
                        formFields={formFields}
                        errorMessages={errorMessages}
                        error={error}
                        onSubmit={onSubmit}
                        buttonText={"Log In"}
                    />
                </div>
                <p style={{ fontSize: '8px' }}>OR</p>
                <GoogleSignInButton login={true} />
                <p className={styles.lightText}>
                    Dont have an account?&nbsp;
                    <span
                        className={styles.buttonStyle}
                        onClick={() => navigate('/register')}>Register now
                    </span>
                </p>
                
                <img src={bottomCircle} alt="" className={styles.bottomCircleImage} />
            </div>
        </>
    )
}