import styles from './auth.module.css'
import { FcGoogle } from "react-icons/fc";
export default function GoogleSignInButton({ login }) {
    return (
        <button className={styles.buttonStyle2}>
            <FcGoogle/>
            {login
                ? "Sign in with Google"
                : "Sign Up with Google"}
        </button>
    )
}