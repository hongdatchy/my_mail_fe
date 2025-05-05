export default interface CreateFlowEmailBody {
    name: string;
    tagId: string | null;
    flowEmailapproveDtoList: FlowEmailParty[];
    startDate: Date;
    startNow: boolean;
    content: string;
    flowEmailFromDtoList: FlowEmailParty[];
    flowEmailToDtoList: FlowEmailParty[];
}

interface FlowEmailParty {
    entityId: string | null;
    type: string;
}