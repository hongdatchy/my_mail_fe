export default interface FlowEmailBodyDto {
    name: string;
    tagIdList: number[];
    flowEmailapproveDtoList: FlowEmailEntityDto[];
    startDate: string;
    startNow: boolean;
    content: string;
    flowEmailFromDtoList: FlowEmailEntityDto[];
    flowEmailToDtoList: FlowEmailEntityDto[];
}

export interface FlowEmailEntityDto {
    entityId: number;
    email: string;
    type: string;
}