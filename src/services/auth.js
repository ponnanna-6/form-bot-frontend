import axios from "axios";
import { addTokenToHeader, getIdFromToken } from "../helper/utils";

export const registerUser = async (data) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/user/register`, data);
    console.log(res)
    return {
      status: res.status,
      message: res.data.message
    };
  } catch (error) {
    return {
      status: error?.status ? error.status : 500,
      message: error?.response?.data?.message ? error.response.data.message : "Something went wrong"
    };
  }
};

export const loginUser = async (data) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/user/login`, data);
    console.log(res)
    return {
      status: res?.status,
      data: res?.data
    };
  } catch (error) {
    return {
      status: error?.status ? error.status : 500,
      message: error?.response?.data?.message ? error.response.data.message : "Something went wrong"
    };
  }
};

export const getUserInfo = async () => {
  try {
    const id = getIdFromToken()
    const headers = addTokenToHeader({headers:{}})
    if(headers) {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/user/id/${id}`, 
        {headers}
      );
      return {
        status: res?.status,
        data: res?.data[0]
      };
    }
  } catch (error) {
    if (error.response) {
      console.log("Error Response:", error.response.data);
    }
    return {
      status: error.status,
      message: error.response.data.message
    };
  }
};

export const getAllUsers = async () => {
  try {
    const headers = addTokenToHeader({headers:{}})
    if(headers) {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/user/all`, 
        {headers}
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
    };
  }
}