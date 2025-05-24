import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        const response = await axios.post(`http://localhost:8000/api/v1/auth/logout?token=${token}`);
        
        cookieStore.delete("token");
        return NextResponse.json({ message: response.data.message });
    } catch (error) {
        return NextResponse.json({ message: "Deleted token invalid" });    
    }
}