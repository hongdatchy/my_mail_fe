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
import DialogDistributionList from "@/components/dialog-distribution-list";
import DialogAlertDeleteDistributionList from "@/components/dialog-alert-delete-distribution-list";
import { formatDateVi } from "@/lib/utils";


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
    let listTag: any[] = [];
    let data: any[] = [];
    let totalPages = 1;

    const searchParams = await props.searchParams;
    const pageSize: number = Number(searchParams?.pageSize) || 6;
    const page = Number(searchParams?.page) || 1;
    const keyword = searchParams?.keyword || "";
    const tagId = searchParams?.tagId || null;
    const sortBy = searchParams?.sortBy || null;
    const sortAscending = searchParams?.sortAscending || null;


    try {
        listTag = await getData('api/tag');
        const responseSearch = await postData("api/distribution-list/search-directory", {
            keyword,
            sortBy,
            sortAscending,
            tagId,
            page: page - 1,
            size: pageSize,
        });

        data = responseSearch.content;
        totalPages = responseSearch.totalPages;
    } catch (err: any) {
        console.error(err.message);
    }
    

    return <>
        <BreadCrumbArea items={[{ label: "Email công dân", href: "/home/distribution-list" }]} />

        <div className="flex items-center justify-between">
            <TitlePage title="NHÓM EMAIL" />
            <DialogDistributionList listTag={listTag}/>
        </div>
        
        <div className="w-full">
            <div className="flex items-center py-4">
                <SelectTag listTag={listTag} />
                <SearchKeyword keyword={keyword} />
                
            </div>

            <Table className="border-separate border-spacing-y-4" >
                <TableHeader>
                    <TableRow>
                        <TableHeadSort colname="TÊN NHÓM" column="displayName" />
                        <TableHeadSort colname="EMAIL" column="mail" />
                        <TableHeadSort colname="NGÀY TẠO NHÓM" column="createdDate" />
                        {/* <TableHead>THẺ</TableHead> */}
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data && data.length ? (
                        data.map((distributionLists: any) => (
                            <TableRow key={distributionLists.id}>
                                <TableCell className="border-t border-b border-l">{distributionLists.displayName}</TableCell>
                                <TableCell className="border-t border-b">{distributionLists.mail}</TableCell>
                                <TableCell className="border-t border-b">{formatDateVi(distributionLists.createdDate)}</TableCell>
                                {/* <TableCell className="border-t border-b">{getTagNameById(listTag, distributionLists.tagId)}</TableCell> */}
                                <TableCell className="border-t border-b border-r">
                                    <div className="flex justify-end">
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
                                                    <DialogDistributionList id={distributionLists.id} listTag={listTag}/>
                                                </div>
                                                <div>
                                                    <DialogAlertDeleteDistributionList distributionLists={distributionLists} />
                                                </div>
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