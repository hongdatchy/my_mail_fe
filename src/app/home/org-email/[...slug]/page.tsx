"use client";

import BreadCrumbArea from "@/components/bread-crumb-area";


import { getData } from "@/service/api";
import TitlePage from "@/components/title-page";
import { useEffect, useState } from "react";

import FlowEmailBodyDto from "@/dto/FlowEmailBody";
import { Button } from "@/components/ui/button";
import { use } from 'react';
import DialogMail from "@/components/dialog-mail";
import DialogOrganization from "@/components/dialog-organization";



const OrgEmailCreate = ({ params }: { params: Promise<{ slug: string[] }> }) => {
    const { slug } = use(params);
    const [mode, id] = slug || [];
    const isView = mode === "view";
    const [listTag, setListTag] = useState<any[]>([]);

    const [organizationDetail, setOrganizationDetail] = useState<any | null>(null);




    useEffect(() => {
        const fetchListTag = async () => {
            const response = await getData('api/tag');
            setListTag(response);
        };

        const fetchDetailFlowEmail = async () => {
            if (id) {
                const response = await getData(`api/organization/${id}`);
                setOrganizationDetail(response);
            }
        };

        fetchListTag();
        fetchDetailFlowEmail()
    }, []);



    // const onclickCreateFlowEmail = async () => {
    //     try {
    //         await postData('api/flow-email', createFlowEmailBody);
    //         toast({
    //             title: "Tạo thành công",
    //             description: "",
    //             duration: 3000,
    //         })
    //     } catch (err: any) {
    //         console.log(err);

    //         toast({ title: "Tạo thất bại", description: <div style={{ whiteSpace: 'pre-line' }}>{err?.message || 'Có lỗi xảy ra'}</div>, duration: 3000, });

    //     } finally {

    //     }
    // }

    // const onclickApproveFlowEmail = async () => {

    //     try {
    //         await postData(`api/flow-email/approve/${id}`, {});
    //         toast({
    //             title: "Duyệt thành công",
    //             description: "",
    //             duration: 3000,
    //         })
    //     } catch (err: any) {
    //         console.log(err);

    //         toast({ title: "Duyệt thất bại", description: <div style={{ whiteSpace: 'pre-line' }}>{err?.message || 'Có lỗi xảy ra'}</div>, duration: 3000, });
    //     } finally {

    //     }
    // }

    return <>
        <BreadCrumbArea items={[
            { label: "Email công dân", href: "/home/org-email" },
            { label: "Duyệt email tổ chức", href: "/home/org-email/create" }
        ]} />
        <TitlePage title="Duyệt email tổ chức" />
        <div className="w-full py-4">
            <div className="flex items-center py-4">
                <div className="flex flex-wrap w-full gap-4 ">

                    <div className="text-sm whitespace-pre-wrap">
                        {JSON.stringify(organizationDetail, null, 10)}
                    </div>


                    <div className="fixed bottom-4 right-4 flex gap-2">
                        {
                            organizationDetail && organizationDetail.status == "waitting" && (
                                <>
                                    <Button variant="destructive">Từ chối</Button>
                                    <DialogOrganization organization={organizationDetail} listTag={listTag} />
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>





    </>;
}

export default OrgEmailCreate