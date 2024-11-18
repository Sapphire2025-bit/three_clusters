import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/lib/db/mongodb";
import Animal from "@/app/lib/models/animal";


// GET all animals or GET animal by ID
export async function GET(request: NextRequest) {
    const id = request.nextUrl.searchParams.get('id'); // GET does not have a body

    try {
        await connect();

        if (id) {
            // Fetch animal by ID
            const animal = await Animal.findById(id);
            if (!animal) {
                return NextResponse.json("Animal not found");
            }
            return NextResponse.json({ message: "Fetched animal successfully", data: animal });
        } else {
            // Fetch all animals
            const animals = await Animal.find();
            return NextResponse.json({ message: "Fetched animals successfully", data: animals });
        }
    } catch (error) {
        return NextResponse.json("Error in fetching posts " + error);
    }
}

//add a new animal
export async function POST(request: NextRequest) {
    try {
        await connect();
        const { name, type, age } = await request.json();
        const newAnimal = new Animal({ name, type, age });
        await newAnimal.save();
        return NextResponse.json({ message: "animal created successfully", animal: newAnimal });
    } catch (error) {
        return NextResponse.json("Error in creating animal " + error);
    }
}

//update an animal
export async function PUT(request: NextRequest) {
    try {
        await connect();
        const id = request.nextUrl.searchParams.get('id');
        const { name, type, age } = await request.json();
        //only put the ones that are defined and not empty
        const updateData = {
            ...(name && {name}),
            ...(type && {type}),
            ...(age && {age}),
        };
        await Animal.findByIdAndUpdate(id, updateData);
        return NextResponse.json("animal updated successfully");
    } catch (error) {
        return NextResponse.json("Error in updating animal " + error);
    }
}

//DELETE an animal
export async function DELETE(request: NextRequest) {
    const id = request.nextUrl.searchParams.get('id');
    if (!id) {
        return NextResponse.json("ID is required for deletion");
    }

    try {
        await connect();
        const deletedAnimal = await Animal.findByIdAndDelete(id);

        if (!deletedAnimal) {
            return NextResponse.json("animal not found");
        }
        return NextResponse.json("animal deleted successfully");
    } catch (error) {
        return NextResponse.json("Error deleting animal " + error);
    }
}
