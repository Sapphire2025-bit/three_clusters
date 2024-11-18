"use client";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import ICar from "@/app/types/carsForSchema";
import CardActions from "@/app/components/CardActions";
import ButtonFunctionProps from "@/app/types/buttonFunctionProps";
import Card from "@/app/components/Card";
import CardActionsProps from "@/app/types/cardActionProps";

// Fetching function to get all animals
const fetchCarById = async (id: string): Promise<ICar> => {
  const response = await fetch(`/api/cars?id=${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch car");
  }

  const data = await response.json();
  return data.data;
};

const CarPage = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [isEditing, setIsEditing] = useState(false);
  const [company, setCompany] = useState("");
  const [color, setColor] = useState("");
  const [year, setYear] = useState(0);
  const [price, setPrice] = useState(0);

  const { data: car, error, isLoading, refetch } = useQuery<ICar, Error>({
    queryKey: ['cars', id as string],
    queryFn: () => fetchCarById(id as string),
    enabled: !!id,
  });

  const resetChanges = async () => {
    if (car) {
      setCompany(car.company);
      setColor(car.color);
      setYear(car.year);
      setPrice(car.price);
    }
  };

  useEffect(() => {
    resetChanges();
  }, [car]);

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  const goBack = () => {
    router.push(`/pages/loggedIn/cars`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = { company, color, year, price };

    try {
      const response = await fetch(`/api/cars?id=${id}`, {
        method: "PUT",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("failed to update car");
      }

      await response.json();
      setIsEditing(false);
      refetch();
    } catch (error) {
      console.error("Error updating car: ", error);
    }
  };

  //render info when not editing, inputs when editing
  const renderInfoOptions = (car: ICar) => {
    if (isEditing) {
      const inpStyle = "m-2 border-gray-300 border-2 rounded";
      const allButtons: ButtonFunctionProps[] = [
        {
          buttonText: "<- Go Back",
          buttonFunc: goBack,
          buttonColor: "bg-blue-400"
        },
        {
          buttonText: "Reset",
          buttonFunc: resetChanges,
          buttonColor: "bg-purple-400"
        }
      ];
      return (
        <div>
          <h1>Car update:</h1>
          <form onSubmit={handleSubmit}>
            <label>
              <strong>Company:</strong>
              <input type="text"
                name="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className={inpStyle} />
            </label>
            <label>
              <strong>Color:</strong>
              <input type="text"
                name="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className={inpStyle} />
            </label>
            <label>
              <strong>Year:</strong>
              <input type="number"
                name="year"
                value={year}
                onChange={(e) => setYear(e.target.value ? parseInt(e.target.value) : 0)}
                className={inpStyle} />
            </label>
            <label>
              <strong>Price:</strong>
              <input type="number"
                name="price"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value ? parseInt(e.target.value) : 0)}
                className={inpStyle} />
            </label>
            <br />
            <button type="submit" className="bg-green-400 px-4 py-2 text-white rounded-full my-8">Save</button>
          </form>
          <CardActions allButtons={allButtons}/>
        </div>
      );

    } else {
      const cardActions: CardActionsProps = {
        allButtons: [
        {
          buttonText: "<- Go Back",
            buttonFunc: goBack,
            buttonColor: "bg-blue-400"
        },
        {
          buttonText: "Update",
            buttonFunc: () => setIsEditing(true),
            buttonColor: "bg-yellow-400"
        }
      ]};
      const props = {
        company: car.company,
        color: car.color,
        year: car.year,
        price: car.price
      };
      return (
        <div>
          <h1>Car:</h1>
          {car && <Card clusterInfo={props} allButtons={cardActions}/>}
        </div>
      );
    }
  };

  return (
    <div>
      {car && renderInfoOptions(car)}
    </div>
  );
};

export default CarPage;