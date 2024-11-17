"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      Home
      <br/>
      <button onClick={()=>{router.push(`/pages/login`)}}>login</button>
      <br/>
      new user?
      <br/>
      <button onClick={()=>{router.push(`/pages/signUp`)}}>sign up</button>
      </div>
  );
}
