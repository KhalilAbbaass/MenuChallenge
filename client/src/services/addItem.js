import axios from "axios";

export const addItem = async (CatID, ItemBeingAdded) => {
    const apiURI = `http://localhost:5000/api/admin/addItem/${CatID}`;
    return await axios.put(apiURI, ItemBeingAdded)
}