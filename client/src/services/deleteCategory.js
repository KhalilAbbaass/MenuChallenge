import axios from "axios";

export function deleteCategory(_id){
    const apiURI=`http://localhost:5000/api/admin/deleteCategory/${_id}`;

    axios.delete(apiURI).then((res) => {
        console.log(res)

    }).catch((err) =>{
        console.log(err)
    } )
}