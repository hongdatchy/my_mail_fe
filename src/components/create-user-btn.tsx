"use client";

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function CreateUserBtn() {
    const router = useRouter();

    return (
        <Button
            variant="destructive"
            onClick={() => router.push("/home/manage-account/create")}
        >
            Tạo tài khoản
            <Plus className="ml-2 h-4 w-4" />
        </Button>
    );
}
