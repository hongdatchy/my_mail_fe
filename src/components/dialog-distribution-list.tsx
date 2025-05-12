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
import { getData, postData, putData } from "@/service/api";
import { useRouter } from "next/navigation"
import { MultiSelect } from "./multi-select";
import { Plus } from "lucide-react";

export default function DialogDistributionList({ id, listTag }: { id?: number, listTag: any[] }) {
    const [listMail, setListMail] = useState<any[]>([]);

    const [distributionListDto, setDistributionListDto] = useState<any>();
    const { toast } = useToast()
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const fetchListEmail = async (keyword: string): Promise<{
        label: string;
        value: string;
        icon?: React.ComponentType<{ className?: string }>;
    }[]> => {
        const response = await postData('api/email/search-directory',
            {
                "keyword": keyword,
                "page": "0",
                "size": "50",
                "type": "user"
            }
        );
        setListMail(() => {
            const combined = [...distributionListDto.emailDtoList, ...response.content];
            const unique = Array.from(new Map(combined.map(item => [item.id, item])).values());
            return unique;
        });

        return response.content.map((item: any) => {
            return {
                value: item.id.toString(),
                label: item.mail
            }
        });

    };

    const handleEdit = async () => {
        try {
            await putData(`api/distribution-list`, distributionListDto);
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
            await postData(`api/distribution-list`, distributionListDto);
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
        async function fetchData() {
            if (id) {
                try {
                    const data = await getData(`api/distribution-list/${id}`);
                    setDistributionListDto(data);
                    setListMail(data.emailDtoList);
                } catch (error) {
                    console.error(error);
                }
            } else {
                setDistributionListDto({
                    mail: "",
                    tagId: null,
                    displayName: "",
                    emailDtoList: []
                })
            }
        }

        fetchData()
    }, []);

    return (

        <Dialog onOpenChange={setOpen} open={open}>
            <DialogTrigger asChild>
                {id ?
                    <Button variant="ghost" className="w-full justify-start">
                        Chỉnh sửa
                    </Button> :
                    <Button variant="destructive">
                        Thêm mới
                        <Plus className="ml-2 h-4 w-4" />
                    </Button>}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>{id ? "Chỉnh sửa nhóm Email" : "Thêm mới nhóm Email"}</DialogTitle>
                </DialogHeader>

                {distributionListDto && <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="displayName" className="text-right">
                            Tên nhóm
                        </Label>
                        <Input
                            id="displayName"
                            defaultValue={distributionListDto.displayName}
                            onChange={(e) =>
                                setDistributionListDto((prev: any) => ({
                                    ...prev,
                                    displayName: e.target.value,
                                }))
                            }
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="mail" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="mail"
                            defaultValue={distributionListDto.mail}
                            onChange={(e) =>
                                setDistributionListDto((prev: any) => ({
                                    ...prev,
                                    mail: e.target.value,
                                }))
                            }
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="mail" className="text-right">
                            Các email trong nhóm
                        </Label>
                        {<MultiSelect
                            modalPopover={true}
                            className="col-span-3"
                            onSearch={fetchListEmail}
                            options={distributionListDto.emailDtoList.map((item: any) => ({ label: item.mail, value: item.id?.toString() ?? "" }))}
                            defaultValue={
                                distributionListDto.emailDtoList.map((item: any) => item.id?.toString() ?? "")
                            }
                            onValueChange={(values: string[]) =>
                                setDistributionListDto((prev: any) => {
                                    if (!prev) return null;
                                    return {
                                        ...prev,
                                        emailDtoList: values.map((value): any => ({
                                            id: Number(value),
                                            mail: listMail.find((item) => item.id == value).mail,
                                            displayName: listMail.find((item) => item.id == value).displayName,
                                        }))
                                    };
                                })
                            }
                            placeholder="Chọn đối tượng gửi"
                            variant="inverted"
                            animation={2}
                            maxCount={3}
                        />}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="password" className="text-right">
                                                Chọn thẻ
                                            </Label>
                                            <MultiSelect className="col-span-3"
                                                options={listTag.map((item: any) => ({ label: item.name, value: item.id?.toString() ?? "" }))}
                                                onValueChange={(values: string[]) =>
                                                    setDistributionListDto((prev: any | null) => {
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
                </div>}

                <DialogFooter>
                    {id ?
                        <Button type="button" onClick={handleEdit}>
                            Lưu
                        </Button> :
                        <Button type="button" onClick={handleAdd}>
                            Thêm mới
                        </Button>}
                </DialogFooter>
            </DialogContent>
        </Dialog>

    );
}
