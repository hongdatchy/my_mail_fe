"use client";

import BreadCrumbArea from "@/components/bread-crumb-area";


import { getData, postData, putData } from "@/service/api";
import TitlePage from "@/components/title-page";
import { useEffect, useState } from "react";
import { MultiSelect } from "@/components/multi-select";

import { Button } from "@/components/ui/button";
import { use } from 'react';
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import SaveUserDto from "@/dto/SaveUserDto";
import PermissionTable from "@/components/permission-table";
import ActionDto from "@/dto/ActionDto";
import RoleDto from "@/dto/RoleDto";
import PermissionApproveEmail from "@/components/permission-approve-email";


const ManageAccountCreate = ({ params }: { params: Promise<{ slug: string[] }> }) => {
    const { slug } = use(params);
    const [mode, id] = slug || [];
    const isView = mode === "view";
    const [listTag, setListTag] = useState<any[]>([]);
    const [listAction, setListAction] = useState<ActionDto[]>([]);
    const [listRole, setListRole] = useState<RoleDto[]>([]);
    const [listOrganization, setListOrganization] = useState<any[]>([]);
    const [userDto, setUserDto] = useState<SaveUserDto>(
        {
            id: null,
            username: "",
            password: "",
            mail: "",
            orgId: null,
            orgName: null,
            tagIdList: [],
            saveRoleDtoList: [],
            saveUserApproveEmailDtoList: []
        }
    );

    const fetchListOrganization = async (keyword: string): Promise<{
        label: string;
        value: string;
        icon?: React.ComponentType<{ className?: string }>;
    }[]> => {
        const response = await postData('api/organization/search',
            {
                "keyword": keyword,
                "page": "0",
                "size": "50",
            }
        );

        setListOrganization((prev) => {
            const combined = [...prev, ...response.content];
            const unique = Array.from(new Map(combined.map(item => [item.id, item])).values());
            return unique;
        });


        return response.content.map((item: any) => {
            return {
                value: item.id.toString(),
                label: item.name
            }
        });

    };

    useEffect(() => {
        const fetchListTag = async () => {
            const response = await getData('api/tag');
            setListTag(response);
        };
        const fetchListRole = async () => {
            const response = await getData('api/role');
            setListRole(response);
        };

        const fetchListAction = async () => {
            const response = await getData('api/action');
            setListAction(response);
        };

        const fetchDetailUser = async () => {
            if (id) {
                const response = await getData(`api/user/${id}`);
                setUserDto(response);
            }
        };

        fetchListRole();
        fetchListAction();
        fetchListTag();
        fetchDetailUser()
    }, []);

    const onclickCreateUser = async () => {
        try {
            await postData('api/user', userDto);
            toast({
                title: "Tạo thành công",
                description: "",
                duration: 3000,
            })
        } catch (err: any) {
            console.log(err);
            toast({ title: "Tạo thất bại", description: <div style={{ whiteSpace: 'pre-line' }}>{err?.message || 'Có lỗi xảy ra'}</div>, duration: 3000, });
        } finally { }
    }

    const onclickUpdateUser = async () => {
        try {
            await putData(`api/user`, userDto);
            toast({
                title: "Sửa thành công",
                description: "",
                duration: 3000,
            })
        } catch (err: any) {
            console.log(err);
            toast({ title: "Sửa thất bại", description: <div style={{ whiteSpace: 'pre-line' }}>{err?.message || 'Có lỗi xảy ra'}</div>, duration: 3000, });
        } finally { }
    }

    return <>
        <BreadCrumbArea items={[
            { label: "Quản lý tài khoản", href: "/home/manage-account" },
            { label: "Thêm mới", href: "/home/manage-account/create" }
        ]} />
        <TitlePage title="Tạo tài khoản" />

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-4">
            <div>
                <h1 className="text-xl font-medium mb-1">TÀI KHOẢN</h1>
                <Input
                    disabled={isView}
                    value={userDto.username}
                    onChange={(e) =>
                        setUserDto((prev: SaveUserDto): SaveUserDto => ({
                            ...prev,
                            username: e.target.value,
                        }))
                    }
                />
            </div>
            <div>
                <h1 className="text-xl font-medium mb-1">EMAIL</h1>
                <Input
                    disabled={isView}
                    value={userDto.mail ?? ""}
                    onChange={(e) =>
                        setUserDto((prev: SaveUserDto): SaveUserDto => ({
                            ...prev,
                            mail: e.target.value,
                        }))
                    }
                />

            </div>
            <div>
                <h1 className="text-xl font-medium mb-1">MẬT KHẨU</h1>
                <Input
                    disabled={isView}
                    value={userDto.password ?? ""}
                    onChange={(e) =>
                        setUserDto((prev: SaveUserDto): SaveUserDto => ({
                            ...prev,
                            password: e.target.value,
                        }))
                    }
                />
            </div>
            <div>
                <h1 className="text-xl font-medium mb-1">TÊN TỔ CHỨC</h1>
                <MultiSelect
                    maxSelect={1}
                    onSearch={fetchListOrganization}
                    disabled={isView}
                    options={userDto.orgId ? [{ label: userDto.orgName?.toString() ?? "", value: userDto.orgId?.toString() ?? "" }] : []}
                    defaultValue={userDto.orgId ? [userDto.orgId.toString()] : undefined}
                    onValueChange={
                        (values: string[]) => {
                            setUserDto((prev: SaveUserDto): SaveUserDto => ({
                                ...prev,
                                orgId: values[0] ? Number(values[0]) : null
                            }))
                        }
                    }
                    placeholder="Chọn đối tượng gửi"
                    variant="inverted"
                    maxCount={3}
                />
            </div>
            <div>
                <div>
                    <h1 className="text-xl font-medium mb-1">Chọn thẻ</h1>
                    <MultiSelect
                        disabled={isView}
                        options={listTag.map((item: any) => ({ label: item.name, value: item.id?.toString() ?? "" }))}
                        defaultValue={
                            userDto.tagIdList.map((item) => item?.toString() ?? "")
                        }
                        onValueChange={(values: string[]) =>
                            setUserDto((prev: SaveUserDto): SaveUserDto => ({
                                ...prev,
                                tagIdList: values.map((value): number => Number(value))
                            }))
                        }
                        placeholder="Chọn thẻ"
                        variant="inverted"
                        maxCount={3}
                    />
                </div>
            </div>

            <div className="lg:col-span-4 sm:col-span-2 col-span-1 xl:col-span-5">
                <h1 className="text-xl font-medium mb-4">Quyền</h1>
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {listRole.map((item: RoleDto) =>
                        <div className="col-span-1" key={item.id}>
                            <PermissionTable
                                disabled={isView}
                                defaultValue={userDto.saveRoleDtoList.filter((e) => e.roleId === item.id)}
                                name={item.name}
                                roleId={item.id}
                                actions={listAction}
                                onChange={(updatedList) => {
                                    setUserDto((prev) => ({
                                        ...prev,
                                        saveRoleDtoList: [
                                            ...prev.saveRoleDtoList.filter(r => r.roleId !== item.id),
                                            ...updatedList
                                        ],
                                    }));
                                }}

                            />
                        </div>
                    )}
                    <div className="col-span-1">
                        <PermissionApproveEmail
                            saveUserApproveEmailDtoList={userDto.saveUserApproveEmailDtoList}
                            disabled={isView}
                            onChange={(data: string[]) => {
                                setUserDto((prev) => ({
                                    ...prev,
                                    saveUserApproveEmailDtoList: data.map((item) => ({
                                        userApproveId: userDto.id ?? 0,
                                        userSendId: Number(item),
                                        userSendOrgName: '',
                                        userSendMail: '',
                                    })),
                                }));
                            }} />

                    </div>
                </div>
            </div>
        </div>
        {
            id ?
                <Button onClick={onclickUpdateUser} className="mt-4 self-start">
                    Cập nhật
                </Button> :
                <Button onClick={onclickCreateUser} className="mt-4 self-start">
                    Tạo
                </Button>
        }
    </>;
}

export default ManageAccountCreate