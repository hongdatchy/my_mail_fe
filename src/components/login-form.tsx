"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import useUserStore from "@/state-manager/user-store"

export function LoginForm({
    
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const router = useRouter();
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Ngăn reload trang

        // Lấy dữ liệu từ form (hoặc dùng state để bind)
        const formData = new FormData(e.currentTarget);
        const username = formData.get("username");
        const password = formData.get("password");

        console.log("Login with:", { username, password });
        useUserStore.getState().setUser({
            id: "1",
            name: "admin",
            role: "admin",
        });
        router.push("/home");
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="bg-white/80 shadow-xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    name="username"
                                    id="username"
                                    type="text"
                                    // required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot?
                                    </a>
                                </div>
                                <Input id="password" type="password" name="password" />
                            </div>
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
