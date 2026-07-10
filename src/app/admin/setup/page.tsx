"use client";
import { authClient } from "@/lib/auth-client";

export default function Setup() {
  const createAdmin = async () => {
    const { data, error } = await authClient.signUp.email({
      email: "admin@promo2032.com",
      password: "nivelA2026",
      name: "Admin"
    });
    if (error) alert(error.message);
    else alert("Admin created!");
  };

  return (
    <div className="p-20">
      <button onClick={createAdmin} className="bg-white text-black p-4">Create Admin</button>
    </div>
  )
}
