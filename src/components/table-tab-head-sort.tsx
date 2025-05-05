'use client';
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { TableHead } from "./ui/table";
import { Button } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";

const TableHeadSort = ({ colname, column }: { colname: string; column: string }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentSortBy = searchParams.get('sortBy');
    const currentSortAsc = searchParams.get('sortAscending');
    const isActive = currentSortBy === column;

    const ASC = "ASC";
    const DESC = "DESC";

    const handleClick = () => {
        const params = new URLSearchParams(Array.from(searchParams.entries()));

        if (!isActive) {
            // Chưa sort → set tăng dần
            params.set('sortBy', column);
            params.set('sortAscending', ASC);
        } else if (currentSortAsc === ASC) {
            // Đang tăng → set giảm
            params.set('sortAscending', DESC);
        } else {
            // Đang giảm → bỏ sort
            params.delete('sortBy');
            params.delete('sortAscending');
        }

        router.push(`?${params.toString()}`);
    };

    return (
        <TableHead>
            <Button variant="ghost" onClick={handleClick}>
                {colname}
                {isActive ? (
                    currentSortAsc === ASC ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />
                ) : (
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                )}
            </Button>
        </TableHead>
    );
};

export default TableHeadSort;
