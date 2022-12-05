import axios from "axios";

export function deleteItem(CategoryID, ItemID){
    const apiURI=`http://localhost:5000/api/admin/deleteItem/${CategoryID}/${ItemID}`;

    axios.put(apiURI).then((res) => {
        console.log(res)

    }).catch((err) =>{
        console.log(err)
    } )
}