import axios from "axios";
import { addTokenToHeader, getIdFromToken } from "../helper/utils";

export const addForm = async (name, workspaceId, folderId) => {
  try {
    const headers = addTokenToHeader({headers:{}})
    const data = {name: name, workspaceId: workspaceId, folderId: folderId}
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/form/`, data, 
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

export const getAllFormsInWorkspace = async (workspaceId, folderId) => {
  try {
    const headers = addTokenToHeader({headers:{}})
    if(headers) {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/form/${workspaceId}/${folderId}`, 
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
};

export const deleteFolder = async (data) => {
  try {
    //data = {folderId}
    const id = getIdFromToken()
    const headers = addTokenToHeader({headers:{}})
    console.log(data.folderId)
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