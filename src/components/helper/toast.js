import { toast, Bounce, Zoom} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const alertToast = (message) => {
    toast(message, {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        style: {
            borderBottom: "5px solid #FC8A06"
        }
    });
}

export const errorToast = (message) => {
    toast.error(message, {
        position: "top-center",
        autoClose: 500,
        type: "error",
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        style: {
            borderBottom: "5px solid red"
        }
    });
}

export const linkCopiedToast = (message) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 1000,
        type: "default",
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeButton: false,
        theme: "light",
        transition: Zoom,
        style: {
            border: "1px solid #48C1B5",
            backgroundColor: "#F6FFF9",
            color: "#27303A",
            fontFamily: "Poppins",
            width: "150px",
            paddingLeft: "20px",
            paddingTop: "10px",
            paddingBottom: "10px",
            fontWeight: "550"
        }
    });
}