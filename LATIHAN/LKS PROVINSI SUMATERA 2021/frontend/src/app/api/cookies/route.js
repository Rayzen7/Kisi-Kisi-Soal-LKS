import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token').value;

    if (!token) {
        return NextResponse.json({ message: "token invalid" });
    }

    return NextResponse.json({ token: token });
}