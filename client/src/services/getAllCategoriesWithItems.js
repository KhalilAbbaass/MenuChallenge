import axios from "axios";
const apiURI = "http://localhost:5000/api/admin/findallcatwithitems";

export function getAllCategoriesWithItems(){
    return axios.get(apiURI)
}