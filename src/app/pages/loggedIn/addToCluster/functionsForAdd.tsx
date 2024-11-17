"use client"
import React from "react";

const centerDiv = "flex items-center justify-center";
export const inpStyle = "m-2 border-gray-300 border-2 rounded";
const buttonStyle = "m-2 py-1 px-3 bg-blue-400 text-white rounded w-1/2";

//post to server:
const post = async (cluster: string, dataToAdd: any) => {
    // const router = useRouter();
    try {
        const response = await fetch(`/api/${cluster}`, {
            method: "POST",
            headers: {
                "content-Type": "application/json",
            },
            body: JSON.stringify(dataToAdd),
        });
        if (!response.ok) {
            throw new Error(`failed to add - ${cluster}`);
        }
        await response.json();
        // router.push(`/pages/loggedIn/${cluster}`);
    } catch (error) {
        console.error(`failed to add - ${cluster}`);
    }
};

export const handleSubmit = (e: React.FormEvent, cluster: string) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    //create new data with type of cluster like ICluster
    let newData;
    switch (cluster) {
        case "cars":
            newData = {
                company: formData.get("company") as string,
                color: formData.get("color") as string,
                year: formData.get("year"),
                price: formData.get("price"),
            };
            break;
        case "books":
            newData = {
                title: formData.get("title") as string,
                author: formData.get("author") as string,
                price: formData.get("price"),
            };
            break;
        case "animals":
            newData = {
                name: formData.get("name") as string,
                type: formData.get("type") as string,
                age: formData.get("age"),
            };
            break;
        default:
            return;
    }
    //POST based on the right cluster
    post(cluster, newData);
};

export const carRender = () => (
    <div className={centerDiv}>
        <form className="flex flex-col" onSubmit={(e) => handleSubmit(e, "cars")}>
            <label>
                Company:
                <input type="text" name="company" className={inpStyle} />
            </label>
            <label>
                Color:
                <input type="string" name="color" className={inpStyle} />
            </label>
            <label>
                Year:
                <input type="number" name="year" className={inpStyle} />
            </label>
            <label>
                Price:
                <input type="number" name="price" className={inpStyle} />
            </label>
            <button type="submit" className={buttonStyle}>Add Car</button>
        </form>
    </div>
);

export const bookRender = () => (
    <div className={centerDiv}>
        <form className="flex flex-col content-center" onSubmit={(e) => handleSubmit(e, "books")}>
            <label>
                Title:
                <input type="text" name="title" className={inpStyle} />
            </label>
            <label>
                Author:
                <input type="string" name="author" className={inpStyle} />
            </label>
            <label>
                Price:
                <input type="number" name="price" className={inpStyle} />
            </label>
            <button type="submit" className={buttonStyle}>Add Book</button>
        </form>
    </div>
);

export const animalRender = () => (
    <div className={centerDiv}>
        <form className="flex flex-col content-center" onSubmit={(e) => handleSubmit(e, "animals")}>
            <label>
                Name:
                <input type="text" name="name" className={inpStyle} />
            </label>
            <label>
                Type:
                <input type="string" name="type" className={inpStyle} />
            </label>
            <label>
                Age:
                <input type="number" name="age" className={inpStyle} />
            </label>
            <button type="submit" className={buttonStyle}>Add Animal</button>
        </form>
    </div>
);
