import BreadCrumbArea from "@/components/bread-crumb-area";
import SelectTag from "@/components/select-tag";


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
import CreateUserBtn from "@/components/create-user-btn";
import Link from "next/link";
import SaveUserDto from "@/dto/SaveUserDto";
import { TagList } from "@/components/tag-list";

const ConfigRoleUser = async (
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
        const responseSearch = await postData("api/user/search", {
            keyword,
            sortBy,
            sortAscending,
            tagId,
            page: page - 1,
            size: pageSize,
            "type": "user"
        });

        data = responseSearch.content;
        totalPages = responseSearch.totalPages;
    } catch (err: any) {
        console.error(err.message);
    }


    return <>

        <BreadCrumbArea items={[{ label: "Quản lý tài khoản", href: "/home/manage-account" }]} />

        <div className="flex items-center justify-between">
            <TitlePage title="QUẢN LÝ TÀI KHOẢN" />
            <CreateUserBtn />
        </div>

        <div className="w-full">
            <div className="flex items-center py-4">
                <SelectTag listTag={listTag} />
                <SearchKeyword keyword={keyword} />
            </div>

            <Table className="border-separate border-spacing-y-4" >
                <TableHeader>
                    <TableRow>
                        <TableHeadSort colname="Mail" column="mail" />
                        <TableHeadSort colname="Username" column="user" />
                        <TableHead>Thẻ</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data && data.length ? (
                        data.map((account: SaveUserDto) => (
                            <TableRow key={account.id}>
                                <TableCell className="border-t border-b border-l">
                                    <Link href={`/home/manage-account/view/${account.id}`} className="block w-full h-full">
                                        {account.mail}
                                    </Link>
                                </TableCell>
                                <TableCell className="border-t border-b">
                                    <Link href={`/home/manage-account/view/${account.id}`} className="block w-full h-full">
                                        {account.username}
                                    </Link>
                                </TableCell>
                                <TableCell className="border-t border-b border-r">
                                    <Link href={`/home/manage-account/view/${account.id}`} className="block w-full h-full">
                                        <TagList tagIdList={account.tagIdList} listTag={listTag} />
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

export default ConfigRoleUser