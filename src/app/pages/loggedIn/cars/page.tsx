"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import ICar from "@/app/types/carsForSchema";
import { useRouter } from "next/navigation";
import Card from "@/app/components/Card";
import CardActionsProps from "@/app/types/cardActionProps";

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
    try {
      const response = await fetch(`/api/cars?id=${id}`, {
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
      <div className="grid grid-cols-3 gap-4">
        {cars?.map((car, index) => {
          const cardActions: CardActionsProps = {
            allButtons: [
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
          ]};

          const props = {
            company: car.company,
            color: car.color,
            year: car.year,
            price: car.price
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
          onClick={() => { router.push("/pages/loggedIn/addToCluster/cars") }}
          className="m-2 py-1 px-3 bg-blue-400 text-white text-3xl rounded w-1/8 ">
          +
        </button>
      </div>
    </div>
  );
};

export default allCars;
