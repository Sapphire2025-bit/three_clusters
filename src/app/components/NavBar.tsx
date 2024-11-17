import React from 'react'
import { useRouter } from "next/navigation";

const NavBar = () => {
    const router = useRouter();
    return (
        <div className="flex justify-around bg-blue-200">
            <button onClick={()=>{router.push("/pages/loggedIn/cars")}}>Cars</button>
            <button onClick={()=>{router.push("/pages/loggedIn/books")}}>Books</button>
            <button onClick={()=>{router.push("/pages/loggedIn/animals")}}>Animals</button>
        </div>
    )
}

export default NavBar