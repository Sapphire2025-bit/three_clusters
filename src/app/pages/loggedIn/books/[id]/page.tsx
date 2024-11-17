"use client";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import IBook from "@/app/types/booksForSchema";
import ClusterInfo from "@/app/components/ClusterInfo";
import CardActions from "@/app/components/CardActions";
import ButtonFunctionProps from "@/app/types/buttonFunctionProps";

// Fetching function to get all animals
const fetchBookById = async (id: string): Promise<IBook> => {
  const response = await fetch(`/api/books?id=${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch book");
  }

  const data = await response.json();
  return data.data;
};

const BookPage = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState(0);

  const { data: book, error, isLoading, refetch } = useQuery<IBook, Error>({
    queryKey: ['books', id as string],
    queryFn: () => fetchBookById(id as string),
    enabled: !!id,
  });

  const resetChanges = async () => {
    console.log("reset changes");
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setPrice(book.price);
    }
  };

  useEffect(() => {
    resetChanges();
  }, [book]);

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  const goBack = () => {
    router.push(`/pages/loggedIn/books`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const updatedData = { title, author, price };

    try {
      const response = await fetch(`/api/books?id=${id}`, {
        method: "PUT",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("failed to update book");
      }

      await response.json();
      setIsEditing(false);
      refetch();
    } catch (error) {
      console.error("Error updating book: ", error);
    }
  };

  //render info when not editing, inputs when editing
  const renderInfoOptions = (book: IBook) => {
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
          <h1>Book update:</h1>
          <form onSubmit={handleSubmit}>
            <label>
              <strong>Title:</strong>
              <input type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={inpStyle} />
            </label>
            <label>
              <strong>Type:</strong>
              <input type="text"
                name="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className={inpStyle} />
            </label>
            <label>
              <strong>Age:</strong>
              <input type="number"
                name="price"
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
          <h1>Book:</h1>
          {book && <ClusterInfo title={book.title} author={book.author} price={book.price} />}
          <CardActions allButtons={allButtons}/>
        </div>
      );
    }
  };

  return (
    <div>
      {book && renderInfoOptions(book)}
    </div>
  );
};

export default BookPage;