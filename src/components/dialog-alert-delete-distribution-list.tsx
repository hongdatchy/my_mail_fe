"use client";

import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"
import { Button } from "./ui/button";
import { deleteData } from "@/service/api";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const DialogAlertDeleteDistributionList = ({ distributionLists }: { distributionLists: any }) => {
    const [open, setOpen] = useState(false);
    const { toast } = useToast()
    const router = useRouter();

    const handleDelete = async () => {
        try {
            await await deleteData(`api/distribution-list/${distributionLists.id}`);
            toast({
                title: "Xoá thành công",
                description: "",
                duration: 3000,
            })
        } catch (err: any) {
            if (err.status === 400) {
                toast({
                    title: "Xoá thất bại",
                    description: err.message,
                    duration: 3000,
                });
            } else {
                toast({
                    title: "Xoá thất bại",
                    description:"Có lỗi xảy ra",
                    duration: 3000,
                });
            }
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
                    <AlertDialogTitle>{`Xoá ${distributionLists.mail} ?`}</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setOpen(false)}>Huỷ</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Xoá</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DialogAlertDeleteDistributionList;
