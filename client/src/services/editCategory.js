import axios from "axios";

export function editCategory(_id, name){
    const apiURI=`http://localhost:5000/api/admin/updateCategory/${_id}`;

    axios.put(apiURI, name).then((res) => {
        console.log(res)

    }).catch((err) =>{
        console.log(err)
    } )
}