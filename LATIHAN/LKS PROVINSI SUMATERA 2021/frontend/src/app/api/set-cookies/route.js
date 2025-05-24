import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        const token = body.token;
        const cookiesStore = cookies();
        
        if (!token) {
            return NextResponse.json({ message: "Token is required" }, { status: 400 });
        }

        cookiesStore.set('token', token, {
            path: '/'
        });

        return NextResponse.json({ message: 'token success' });
    } catch (error) {
        return NextResponse.json(
            { message: 'token error' },
            { status: 500 }
        );
    }
}