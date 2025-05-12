export default interface SaveUserDto {
    id: number | null;
    username: string;
    password: string;
    mail: string;
    orgId: number | null;
    orgName: string | null;
    tagIdList: number[];
    saveRoleDtoList: SaveRoleDto[];
    saveUserApproveEmailDtoList: SaveUserApproveEmailDto[];
}

export interface SaveRoleDto {
    roleId: number;
    roleName: string;
    actionId: number;
    actionName?: string;
    configData: Record<string, unknown>;
}

export interface SaveUserApproveEmailDto {
    userApproveId: number;
    userSendId: number;
    userSendOrgName: string;
    userSendMail: string;
}