"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { putData } from "@/service/api";
import { useRouter } from "next/navigation"

export default function DialogTableApproveFlowEmail({ flowEmail }: { flowEmail: any }) {
    const [displayName, setDisplayName] = useState(flowEmail.displayName);
    const [mail, setMail] = useState(flowEmail.mail);
    const { toast } = useToast()
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleSave = async () => {
        try {
            await putData(`api/email/${flowEmail.id}`, { displayName, mail });
            toast({
                title: "Cập nhật thành công",
                description: "",
                duration: 3000
            })
        } catch (err: any) {
            toast({ title: "Cập nhật thất bại", description: <div style={{ whiteSpace: 'pre-line' }}>{err?.message || 'Có lỗi xảy ra'}</div>, duration: 3000 });
        } finally {
            setOpen(false);
            router.refresh();
        }
    };

    return (

        <Dialog onOpenChange={setOpen} open={open}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                    Chỉnh sửa
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa Email</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="displayName" className="text-right">
                            HỌ VÀ TÊN
                        </Label>
                        <Input
                            id="displayName"
                            defaultValue={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="mail" className="text-right">
                            EMAIL
                        </Label>
                        <Input
                            id="mail"
                            defaultValue={mail}
                            onChange={(e) => setMail(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" onClick={handleSave}>
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    );
}
