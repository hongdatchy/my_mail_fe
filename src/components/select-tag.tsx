'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SelectTag({ listTag }: { listTag: any[] }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedTagId = searchParams.get('tagId') || "";

    return (
        <Select
            value={selectedTagId || ""}
            onValueChange={(value) => {
                const params = new URLSearchParams(Array.from(searchParams.entries()));
                if (value === "-1") {
                    params.delete('tagId');
                } else {
                    params.set('tagId', value);
                }
                params.set('page', '1');
                router.push(`?${params.toString()}`);
            }}
        >
            <SelectTrigger className="w-[180px] mr-4">
                <SelectValue placeholder="Chọn thẻ" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {selectedTagId && <SelectItem value="-1">Tất cả</SelectItem>}
                    {listTag.map((item) => (
                        <SelectItem key={item.id} value={String(item.id)}>
                            {item.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
