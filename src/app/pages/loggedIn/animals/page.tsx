"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import IAnimal from "@/app/types/animalsForSchema";
import { useRouter } from "next/navigation";
import Card from "@/app/components/Card";
import CardActionsProps from "@/app/types/cardActionProps";

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
      <div className="grid grid-cols-3 gap-4">
        {animals?.map((animal, index) => {
          // Define the array of button objects for each animal
          const cardActions: CardActionsProps = {
            allButtons: [
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
            ]
          };

          const props = {
            name: animal.name,
            type: animal.type,
            age: animal.age
          };

          return (
            <div key={index}>
              <Card clusterInfo={props} allButtons={cardActions} />
            </div>
          );
        })}
      </div>
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
