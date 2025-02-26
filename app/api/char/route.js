import char from "@/models/char";
import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";

// export async function POST(request) {
//     const {charName, charType, charBaseAttack} = await request.json();
//     await connectMongoDB();
//     await char.create({charName, charType, charBaseAttack});
//     return NextResponse.json({message: "Char created"}, {status: 201});
// }

export async function GET() {
    await connectMongoDB();
    const chars = await char.find();
    return NextResponse.json({chars});
}