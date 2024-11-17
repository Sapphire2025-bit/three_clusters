"use client";
import IUser from '@/app/types/usersForSchema';
import React, { useState } from 'react'
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

const signUp = () => {
    const router = useRouter();
    const { data: users, error, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
    });

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        //get the form data:
        const name = formData.get("userName") as string;
        const email = formData.get("email") as string;
        const pass1 = formData.get("password1") as string;
        const pass2 = formData.get("password2") as string;

        setNameError("");
        setEmailError("");
        setPasswordError("");

        //validate the name:
        if (name.length < 2) {
            setNameError("name must have at least two characters");
            return;
        }
        // validate the email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError("Invalid email format");
            return;
        }
        users?.forEach(user => {
            if (user.email == email) {
                setEmailError("email already used");
                return;
            }
        });

        //validate the password
        if (!pass1 || !pass2 || pass1 != pass2) {
            setPasswordError("must type the exact same password twice");
            return;
        }
        //add the user
        const newData = { username:name, email, password: pass1 };

        try {
            const response = await fetch(`/api/users`, {
                method: "POST",
                headers: {
                    "content-Type": "application/json",
                },
                body: JSON.stringify(newData),
            });

            if (!response.ok) {
                throw new Error("failed to add a user");
            }

            await response.json();
            router.push(`/pages/loggedIn/cars`);
        } catch (error) {
            console.error("Error adding a user: ", error);
        }

    };

    if (isLoading) return <p>Loading...</p>;
    if (error instanceof Error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <button onClick={() => {router.push("/")}}>Back</button>
            <h1 className="flex content-center">Sign Up:</h1>
            <form className="flex flex-col content-center" onSubmit={(e) => handleSubmit(e)}>
                <label>
                    User Name:
                    <input type="text" name="userName" placeholder="user_name" required />
                    {nameError && <p className="text-red-500">{nameError}</p>}
                </label>
                <label>
                    Email:
                    <input type="email" name="email" placeholder="newuser@example.com" required />
                    {emailError && <p className="text-red-500">{emailError}</p>}
                </label>
                <label>
                    Password:
                    <input type="password" name="password1" required />
                </label>
                <label>
                    Confirm Password:
                    <input type="password" name="password2" required />
                    {passwordError && <p className="text-red-500">{passwordError}</p>}
                </label>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default signUp