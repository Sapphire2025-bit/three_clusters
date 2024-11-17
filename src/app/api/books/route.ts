import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/lib/db/mongodb";
import Book from "@/app/lib/models/book";


// GET all books or GET book by ID
export async function GET(request: NextRequest) {
    const id = request.nextUrl.searchParams.get('id'); // GET does not have a body

    try {
        await connect();

        if (id) {
            // Fetch car by ID
            const book = await Book.findById(id);
            if (!book) {
                return NextResponse.json("Book not found");
            }
            return NextResponse.json({ message: "Fetched book successfully", data: book });
        } else {
            // Fetch all cars
            const books = await Book.find();
            return NextResponse.json({ message: "Fetched books successfully", data: books });
        }
    } catch (error) {
        return NextResponse.json("Error in fetching posts " + error);
    }
}

//add a new book
export async function POST(request: NextRequest) {
    try {
        await connect();
        const { title, author, price } = await request.json();
        const newBook = new Book({  title, author, price });
        await newBook.save();
        return NextResponse.json({ message: "book created successfully", book: newBook });
    } catch (error) {
        return NextResponse.json("Error in creating book " + error);
    }
}

//update a book
export async function PUT(request: NextRequest) {
    try {
        await connect();
        const id = request.nextUrl.searchParams.get('id');
        const { title, author, price } = await request.json();
        //only put the ones that are defined and not empty
        const updateData = {
            ...(title && {title}),
            ...(author && {author}),
            ...(price && {price}),
        };
        await Book.findByIdAndUpdate(id, updateData);
        return NextResponse.json("book updated successfully");
    } catch (error) {
        return NextResponse.json("Error in updating book " + error);
    }
}

//DELETE a car
export async function DELETE(request: NextRequest) {
    const id = request.nextUrl.searchParams.get('id');

    try {
        await connect();
        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
            return NextResponse.json("book not found");
        }
        return NextResponse.json("book deleted successfully");
    } catch (error) {
        return NextResponse.json("Error deleting book " + error);
    }
}
