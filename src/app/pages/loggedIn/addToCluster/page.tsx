"use client"
import React, { useState } from 'react'
// import ICar from '@/app/types/carsForSchema';
import { useRouter } from 'next/navigation';

const AddToCluster = () => {
    const router = useRouter();
    const [currentOption, setCurrentOption] = useState("cars");

    const handleSubmit = (e: React.FormEvent, type: string) => {
        e.preventDefault();
        console.log("submitted " + type);
    };
    //render option for car
    const carRender = () => {
        return (
            <div>
                <form className="flex flex-col content-center" onSubmit={(e) => handleSubmit(e, "car")}>
                    <label>
                        company:
                        <input type="text"
                        name="company" />
                    </label>
                    <label>
                        color:
                        <input type="string" 
                        name="color"/>
                    </label>
                    <label>
                        year:
                        <input type="number" 
                        name="year"/>
                    </label>
                    <label>
                        price:
                        <input type="number" 
                        name="price"/>
                    </label>
                    <button type="submit">Add Car</button>
                </form>
            </div>
        );
    };
    //render option for book
    const bookRender = () => {
        return (
            <div>
                <form className="flex flex-col content-center" onSubmit={(e) => handleSubmit(e, "book")}>
                    <label>
                        title:
                        <input type="text"
                        name="title"/>
                    </label>
                    <label>
                        author:
                        <input type="string"
                        name="author"/>
                    </label>
                    <label>
                        price:
                        <input type="number"
                        name="price"/>
                    </label>
                    <button type="submit">Add Book</button>
                </form>
            </div>
        );
    };
    //render option for animal
    const animalRender = () => {
        return (
            <div>
                <form className="flex flex-col content-center" onSubmit={(e) => handleSubmit(e, "animal")}>
                    <label>
                        name:
                        <input type="text"
                        name="name"/>
                    </label>
                    <label>
                        type:
                        <input type="string"
                        name="type"/>
                    </label>
                    <label>
                        age:
                        <input type="number"
                        name="age"/>
                    </label>
                    <button type="submit">Add Animal</button>
                </form>
            </div>
        );
    };
    //render picker
    const renderPicker = () => {
        switch (currentOption) {
            case "cars":
                return carRender();
            case "books":
                return bookRender();
            case "animals":
                return animalRender();
            default:
                return <p>Select a valid cluster to add an item.</p>;
        }
    };
    return (
        <div>
            <button onClick={() => { router.push(`/loggedIn/${currentOption}`) }}>Back to all {currentOption}</button>
            <h1 className="flex content-center">add a new iten to cluster: {currentOption}</h1>
            <label>
                (change a cluster:)
                <select value={currentOption} onChange={(e) => setCurrentOption(e.target.value)}>
                    <option value="cars">cars</option>
                    <option value="books">books</option>
                    <option value="animals">animals</option>
                </select>
            </label>
            {renderPicker()}
        </div>
    )
}

export default AddToCluster