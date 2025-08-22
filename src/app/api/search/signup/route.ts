// Signup api, will receive email and password
// and will create a user in the database if they do not already exist

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { createClient } from "@/app/utils/supabase/server";

export async function POST(req: Request) {
    const { email, password } = await req.json();
    const supabase = await createClient();

    // query to see if user exists
    const { data: existingUser } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .single();
    
    // check if user already exists
    if (existingUser) {
        return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    // hash password
    const hashPass = await bcrypt.hash(password, 10);

    // insert user
    const { error } = await supabase.from("users").insert([{ email, password: hashPass }]);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}