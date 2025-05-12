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
import { postData, putData } from "@/service/api";
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react";
import { MultiSelect } from "./multi-select";

export default function DialogMail({ account, type, listTag }: { account?: any, type: string, listTag: any[] }) {
    const [emailDto, setEmailDto] = useState({
        displayName: "",
        mail: "",
        password: "",
        oldPassword: "",
        id: null,
        tagIdList: []
    });

    const { toast } = useToast()
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const [changePassword, setChangePassword] = useState(false);

    const handleEdit = async () => {
        try {
            await putData(`api/email`,
                {
                    id: emailDto.id,
                    displayName: emailDto.displayName,
                    mail: emailDto.mail
                    , type: type,
                    password: emailDto.password,
                    oldPassword: emailDto.oldPassword,
                    tagIdList: emailDto.tagIdList
                }
            );
            toast({
                title: "Cập nhật thành công",
                description: "",
                duration: 3000
            })
        } catch (err: any) {
            toast({
                title: "Cập nhật thất bại",
                description: <div style={{ whiteSpace: 'pre-line' }}>{err?.message || 'Có lỗi xảy ra'}</div>,
                duration: 3000
            });
        } finally {
            setOpen(false);
            router.refresh();
        }
    };

    const handleAdd = async () => {
        try {
            await postData(`api/email`,
                {
                    displayName: emailDto.displayName, 
                    mail: emailDto.mail, 
                    type: type, 
                    password: emailDto.password,
                    tagIdList: emailDto.tagIdList
                }
            );
            toast({
                title: "Thêm mới thành công",
                description: "",
                duration: 3000
            })
        } catch (err: any) {
            toast({
                title: "Thêm mới thất bại",
                description: <div style={{ whiteSpace: 'pre-line' }}>{err?.message || 'Có lỗi xảy ra'}</div>,
                duration: 3000
            });
        } finally {
            setOpen(false);
            router.refresh();
        }
    };

    useEffect(() => {
        if (account) {
            setEmailDto(account);
        }
    }, [account]);

    return (

        <Dialog onOpenChange={setOpen} open={open}>
            <DialogTrigger asChild>
                {
                    account ?
                        <Button variant="ghost" className="w-full justify-start">
                            Chỉnh sửa
                        </Button>
                        :
                        <Button variant="destructive" className="">
                            Thêm mới
                            <Plus className="ml-2 h-4 w-4" />
                        </Button>

                }

            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>{account ? 'Chỉnh sửa Email' : 'Thêm mới Email'}</DialogTitle>
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
                    {account ? (
                        <>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Đổi mật khẩu</Label>
                                <input
                                    type="checkbox"
                                    checked={changePassword}
                                    onChange={(e) => setChangePassword(e.target.checked)}
                                    className="col-span-3 w-5 h-5"
                                />
                            </div>
                            {changePassword && (
                                <>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="oldPassword" className="text-right">
                                            Mật khẩu cũ
                                        </Label>
                                        <Input
                                            id="oldPassword"
                                            onChange={(e) => setEmailDto({ ...emailDto, oldPassword: e.target.value })}
                                            className="col-span-3"
                                            type="password"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="newPassword" className="text-right">
                                            Mật khẩu mới
                                        </Label>
                                        <Input
                                            id="newPassword"
                                            onChange={(e) => setEmailDto({ ...emailDto, password: e.target.value })}
                                            className="col-span-3"
                                            type="password"
                                        />
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
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
                    )}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                            Chọn thẻ
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
                    {account ? (
                        <Button onClick={handleEdit}>Lưu</Button>
                    ) : (
                        <Button onClick={handleAdd}>Thêm</Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>

    );
}
