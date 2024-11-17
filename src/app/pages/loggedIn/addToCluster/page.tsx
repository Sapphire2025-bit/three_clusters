"use client"
import React, { useState } from 'react'
// import ICar from '@/app/types/carsForSchema';
import { useRouter } from 'next/navigation';
import { carRender, bookRender, animalRender, handleSubmit } from "./functionsForAdd";

const AddToCluster = () => {
    const router = useRouter();
    const [currentOption, setCurrentOption] = useState("cars");

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
            <br/>
            <label>
                add a new iten to cluster:
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