"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import IAnimal from "@/app/types/animalsForSchema";
import ClusterInfo from "@/app/components/ClusterInfo";
import ButtonFunctionProps from "@/app/types/buttonFunctionProps";
import CardActions from "@/app/components/CardActions";
import { useRouter } from "next/navigation";

// Fetching function to get all animals
const fetchAnimals = async (): Promise<IAnimal[]> => {
  const response = await fetch("/api/animals");

  if (!response.ok) {
    throw new Error("Failed to fetch animals");
  }

  const data = await response.json();
  return data.data;
};

const AnimalsPage = () => {
  const router = useRouter();
  const { data: animals, error, isLoading, refetch } = useQuery({
    queryKey: ['animals'],
    queryFn: fetchAnimals,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  const showMore = (id: string) => {
    router.push(`/pages/loggedIn/animals/${id}`);
  };

  const remove = async (id: string) => {
    try {
      const response = await fetch(`/api/animals?id=${id}`, {
        method: "DELETE",
        headers: {
          "content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("failed to delete the animal");
      }
      await response.json();
      refetch();
    }
    catch (error) {
      console.error("Error deleting animal: ", error);
    }
  };

  return (
    <div>
      <h1>All Animals</h1>
      <ul>
        {animals?.map((animal, index) => {
          // Define the array of button objects for each animal
          const allButtons: ButtonFunctionProps[] = [
            {
              buttonText: "Show More ->",
              buttonFunc: () => showMore(animal._id),
              buttonColor: "bg-blue-400",
            },
            {
              buttonText: "Delete",
              buttonFunc: () => remove(animal._id),
              buttonColor: "bg-red-400",
            },
          ];

          return (
            <li key={index}>
              <ClusterInfo name={animal.name} type={animal.type} age={animal.age} />
              <CardActions allButtons={allButtons} />
            </li>
          );
        })}
      </ul>
      <div className="flex justify-center">
        <button
          onClick={() => { router.push("/pages/loggedIn/addToCluster/animals") }}
          className="m-2 py-1 px-3 bg-blue-400 text-white text-3xl rounded w-1/8 ">
          +
        </button>
      </div>
    </div>
  );
};

export default AnimalsPage;
