"use client";

import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"
import { Button } from "./ui/button";
import { deleteData } from "@/service/api";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const DialogAlertDeleteMail = ({ account }: { account: any }) => {
    const [open, setOpen] = useState(false);
    const { toast } = useToast()
    const router = useRouter();

    const handleDelete = async () => {
        try {
            await await deleteData(`api/email/${account.id}`);
            toast({
                title: "Xoá thành công",
                description: "",
            })
        } catch (err: any) {
            toast({ title: "Xoá thất bại", description: err?.message || 'Có lỗi xảy ra' });
        } finally {
            setOpen(false);
            router.refresh();
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                    Xoá
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{`Xoá ${account.mail} ?`}</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setOpen(false)}>Huỷ</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Xoá</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DialogAlertDeleteMail;
