import axios from "axios";
const apiURI = "http://localhost:5000/api/admin/";

export const addCategory = async (CategoryBeingAdded) => {
    return await axios.post(apiURI, CategoryBeingAdded)
}