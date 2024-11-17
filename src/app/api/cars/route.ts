import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/lib/db/mongodb";
import Car from "@/app/lib/models/car";


// GET all cars or GET car by ID
export async function GET(request: NextRequest) {
    const id = request.nextUrl.searchParams.get('id'); // GET does not have a body

    try {
        await connect();

        if (id) {
            // Fetch car by ID
            const car = await Car.findById(id);
            if (!car) {
                return NextResponse.json("Car not found");
            }
            return NextResponse.json({ message: "Fetched car successfully", data: car });
        } else {
            // Fetch all cars
            const cars = await Car.find();
            return NextResponse.json({ message: "Fetched cars successfully", data: cars });
        }
    } catch (error) {
        return NextResponse.json("Error in fetching posts " + error);
    }
}

//add a new car
export async function POST(request: NextRequest) {
    try {
        await connect();
        const { company, color, year, price } = await request.json();
        const newCar = new Car({ company, color, year, price });
        await newCar.save();
        return NextResponse.json({ message: "car created successfully", car: newCar });
    } catch (error) {
        return NextResponse.json("Error in creating car " + error);
    }
}

//update a car
export async function PUT(request: NextRequest) {
    try {
        await connect();
        const id = request.nextUrl.searchParams.get('id');
        const { company, color, year, price } = await request.json();
        //only put the ones that are defined and not empty
        const updateData = {
            ...(company && {company}),
            ...(color && {color}),
            ...(year && {year}),
            ...(price && {price}),
        };
        await Car.findByIdAndUpdate(id, updateData);
        return NextResponse.json("car updated successfully");
    } catch (error) {
        return NextResponse.json("Error in updating car " + error);
    }
}

//DELETE a car
export async function DELETE(request: NextRequest) {
    const id = request.nextUrl.searchParams.get('id');

    try {
        await connect();
        const deletedCar = await Car.findByIdAndDelete(id);

        if (!deletedCar) {
            return NextResponse.json("car not found");
        }
        return NextResponse.json("car deleted successfully");
    } catch (error) {
        return NextResponse.json("Error deleting car " + error);
    }
}
