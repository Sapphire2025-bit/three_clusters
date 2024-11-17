"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import ICar from "@/app/types/carsForSchema";
import ClusterInfo from "@/app/components/ClusterInfo";
import CardActions from "@/app/components/CardActions";
import { useRouter } from "next/navigation";
import ButtonFunctionProps from "@/app/types/buttonFunctionProps";

// Fetching function to get all books
const fetchCars = async (): Promise<ICar[]> => {
  const response = await fetch("/api/cars");

  if (!response.ok) {
    throw new Error("Failed to fetch cars");
  }

  const data = await response.json();
  return data.data;
};

const allCars = () => {
  const router = useRouter();
  const { data: cars, error, isLoading, refetch } = useQuery({
    queryKey: ['cars'],
    queryFn: fetchCars,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  const showMore = (id: string) => {
    router.push(`/pages/loggedIn/cars/${id}`);
  };

  const remove = async (id: string) => {
    console.log("delete tryout")
    try {
      const response = await fetch(`/api/cars?id={id}`, {
        method: "DELETE",
        headers: {
          "content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("failed to delete the car");
      }
      await response.json();
      refetch();
    }
    catch (error) {
      console.error("Error deleting car: ", error);
    }
  };

  return (
    <div>
      <h1>All Cars</h1>
      <ul>
        {cars?.map((car, index) => {
          const allButtons: ButtonFunctionProps[] = [
            {
              buttonText: "Show More ->",
              buttonFunc: () => showMore(car._id),
              buttonColor: "bg-blue-400"
            },
            {
              buttonText: "Delete",
              buttonFunc: () => remove(car._id),
              buttonColor: "bg-red-400"
            }
          ];

          return (
            <li key={index}>
              <ClusterInfo company={car.company} color={car.color} year={car.year} price={car.price}/>
              <CardActions allButtons={allButtons} />
            </li>
          );
        })}
      </ul>
      <button onClick={() => {router.push("/pages/loggedIn/addToCluster")}}>+</button>
    </div>
  );
};

export default allCars;
