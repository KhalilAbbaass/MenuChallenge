import axios from "axios";
const apiURI = "http://localhost:5000/api/admin/login"

export const LoginAdmin = async (AdminInfo) => {
    return await axios.post(apiURI, AdminInfo)
}