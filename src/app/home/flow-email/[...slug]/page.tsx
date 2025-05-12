"use client";

import BreadCrumbArea from "@/components/bread-crumb-area";


import { getData, postData } from "@/service/api";
import TitlePage from "@/components/title-page";
import { useEffect, useState } from "react";
import { MultiSelect } from "@/components/multi-select";

import FlowEmailBodyDto, { FlowEmailEntityDto } from "@/dto/FlowEmailBody";
import { Button } from "@/components/ui/button";
import QuillEditor from "@/components/quill-editor";
import { use } from 'react';
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { DateTimePicker24h } from "@/components/date-time-picker24h";



const FlowEmailCreate = ({ params }: { params: Promise<{ slug: string[] }> }) => {
    const { slug } = use(params);
    const [mode, id] = slug || [];
    const isView = mode === "view";
    const [listTag, setListTag] = useState<any[]>([]);
    const [listMail, setListMail] = useState<any[]>([]);
    const [createFlowEmailBody, setCreateFlowEmailBody] = useState<FlowEmailBodyDto>({
        name: "",
        tagIdList: [],
        flowEmailapproveDtoList: [],
        startDate: "",
        startNow: true,
        content: "",
        flowEmailFromDtoList: [],
        flowEmailToDtoList: [],
    });

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

        setListMail((prev) => {
            const combined = [...prev, ...response.content];
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


    useEffect(() => {
        const fetchListTag = async () => {
            const response = await getData('api/tag');
            setListTag(response);
        };

        const fetchDetailFlowEmail = async () => {
            if (id) {
                const response = await getData(`api/flow-email/${id}`);
                setCreateFlowEmailBody(response);
                setListMail([...response.flowEmailapproveDtoList, ...response.flowEmailFromDtoList, ...response.flowEmailToDtoList].map((item: any) => {
                    return {
                        id: item.entityId,
                        email: item.mail
                    }
                }));

            }
        };

        fetchListTag();
        fetchDetailFlowEmail()
    }, []);



    const onclickCreateFlowEmail = async () => {
        try {
            await postData('api/flow-email', createFlowEmailBody);
            toast({
                title: "Tạo thành công",
                description: "",
                duration: 3000,
            })
        } catch (err: any) {
            console.log(err);

            toast({ title: "Tạo thất bại", description: <div style={{ whiteSpace: 'pre-line' }}>{err?.message || 'Có lỗi xảy ra'}</div>, duration: 3000, });

        } finally {

        }
    }

    const onclickApproveFlowEmail = async () => {

        try {
            await postData(`api/flow-email/approve/${id}`, {});
            toast({
                title: "Duyệt thành công",
                description: "",
                duration: 3000,
            })
        } catch (err: any) {
            console.log(err);

            toast({ title: "Duyệt thất bại", description: <div style={{ whiteSpace: 'pre-line' }}>{err?.message || 'Có lỗi xảy ra'}</div>, duration: 3000, });
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
            <div className="flex items-center py-4">
                <div className="flex flex-wrap w-full gap-4 ">
                    <div className="w-full">
                        <div className="max-w-[200px]">
                            <h1 className="text-xl font-bold mb-4">Chọn thẻ</h1>
                            {createFlowEmailBody && <MultiSelect
                                disabled={isView}
                                options={listTag.map((item: any) => ({ label: item.name, value: item.id?.toString() ?? "" }))}
                                defaultValue={
                                    createFlowEmailBody.tagIdList.map((item) => item?.toString() ?? "")
                                }
                                onValueChange={(values: string[]) =>
                                    setCreateFlowEmailBody((prev: FlowEmailBodyDto) => {
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
                            />}
                        </div>
                    </div>
                    <div className="basis-[calc(50%-0.5rem)]">
                        <h1 className="text-xl font-bold mb-4">Đối tượng gửi</h1>
                        <MultiSelect
                            onSearch={fetchListEmail}
                            disabled={isView}
                            options={createFlowEmailBody.flowEmailFromDtoList.map((item: FlowEmailEntityDto) => ({ label: item.email, value: item.entityId?.toString() ?? "" }))}
                            defaultValue={
                                createFlowEmailBody.flowEmailFromDtoList.map((item: FlowEmailEntityDto) => item.entityId?.toString() ?? "")
                            }
                            onValueChange={(values: string[]) =>
                                setCreateFlowEmailBody((prev: FlowEmailBodyDto) => {
                                    return {
                                        ...prev,
                                        flowEmailFromDtoList: values.map((value): FlowEmailEntityDto => ({
                                            entityId: Number(value),
                                            type: "user",
                                            email: listMail.find((item) => item.id == value).mail,
                                        })),
                                    };
                                })
                            }

                            placeholder="Chọn đối tượng gửi"
                            variant="inverted"
                            // animation={2}
                            maxCount={3}
                        />

                    </div>

                    <div className="basis-[calc(50%-0.5rem)]">
                        <h1 className="text-xl font-bold mb-4">Đối tượng nhận</h1>
                        <MultiSelect
                            onSearch={fetchListEmail}
                            disabled={isView}
                            options={createFlowEmailBody.flowEmailToDtoList.map((item: FlowEmailEntityDto) => ({ label: item.email, value: item.entityId?.toString() ?? "" }))}
                            defaultValue={
                                createFlowEmailBody.flowEmailToDtoList.map((item) => item.entityId?.toString() ?? "")
                            }
                            onValueChange={(values: string[]) =>
                                setCreateFlowEmailBody((prev: FlowEmailBodyDto) => {
                                    return {
                                        ...prev,
                                        flowEmailToDtoList: values.map((value): FlowEmailEntityDto => ({
                                            entityId: Number(value),
                                            type: "user",
                                            email: listMail.find((item) => item.id == value).mail,
                                        })),
                                    };
                                })
                            }

                            placeholder="Chọn đối tượng nhận"
                            variant="inverted"
                            // animation={2}
                            maxCount={3}
                        />

                    </div>

                    <div className="basis-[calc(50%-0.5rem)]">
                        <h1 className="text-xl font-bold mb-4">Đối tượng duyệt</h1>
                        <MultiSelect
                            onSearch={fetchListEmail}
                            disabled={isView}
                            options={createFlowEmailBody.flowEmailapproveDtoList.map((item: FlowEmailEntityDto) => ({ label: item.email, value: item.entityId?.toString() ?? "" }))}
                            defaultValue={
                                createFlowEmailBody.flowEmailapproveDtoList.map((item) => item.entityId?.toString() ?? "")
                            }
                            onValueChange={(values: string[]) =>
                                setCreateFlowEmailBody((prev: FlowEmailBodyDto) => {
                                    return {
                                        ...prev,
                                        flowEmailapproveDtoList: values.map((value): FlowEmailEntityDto => ({
                                            entityId: Number(value),
                                            type: "user",
                                            email: listMail.find((item) => item.id == value).mail,
                                        })),
                                    };
                                })
                            }

                            placeholder="Chọn đối tượng duyệt"
                            variant="inverted"
                            // animation={2}
                            maxCount={3}
                        />
                    </div>

                    <div className="basis-[calc(100%-0.5rem)]">
                        <h1 className="text-xl font-bold mb-4">Tiêu đề</h1>
                        {createFlowEmailBody &&
                            <Input type="name" placeholder="Tiêu đề"
                                value={createFlowEmailBody.name}
                                onChange={(e) => setCreateFlowEmailBody(
                                    { ...createFlowEmailBody, name: e.target.value })}
                                disabled={isView} className="w-full"
                            />
                        }

                    </div>
                    <div>
                        <h1 className="text-xl font-bold mb-4">Thời gian gửi</h1>
                        {createFlowEmailBody.startNow}
                        {createFlowEmailBody &&
                            <div className="space-y-4">
                                <RadioGroup
                                    disabled={isView}
                                    value={createFlowEmailBody.startNow == true ? "now" : "custom"}
                                    className="flex flex-row space-x-4"
                                    onValueChange={(val) => setCreateFlowEmailBody({ ...createFlowEmailBody, startNow: val == "now" })}
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="now" id="r1" />
                                        <Label htmlFor="r1">Ngay bây giờ</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="custom" id="r2" />
                                        <Label htmlFor="r2">Chọn ngày giờ</Label>
                                    </div>
                                </RadioGroup>

                                {!createFlowEmailBody.startNow && (
                                    <div>
                                        <DateTimePicker24h
                                            disabled={isView}
                                            onChange={(date: Date) => setCreateFlowEmailBody(
                                                { ...createFlowEmailBody, startDate: date.toISOString() })
                                            }
                                            isoString={createFlowEmailBody.startDate}
                                        />
                                    </div>
                                )}
                            </div>
                        }
                    </div>

                    <div className="basis-[calc(100%-0.5rem)]">
                        <h1 className="text-xl font-bold mb-4">Nội dung</h1>
                        {createFlowEmailBody &&
                            <QuillEditor
                                disabled={isView}
                                setCreateFlowEmailBody={setCreateFlowEmailBody}
                                createFlowEmailBody={createFlowEmailBody}
                            />
                        }
                    </div>

                    {id ?
                        <Button onClick={onclickApproveFlowEmail} className="mt-4 self-start">
                            Duyệt
                        </Button> :
                        <Button onClick={onclickCreateFlowEmail} className="mt-4 self-start">
                            Tạo
                        </Button>
                    }
                </div>
            </div>
        </div>





    </>;
}

export default FlowEmailCreate