import axios from "axios";
import { addTokenToHeader, getIdFromToken } from "../helper/utils";
import { alertToast, errorToast } from "../helper/toast";

export const getAllWorkspaces = async () => {
    try {
        const id = getIdFromToken()
        const headers = addTokenToHeader({ headers: {} })
        if (headers) {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/workspace/${id}`,
                { headers }
            );
            return {
                status: res?.status,
                data: res?.data
            };
        }
    } catch (error) {
        if (error.response) {
            console.log("Error Response:", error.response.data);
        }
        return {
            status: error.status,
            message: error.response.data.message
        }
    }
}

export const getWorkspaceById = async (id) => {
    try {
        const headers = addTokenToHeader({ headers: {} })
        if (headers) {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/workspace/id/${id}`,
                { headers }
            );
            return {
                status: res?.status,
                data: res?.data
            };
        }
    } catch (error) {
        if (error.response) {
            console.log("Error Response:", error.response.data);
        }
        return {
            status: error.status,
            message: error.response.data.message
        }
    }
}
export const shareWorkspace = async (data) => {
    try {
        //data = {email, accessType}
        const id = getIdFromToken()
        const headers = addTokenToHeader({ headers: {} })
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/workspace/share`, data, { headers });
        return {
            status: res?.status,
            message: res?.data.message
        };
    } catch (error) {
        return {
            status: error?.status ? error.status : 500,
            message: error?.response?.data?.message ? error.response.data.message : "Something went wrong"
        };
    }
}
export const generateShareableLink = async (accessType) => {
    try {
        const headers = addTokenToHeader({ headers: {} });
        const res = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/v1/workspace/share/generate-link`,
            { accessType },
            { headers }
        );

        if (res.status === 200) {
            navigator.clipboard.writeText(res.data.link);
            alertToast("Link copied to clipboard!");
        } else {
            errorToast(res.data.message);
        }
    } catch (error) {
        errorToast("Failed to generate link.");
    }
};

export const joinWorkspace = async (token) => {
    try {
        const headers = addTokenToHeader({ headers: {} });
        const res = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/v1/workspace/share/join`,
            { token: token },
            { headers }
        );
        if (res.status === 200) {
            alertToast(res.data.message);
        } else {
            errorToast(res.data.message);
        }
    } catch (error) {
        errorToast("Failed to join workspace.");
    }
};
