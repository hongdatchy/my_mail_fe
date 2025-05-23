import BreadCrumbArea from "@/components/bread-crumb-area";


import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import TablePaging from "@/components/table-paging";
import { postData } from "@/service/api";
import SearchKeyword from "@/components/search-keyword";
import TitlePage from "@/components/title-page";
import TableHeadSort from "@/components/table-tab-head-sort";
import CreateFlowEmailBtn from "@/components/create-flow-email-btn";
import Link from "next/link";

const OrgEmail = async (
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

    const searchParams = await props.searchParams;
    const pageSize: number = Number(searchParams?.pageSize) || 6;
    const page = Number(searchParams?.page) || 1;
    const keyword = searchParams?.keyword || "";
    const sortBy = searchParams?.sortBy || null;
    const sortAscending = searchParams?.sortAscending || null;


    let data: any[] = [];
    let totalPages = 1;

    try {
        const responseSearch = await postData("api/organization/search", {
            keyword,
            sortBy,
            sortAscending,
            page: page - 1,
            size: pageSize,
        });

        data = responseSearch.content;
        totalPages = responseSearch.totalPages;
    } catch (err: any) {
        console.error(err.message);
    }

    return <>
        <BreadCrumbArea items={[{ label: "Email công dân", href: "/home/org-email" }]} />

        <div className="flex items-center justify-between">
            <TitlePage title="QUẢN LÝ EMAIL TỔ CHỨC" />
        </div>

        <div className="w-full">
            <div className="flex items-center py-4">
                <SearchKeyword keyword={keyword} textEnterButton="Tìm kiếm" />
            </div>

            <Table className="border-separate border-spacing-y-4" >
                <TableHeader>
                    <TableRow>
                        <TableHeadSort colname="Tên tổ chức" column="name" />
                        <TableHeadSort colname="EMAIL" column="mail" />
                        <TableHeadSort colname="Trạng thái" column="status" />
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data && data.length ? (
                        data.map((organization: any) => (
                            <TableRow key={organization.id}>
                                <TableCell className="border-t border-b border-l">
                                    <Link href={`/home/org-email/view/${organization.id}`} className="block w-full h-full">
                                        {organization.name}
                                    </Link>
                                </TableCell>
                                <TableCell className="border-t border-b">
                                    <Link href={`/home/org-email/view/${organization.id}`} className="block w-full h-full">
                                        {organization.mail}
                                    </Link>
                                </TableCell>
                                <TableCell className="border-t border-b border-r">
                                    <Link href={`/home/org-email/view/${organization.id}`} className="block w-full h-full">
                                        {organization.status}
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

export default OrgEmail