import BreadCrumbArea from "@/components/bread-crumb-area";
import SelectTag from "@/components/select-tag";

import { MoreHorizontal, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import TablePaging from "@/components/table-paging";
import { getData, postData } from "@/service/api";
import SearchKeyword from "@/components/search-keyword";
import TitlePage from "@/components/title-page";
import TableHeadSort from "@/components/table-tab-head-sort";
import DialogEditMail from "@/components/dialog-edit-mail";
import DialogAlertDeleteMail from "@/components/dialog-alert-delete-mail";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import CreateFlowEmailBtn from "@/components/create-flow-email-btn";
import DialogTableApproveFlowEmail from "@/components/dialog-table-approve-flow-email";
import Link from "next/link";

const FlowEmail = async (
    props: {
        searchParams?: Promise<{
            page?: string;
            pageSize?: string;
            keyword?: string;
            tagId?: string;
            sortBy?: string;
            sortAscending?: string;
            // locale?: string;
        }>;
    }
) => {
    const listTag = await getData('api/tag');
    const searchParams = await props.searchParams;
    const pageSize: number = Number(searchParams?.pageSize) || 6;
    const page = Number(searchParams?.page) || 1;
    const keyword = searchParams?.keyword || "";
    const tagId = searchParams?.tagId || null;
    const sortBy = searchParams?.sortBy || null;
    const sortAscending = searchParams?.sortAscending || null;

    const responseSearch = await postData("api/flow-email/search", {
        "keyword": keyword,
        "sortBy": sortBy,
        "sortAscending": sortAscending,
        "tagId": tagId,
        "page": page - 1,
        "size": pageSize,
        "type": "user"
    });
    const data = responseSearch.content;
    const totalPages = responseSearch.totalPages;

    function getTagNameById(listTag: any[], tagId: any) {
        const tag = listTag.find(t => t.id === tagId);
        return tag ? tag.name : '';
    }

    return <>

        <BreadCrumbArea items={[{ label: "Luồng Email", href: "/home/flow-email" }]} />

        <div className="flex items-center justify-between">
            <TitlePage title="Danh sách Luồng Email" />
            <CreateFlowEmailBtn />
        </div>


        <div className="w-full">
            <div className="flex items-center py-4">
                <SelectTag listTag={listTag} />
                <SearchKeyword keyword={keyword} />
            </div>

            <Table className="border-separate border-spacing-y-4" >
                <TableHeader>
                    <TableRow>
                        <TableHeadSort colname="Trạng thái" column="status" />
                        <TableHeadSort colname="Tên luồng email" column="name" />
                        <TableHeadSort colname="Ngày gửi" column="startDate" />
                        <TableHeadSort colname="Thẻ" column="tagId" />
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data && data.length ? (
                        data.map((flowEmail: any) => (
                            <TableRow key={flowEmail.id} className="hover:bg-gray-100">
                                <TableCell className="border-t border-b border-l p-2">
                                    <Link href={`/home/flow-email/view/${flowEmail.id}`} className="block w-full h-full">
                                        {flowEmail.status}
                                    </Link>
                                </TableCell>
                                <TableCell className="border-t border-b p-2">
                                    <Link href={`/home/flow-email/view/${flowEmail.id}`} className="block w-full h-full">
                                        {flowEmail.name}
                                    </Link>
                                </TableCell>
                                <TableCell className="border-t border-b p-2">
                                    <Link href={`/home/flow-email/view/${flowEmail.id}`} className="block w-full h-full">
                                        {flowEmail.startDate}
                                    </Link>
                                </TableCell>
                                <TableCell className="border-t border-b border-r p-2">
                                    <Link href={`/home/flow-email/view/${flowEmail.id}`} className="block w-full h-full">
                                        {getTagNameById(listTag, flowEmail.tagId)}
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={3}
                                className="h-24 text-center"
                            >
                                Không có dữ liệu
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <div className="flex items-center justify-end space-x-2 py-4">
                <TablePaging totalPages={totalPages} page={page} pageSize={pageSize} />
            </div>
        </div>
    </>;
}

export default FlowEmail