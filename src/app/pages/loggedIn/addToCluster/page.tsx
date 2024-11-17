"use client"
import React, { useState } from 'react'
// import ICar from '@/app/types/carsForSchema';
import { useRouter } from 'next/navigation';
import { carRender, bookRender, animalRender, inpStyle } from "./functionsForAdd";

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
            <label>
                add a new iten to cluster:
                <select value={currentOption} className={inpStyle} onChange={(e) => setCurrentOption(e.target.value)}>
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