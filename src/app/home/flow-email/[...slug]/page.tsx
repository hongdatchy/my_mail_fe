"use client";

import BreadCrumbArea from "@/components/bread-crumb-area";


import { getData, postData } from "@/service/api";
import TitlePage from "@/components/title-page";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { MultiSelect } from "@/components/multi-select";

import CreateFlowEmailBody from "@/dto/CreateFlowEmailBody";
import { Button } from "@/components/ui/button";
import QuillEditor from "@/components/quill-editor";
import { use } from 'react';
import { toast } from "@/hooks/use-toast";



const FlowEmailCreate = ({ params }: { params: Promise<{ slug: string[] }> }) => {
    const { slug } = use(params);
    const [mode, id] = slug || [];

    const isView = mode === "view";

    const [listTag, setListTag] = useState<any[]>([]);
    const [listEmail, setListEmail] = useState<any[]>([]);
    const [createFlowEmailBody, setCreateFlowEmailBody] = useState<CreateFlowEmailBody | null>(null);
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
        return response.content.map((item: any) => {
            return {
                value: item.id.toString(),
                label: item.mail
            }
        });

    };


    useEffect(() => {
        const fetchListTag = async () => {
            const response = await getData('api/tag');
            setListTag(response);
        };

        const fetchDetailFlowEmail = async () => {
            if (id) {
                const response = await getData(`api/flow-email/${id}`);
                setCreateFlowEmailBody(response);
            } else {
                setCreateFlowEmailBody(
                    {
                        name: "Kỉ niệm 50 nằm, chiến thắng 30/4/1975 giải phóng miền nam, thống nhất đất nước",
                        tagId: "null",
                        flowEmailapproveDtoList: [],
                        startDate: new Date(),
                        startNow: false,
                        content: "",
                        flowEmailFromDtoList: [],
                        flowEmailToDtoList: [],
                    }
                )
            }
        };

        fetchListTag();
        fetchDetailFlowEmail()
    }, []);



    const onclickCreateFlowEmail = async () => {
        await postData('api/flow-email', createFlowEmailBody);
    }

    const onclickApproveFlowEmail = async () => {

        try {
            await postData(`api/flow-email/approve/${id}`, {});
            toast({
                title: "Cập nhật thành công",
                description: "",
            })
        } catch (err: any) {
            console.log(err);

            toast({ title: "Cập nhật thất bại", description: err?.message || 'Có lỗi xảy ra' });
        } finally {

        }
    }

    return <>

        <BreadCrumbArea items={[
            { label: "Luồng Email", href: "/home/flow-email" },
            { label: "Tạo luồng email", href: "/home/flow-email/create" }
        ]} />
        <TitlePage title="Tạo luồng Email" />
        <div className="w-full py-4">
            <Select
                disabled={isView}
                value={createFlowEmailBody?.tagId?.toString() ?? ""}
                onValueChange={(value) => {
                    setCreateFlowEmailBody((prev) => {
                        if (!prev) return prev;

                        return {
                            ...prev,
                            tagId: value
                        };
                    })
                }}
            >
                <SelectTrigger className="w-[180px] mr-4">
                    <SelectValue placeholder="Chọn thẻ" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {createFlowEmailBody?.tagId?.toString() !== "-1" && <SelectItem value="-1">Tất cả</SelectItem>}
                        {listTag.map((item: any) => (
                            <SelectItem key={item.id} value={String(item.id)}>
                                {item.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <div className="flex items-center py-4">
                <div className="flex flex-wrap w-full gap-4 ">

                    <div className="basis-[calc(50%-0.5rem)]">
                        <h1 className="text-2xl font-bold mb-4">Đối tượng gửi</h1>
                        {createFlowEmailBody && <MultiSelect
                            onSearch={fetchListEmail}
                            disabled={isView}
                            options={[]}
                            defaultValue={
                                createFlowEmailBody.flowEmailFromDtoList.map((item) => item.entityId?.toString() ?? "")
                            }
                            onValueChange={(values: string[]) =>
                                setCreateFlowEmailBody((prev) => {
                                    if (!prev) return prev;

                                    return {
                                        ...prev,
                                        flowEmailFromDtoList: values.map((value) => ({
                                            entityId: value,
                                            type: "user",
                                        })),
                                    };
                                })
                            }

                            placeholder="Chọn đối tượng gửi"
                            variant="inverted"
                            animation={2}
                            maxCount={3}
                        />}

                    </div>

                    <div className="basis-[calc(50%-0.5rem)]">
                        <h1 className="text-2xl font-bold mb-4">Đối tượng nhận</h1>
                        {createFlowEmailBody && <MultiSelect
                            onSearch={fetchListEmail}
                            disabled={isView}
                            options={[]}
                            defaultValue={
                                createFlowEmailBody.flowEmailToDtoList.map((item) => item.entityId?.toString() ?? "")
                            }
                            onValueChange={(values: string[]) =>
                                setCreateFlowEmailBody((prev) => {
                                    if (!prev) return prev;

                                    return {
                                        ...prev,
                                        flowEmailToDtoList: values.map((value) => ({
                                            entityId: value,
                                            type: "user",
                                        })),
                                    };
                                })
                            }

                            placeholder="Chọn đối tượng nhận"
                            variant="inverted"
                            animation={2}
                            maxCount={3}
                        />}

                    </div>

                    <div className="basis-[calc(50%-0.5rem)]">
                        <h1 className="text-2xl font-bold mb-4">Đối tượng duyệt</h1>
                        {createFlowEmailBody && <MultiSelect
                            onSearch={fetchListEmail}
                            disabled={isView}
                            options={[]}
                            defaultValue={
                                createFlowEmailBody.flowEmailapproveDtoList.map((item) => item.entityId?.toString() ?? "")
                            }
                            onValueChange={(values: string[]) =>
                                setCreateFlowEmailBody((prev) => {
                                    if (!prev) return prev;

                                    return {
                                        ...prev,
                                        flowEmailapproveDtoList: values.map((value) => ({
                                            entityId: value,
                                            type: "user",
                                        })),
                                    };
                                })
                            }

                            placeholder="Chọn đối tượng duyệt"
                            variant="inverted"
                            animation={2}
                            maxCount={3}
                        />}

                    </div>

                    

                    <div className="flex flex-col">
                    <h1 className="text-2xl font-bold mb-4">Nội dung</h1>
                        {createFlowEmailBody &&
                            <QuillEditor
                                disabled={isView}
                                setCreateFlowEmailBody={setCreateFlowEmailBody}
                                createFlowEmailBody={createFlowEmailBody}
                            />}
                        {isView ?
                            <Button onClick={onclickApproveFlowEmail} className="mt-4 self-start">
                                Duyệt
                            </Button> :
                            <Button onClick={onclickCreateFlowEmail} className="mt-4 self-start">
                                Tạo
                            </Button>}
                    </div>

                </div>
            </div>
        </div>





    </>;
}

export default FlowEmailCreate