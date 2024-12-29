import axios from "axios";
import { addTokenToHeader, getIdFromToken } from "../helper/utils";

export const addFolder = async (data) => {
  try {
    //data = {workspaceId, name}
    const id = getIdFromToken()
    const headers = addTokenToHeader({headers:{}})
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/folder/`, data, 
      {headers});
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

export const getFolder = async (data) => {
  try {
    //data = {folderId}
    const id = getIdFromToken()
    const headers = addTokenToHeader({headers:{}})
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/folder/id/${data.folderId}`, 
      {headers});
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

export const getAllFoldersInWorkspace = async (data) => {
  try {
    //data = {workspaceId}
    const id = getIdFromToken()
    const headers = addTokenToHeader({headers:{}})
    if(headers) {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/folder/${data.workspaceId}`, 
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

export const deleteFolder = async (data) => {
  try {
    //data = {folderId}
    const id = getIdFromToken()
    const headers = addTokenToHeader({headers:{}})
    if(headers) {
      const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/folder/${data.folderId}`, 
        {headers}
      );
      return {
        status: res?.status,
        message: res?.data.message
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