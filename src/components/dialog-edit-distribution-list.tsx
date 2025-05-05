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
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { getData, putData } from "@/service/api";
import { useRouter } from "next/navigation"

export default function DialogEditDistributionList({ id }: { id: number }) {
    // const [displayName, setDisplayName] = useState(distributionList.displayName);
    // const [mail, setMail] = useState(distributionList.mail);
    const [distributionListDto, setDistributionListDto] = useState({
        displayName: '',
        mail: ''
    });
    const { toast } = useToast()
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleSave = async () => {
        // try {
        //     await putData(`api/email/${distributionList.id}`, { displayName, mail });
        //     toast({
        //         title: "Cập nhật thành công",
        //         description: "",
        //     })
        // } catch (err: any) {
        //     toast({ title: "Cập nhật thất bại", description: err?.message || 'Có lỗi xảy ra' });
        // } finally {
        //     setOpen(false);
        //     router.refresh();
        // }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getData(`api/distribution-list/${id}`);
                setDistributionListDto(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    return (

        <Dialog onOpenChange={setOpen} open={open}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                    Chỉnh sửa
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa nhóm Email</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="displayName" className="text-right">
                            Tên nhóm
                        </Label>
                        <Input
                            id="displayName"
                            defaultValue={distributionListDto.displayName}
                            // onChange={(e) => setDisplayName(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="mail" className="text-right">
                            EMAIL
                        </Label>
                        <Input
                            id="mail"
                            defaultValue={distributionListDto.mail}
                            // onChange={(e) => setMail(e.target.value)}
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
