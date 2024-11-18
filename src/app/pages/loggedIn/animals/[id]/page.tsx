"use client";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import IAnimal from "@/app/types/animalsForSchema";
import ClusterInfo from "@/app/components/ClusterInfo";
import CardActions from "@/app/components/CardActions";
import ButtonFunctionProps from "@/app/types/buttonFunctionProps";

// Fetching function to get all animals
const fetchAnimalById = async (id: string): Promise<IAnimal> => {
  const response = await fetch(`/api/animals?id=${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch animal");
  }

  const data = await response.json();
  return data.data;
};

const AnimalPage = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [age, setAge] = useState(-1);

  const { data: animal, error, isLoading, refetch } = useQuery<IAnimal, Error>({
    queryKey: ['animals', id as string],
    queryFn: () => fetchAnimalById(id as string),
    enabled: !!id,
  });

  useEffect(() => {
    if (animal) {
      setName(animal.name);
      setType(animal.type);
      setAge(animal.age);
    }
  }, [animal]);

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  const goBack = () => {
    router.push(`/pages/loggedIn/animals`);
  };

  const resetChanges = async () => {
    if (animal) {
      setName(animal.name);
      setType(animal.type);
      setAge(animal.age);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = { name, type, age, };

    try {
      const response = await fetch(`/api/animals?id=${id}`, {
        method: "PUT",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("failed to update animal");
      }

      await response.json();
      setIsEditing(false);
      refetch();
    } catch (error) {
      console.error("Error updating animal: ", error);
    }
  };

  //render info when not editing, inputs when editing
  const renderInfoOptions = (animal: IAnimal) => {
    if (isEditing) {
      const inpStyle = "m-2 border-gray-300 border-2 rounded";
      const allButtons: ButtonFunctionProps[] = [
        {
          buttonText: "<- Go Back",
          buttonFunc: goBack,
          buttonColor: "bg-blue-400",
        },
        {
          buttonText: "Reset",
          buttonFunc: resetChanges,
          buttonColor: "bg-purple-400",
        },
      ];
      return (
        <div>
          <h1>Animal update:</h1>
          <form onSubmit={handleSubmit}>
            <label>
              <strong>Name:</strong>
              <input type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inpStyle} />
            </label>
            <label>
              <strong>Type:</strong>
              <input type="text"
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={inpStyle} />
            </label>
            <label>
              <strong>Age:</strong>
              <input type="number"
                name="age"
                step="0.25"
                value={age}
                onChange={(e) => setAge(e.target.value ? parseInt(e.target.value) : -1)}
                className={inpStyle} />
            </label>
            <br />
            <button type="submit" className="bg-green-400 px-4 py-2 text-white rounded-full my-8">Save</button>
          </form>
          <CardActions allButtons={allButtons}/>
        </div>
      );

    } else {
      const allButtons: ButtonFunctionProps[] = [
        {
          buttonText: "<- Go Back",
          buttonFunc: goBack,
          buttonColor: "bg-blue-400",
        },
        {
          buttonText: "Update",
          buttonFunc: () => setIsEditing(true),
          buttonColor: "bg-yellow-400",
        },
      ];
      return (
        <div>
          <h1>Animal:</h1>
          {animal && <ClusterInfo name={animal.name} type={animal.type} age={animal.age} />}
          <CardActions allButtons={allButtons}/>
        </div>
      );
    }
  };

  return (
    <div>
      {animal && renderInfoOptions(animal)}
    </div>
  );
};

export default AnimalPage;