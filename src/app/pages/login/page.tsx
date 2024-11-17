"use client";
import React, { useState } from 'react'
import IUser from '@/app/types/usersForSchema';
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

// Fetching function to get all users
const fetchUsers = async (): Promise<IUser[]> => {
  const response = await fetch("/api/users");

  if (!response.ok) {
    throw new Error("Failed to fetch animals");
  }

  const data = await response.json();
  return data.data;
};

const login = () => {
  const router = useRouter();

  const { data: users, error, isLoading, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const [loginError, setLoginError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    //get the form data:
    const name = formData.get("userName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    setLoginError("");

    let errType = "";
    //find the user by email:
    users?.forEach(user => {
      errType = "user not found";
      if (user.email == email) {
        //user found
        //check the password
        if (user.password == password) {
          errType = "";
          router.push(`/pages/loggedIn/cars`);
          return; //is it needed?
        } else {
          errType = "wrong password";
          return;
        }
      }
    });
    setLoginError(errType);
    return;
  };

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <button onClick={() => { router.push("/") }}>Back</button>
      <h1 className="flex content-center">Log in:</h1>
      <form className="flex flex-col content-center" onSubmit={(e) => handleSubmit(e)}>
        <label>
          User Name:
          <input type="text" name="userName" placeholder="user_name" required />
        </label>
        <label>
          Email:
          <input type="email" name="email" placeholder="newuser@example.com" required />
        </label>
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        {loginError && <p className="text-red-500">{loginError}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default login