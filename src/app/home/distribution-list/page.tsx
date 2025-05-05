import BreadCrumbArea from "@/components/bread-crumb-area";
import SelectTag from "@/components/select-tag";

import { MoreHorizontal } from "lucide-react"

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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import DialogEditMail from "@/components/dialog-edit-mail";
import DialogAlertDeleteMail from "@/components/dialog-alert-delete-mail";
import DialogEditDistributionList from "@/components/dialog-edit-distribution-list";


const DistributionList = async (
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

    const responseSearch = await postData("api/distribution-list/search-directory", {
        "keyword": keyword,
        "sortBy": sortBy,
        "sortAscending": sortAscending,
        "tagId": tagId,
        "page": page - 1,
        "size": pageSize
    });

    const data = responseSearch.content;
    const totalPages = responseSearch.totalPages;
    function getTagNameById(listTag: any[], tagId: any) {
        const tag = listTag.find(t => t.id === tagId);
        return tag ? tag.name : '';
    }

    function formatDateVi(utcString : string) {
        const date = new Date(utcString);
        return new Intl.DateTimeFormat('vi-VN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }).format(date);
      }
      
    return <>
        <BreadCrumbArea items={[{ label: "Email công dân", href: "/home/distribution-list" }]} />

        <TitlePage title="NHÓM EMAIL" />

        <div className="w-full">
            <div className="flex items-center py-4">
                <SelectTag listTag={listTag} />
                <SearchKeyword keyword={keyword} />
            </div>

            <Table className="border-separate border-spacing-y-4" >
                <TableHeader>
                    <TableRow>
                        <TableHeadSort colname="TÊN NHÓM" column="displayName" />
                        <TableHeadSort colname="NGÀY TẠO NHÓM" column="createdDate" />
                        <TableHead>THẺ</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data && data.length ? (
                        data.map((distributionLists: any) => (
                            <TableRow key={distributionLists.id}>
                                <TableCell className="border-t border-b border-l">{distributionLists.displayName}</TableCell>
                                <TableCell className="border-t border-b">{formatDateVi(distributionLists.createdDate)}</TableCell>
                                <TableCell className="border-t border-b">{getTagNameById(listTag, distributionLists.tagId)}</TableCell>
                                <TableCell className="border-t border-b border-r">
                                    <div className="flex justify-end w-full">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent align="end" className="bg-white">
                                                <div>
                                                    <h4 className="font-bold">Actions</h4>
                                                </div>
                                                <div>
                                                    <DialogEditDistributionList id={distributionLists.id} />
                                                </div>
                                                {/* <div>
                                                    <DialogAlertDeleteMail account={distributionLists} />
                                                </div> */}
                                            </PopoverContent>
                                        </Popover>
                                    </div>
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

export default DistributionList