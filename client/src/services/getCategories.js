import axios from "axios";
const apiURI = "http://localhost:5000/api/admin/findallcat";

export function getAllCategories(){
    return axios.get(apiURI)
}
