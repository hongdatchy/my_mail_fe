'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchKeyword({ keyword, textEnterButton }: { keyword: string, textEnterButton?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paramsString, setParamsString] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(Array.from(searchParams.entries()));

    if (value) {
      params.set('keyword', value);
    } else {
      params.delete('keyword');
    }
    params.set('page', '1');
    if (!textEnterButton) {
      router.push(`?${params.toString()}`);
    } else {
      setParamsString(params.toString());
    }
  };

  const onClick = () => {
    router.push(`?${paramsString}`);
  };

  return (
    <div className="flex items-center space-x-2">
      <Input
        defaultValue={keyword}
        type="text"
        name="keyword"
        placeholder="Tìm kiếm"
        className="max-w-sm"
        onChange={handleInputChange}
      />
      {textEnterButton && (
        <Button
          variant="outline"
          onClick={onClick}
          className="w-[170px] bg-black text-white hover:bg-[#8B0000] flex items-center gap-2"
        >
          {textEnterButton}
          <Search size={16} />
        </Button>
      )}
    </div>
  );
}
