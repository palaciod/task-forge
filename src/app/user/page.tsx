"use client";

import React from "react";
import { useRouter } from "next/navigation";
import UserForm from "@/app/components/organisms/Forms/User/UserForm";

const UserPage = () => {
  const router = useRouter();

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create New User</h1>
        <UserForm
          onSuccess={() => {
            router.push("/");
          }}
        />
      </div>
    </div>
  );
}

export default UserPage;