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
import { postData } from "@/service/api";
import { useRouter } from "next/navigation"
import { MultiSelect } from "./multi-select";

export default function DialogOrganization({ organization, listTag }: { organization?: any, listTag: any[] }) {
    const [emailDto, setEmailDto] = useState({
        displayName: "",
        mail: "",
        password: "",
        id: null,
        tagIdList: [],
        type: "org"
    });

    const { toast } = useToast()
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleApprove = async () => {
        console.log(emailDto);
        
        try {
            await postData(`api/organization/approve/${organization.id}`, emailDto);
            toast({
                title: "Phê duyệt tổ chức và tạo email thành công",
                description: "",
                duration: 3000
            })
        } catch (err: any) {
            toast({
                title: "Phê duyệt thất bại",
                description: <div style={{ whiteSpace: 'pre-line' }}>{err?.message || 'Có lỗi xảy ra'}</div>,
                duration: 3000
            });
        } finally {
            setOpen(false);
            router.refresh();
        }
    };


    return (

        <Dialog onOpenChange={setOpen} open={open}>
            <DialogTrigger asChild>
                <Button>Phê duyệt & Tạo email</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Tạo Email cho tổ chức</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="displayName" className="text-right">
                            Họ và tên
                        </Label>
                        <Input
                            id="displayName"
                            defaultValue={emailDto.displayName}
                            onChange={(e) => setEmailDto({ ...emailDto, displayName: e.target.value })}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="mail" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="mail"
                            defaultValue={emailDto.mail}
                            onChange={(e) => setEmailDto({ ...emailDto, mail: e.target.value })}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                            Mật khẩu
                        </Label>
                        <Input
                            id="password"
                            defaultValue={emailDto.password}
                            onChange={(e) => setEmailDto({ ...emailDto, password: e.target.value })}
                            className="col-span-3"
                            type="password"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                            Mật khẩu
                        </Label>
                        <MultiSelect className="col-span-3"
                            options={listTag.map((item: any) => ({ label: item.name, value: item.id?.toString() ?? "" }))}
                            onValueChange={(values: string[]) =>
                                setEmailDto((prev: any | null) => {
                                    if (!prev) return null;
                                    return {
                                        ...prev,
                                        tagIdList: values.map((value): number => Number(value))
                                    };
                                })
                            }

                            placeholder="Chọn thẻ"
                            variant="inverted"
                            animation={2}
                            maxCount={3}
                        />
                    </div>

                </div>
                <DialogFooter>
                    <Button onClick={handleApprove}>Phê duyệt</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    );
}
