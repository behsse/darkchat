"use client"

import { LoginButton } from "@/components/AuthButton";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {

  const {data : session} = useSession()

  if(session){
    redirect("/home")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <LoginButton/>
    </main>
  );
}
