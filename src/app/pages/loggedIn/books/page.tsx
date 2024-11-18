"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import IBook from "@/app/types/booksForSchema";
import { useRouter } from "next/navigation";
import CardActionsProps from "@/app/types/cardActionProps";
import Card from "@/app/components/Card";

// Fetching function to get all books
const fetchBooks = async (): Promise<IBook[]> => {
  const response = await fetch("/api/books");

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  const data = await response.json();
  return data.data;
};

const allBooks = () => {
  const router = useRouter();
  const { data: books, error, isLoading, refetch } = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  const showMore = (id: string) => {
    router.push(`/pages/loggedIn/books/${id}`);
  };

  const remove = async (id: string) => {
    try {
      const response = await fetch(`/api/books?id=${id}`, {
        method: "DELETE",
        headers: {
          "content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("failed to delete the book");
      }
      await response.json();
      refetch();
    }
    catch (error) {
      console.error("Error deleting book: ", error);
    }
  };

  return (
    <div>
      <h1>All Books</h1>
      <div className="grid grid-cols-3 gap-4">
        {books?.map((book, index) => {
          const cardActions: CardActionsProps = {
            allButtons: [
            {
              buttonText: "Show More ->",
              buttonFunc: () => showMore(book._id),
              buttonColor: "bg-blue-400"
            },
            {
              buttonText: "Delete",
              buttonFunc: () => remove(book._id),
              buttonColor: "bg-red-400"
            }
          ]};

          const props = {
            title: book.title,
            author: book.author,
            price: book.price
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
          onClick={() => { router.push("/pages/loggedIn/addToCluster/books") }}
          className="m-2 py-1 px-3 bg-blue-400 text-white text-3xl rounded w-1/8 ">
          +
        </button>
      </div>
    </div>
  );
};

export default allBooks;
