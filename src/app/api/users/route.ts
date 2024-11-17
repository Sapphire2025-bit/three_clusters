import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/lib/db/mongodb";
import User from "@/app/lib/models/user";


// GET all users or GET user by ID
export async function GET(request: NextRequest) {
    const id = request.nextUrl.searchParams.get('id'); // GET does not have a body

    try {
        await connect();

        if (id) {
            // Fetch user by ID
            const user = await User.findById(id);
            if (!user) {
                return NextResponse.json("User not found");
            }
            return NextResponse.json({ message: "Fetched user successfully", data: user });
        } else {
            // Fetch all users
            const users = await User.find();
            return NextResponse.json({ message: "Fetched users successfully", data: users });
        }
    } catch (error) {
        return NextResponse.json("Error in fetching posts " + error);
    }
}

//add a new user
export async function POST(request: NextRequest) {
    try {
        await connect();
        const { username, email, password } = await request.json();
        const newUser = new User({ username, email, password });
        await newUser.save();
        return NextResponse.json({ message: "user created successfully", user: newUser });
    } catch (error) {
        return NextResponse.json("Error in creating user " + error);
    }
}

//update a user
export async function PUT(request: NextRequest) {
    try {
        await connect();
        const id = request.nextUrl.searchParams.get('id');
        const { username, email, password } = await request.json();
        //only put the ones that are defined and not empty
        const updateData = {
            ...(username && {username}),
            ...(email && {email}),
            ...(password && {password})
        };
        await User.findByIdAndUpdate(id, updateData);
        return NextResponse.json("user updated successfully");
    } catch (error) {
        return NextResponse.json("Error in updating user " + error);
    }
}

//DELETE a user
export async function DELETE(request: NextRequest) {
    const id = request.nextUrl.searchParams.get('id');

    try {
        await connect();
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return NextResponse.json("User not found");
        }
        return NextResponse.json("User deleted successfully");
    } catch (error) {
        return NextResponse.json("Error deleting user " + error);
    }
}
