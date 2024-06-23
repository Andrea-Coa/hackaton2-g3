import React, { useState } from "react";
import { createItem } from "../services/api";

const CreateNewItem = () => {
    const [title, setTitle] = useState("")
    const [boughtInLastMonth, setBoughtInLastMonth] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [isBestSeller, setIsBestSeller] = useState("false")
    const [price, setPrice] = useState("0")
    const [stars, setStars] = useState("0")


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createItem({title, boughtInLastMonth, imgUrl, isBestSeller, price, stars});
            alert('Item registered successfully');
            console.log(response);

        } catch (error) {
            console.error('Item registration failed', error);
            alert('Item registration failed');    
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <div>Create Item</div>
            <label htmlFor='title'>Title:
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </label>
            <br/>
            <label htmlFor='boughtInLastMonth'>Bought in last month:
                <input
                    type='number'
                    value={boughtInLastMonth}
                    onChange={(e) => setBoughtInLastMonth(e.target.value)}
                    required
                />
            </label>
            <br/>
            <label htmlFor='imgUrl'>Image URL:
                <input
                    type='text'
                    value={imgUrl}
                    onChange={(e) => setImgUrl(e.target.value)}
                    required
                />
            </label>
            <br/>
            <label htmlFor='isBestSeller'>Is Best Seller:
                <input
                    type='bool'
                    value={isBestSeller}
                    onChange={(e) => setIsBestSeller(e.target.value)}
                    required
                />
            </label>
            <br/>
            <label htmlFor='price'>Price:
                <input
                    type='number'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </label>
            <br/>
            <label htmlFor='stars'>Stars:
                <input
                    type='number'
                    value={stars}
                    onChange={(e) => setStars(e.target.value)}
                    required
                />
            </label>
            <br/>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
);
}

export default CreateNewItem;