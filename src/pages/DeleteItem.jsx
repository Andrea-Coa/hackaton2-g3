import React, {useState} from "react";
import { deleteItem} from "../services/api";

const DeleteItem = () => {
    const [itemId, setItemId] = useState(0);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await deleteItem(itemId);
            alert('Item deleted successfully');
            console.log(response);
        }
        catch(error){
            console.error('Item deletion failed', error);
            alert('Item deletion failed');
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <div>Delete Item</div>
            <label htmlFor='itemId'>Item ID:
                <input
                    type='number'
                    value={itemId}
                    onChange={(e) => setItemId(e.target.value)}
                    required
                />
            </label>
            <br/>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    );






}

export default DeleteItem