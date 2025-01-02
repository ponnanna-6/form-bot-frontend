import React, { useEffect } from "react";
import styles from "./home.module.css";
import desktop from "../../assets/firstDesktop.png";
import logo from '../../assets/logo.png';
import { useNavigate } from "react-router-dom";
import triangle from '../../assets/triangle.png'
import rightCircle from '../../assets/rightCircle.png'
import { use } from "react";
import { getIdFromToken } from "../../helper/utils";
const Home = ({setUserLoggedIn}) => {
    const navigate = useNavigate()

    useEffect(() => {
        if (getIdFromToken()) {
            setUserLoggedIn(true);
        }
    }, [])
    function LogoImage() {
        return (
            <div className={styles.logo}>
                <img src={logo} alt="Logo" className={styles.logoImage} />
                FormBot
            </div>
        );
    }
    return (
        <div className={styles.container}>
            {/* Header Section */}
            <header className={styles.header}>
                <LogoImage />
                <div className={styles.navButtons}>
                    <button className={styles.signInButton} onClick={() => { navigate('/login') }}>Sign in</button>
                    <button className={styles.createButton} onClick={() => { navigate('/login') }}>Create a FormBot</button>
                </div>
            </header>

            {/* Main Section */}
            <main className={styles.main}>
                <div className={styles.titleContainer}>
                    <img src={triangle} alt="Triangle" className={styles.triangleImage} />
                    <div style={{flex: 2, marginLeft: 20}}>
                        <h1 className={styles.title}>Build advanced chatbots visually</h1>
                        <p className={styles.subtitle}>
                            Typebot gives you powerful blocks to create unique chat experiences.Embed them
                            anywhere on your web/mobile apps and start collecting results like magic.
                        </p>
                    </div>
                    <img src={rightCircle} alt="Right Circle" className={styles.rightCircleImage} />
                </div>
                <button className={styles.ctaButton} onClick={() => { navigate('/login') }}>Create a FormBot for free</button>

                {/* Workflow Preview */}
                <div className={styles.workflowPreview}>
                    <img src={desktop} alt="Workflow Preview" className={styles.previewImage} />
                </div>
            </main>

            {/* Footer Section */}
            <footer className={styles.footer}>
                <div>
                    <LogoImage />
                    <p>Made with ❤️ by @Cuvette</p>
                </div>
                <div className={styles.footerLinks}>
                    <div>
                        <h4>Product</h4>
                        <ul>
                            <li>Status</li>
                            <li>Documentation</li>
                            <li>Roadmap</li>
                            <li>Pricing</li>
                        </ul>
                    </div>
                    <div>
                        <h4>Community</h4>
                        <ul>
                            <li>Discord</li>
                            <li>GitHub repository</li>
                            <li>Twitter</li>
                            <li>LinkedIn</li>
                        </ul>
                    </div>
                    <div>
                        <h4>Company</h4>
                        <ul>
                            <li>About</li>
                            <li>Contact</li>
                            <li>Terms of Service</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
