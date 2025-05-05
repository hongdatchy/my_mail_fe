import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { HeaderMenu } from '@/layout/header/header-menu';
import Link from 'next/link';
import { HeaderMenuMobile } from '@/layout/header/header-menu-mobile';

export default function Header({
  locale,
}: {
  locale?:string
}) {

  
  return (
    <>
      <div className="w-full 2xl:px-[250px] px-[20px] flex justify-between min-h-[50px] items-center flex-wrap border-b border-custom-gray sticky top-0 left-0 right-0 z-[49] bg-white">
        {/* <HeaderMenuMobile/>
        <Link href={`/?locale=${locale}`}>
          <Image src="/images/logo.png" alt="Logo" width={96} height={96} priority={true} className="hidden sm:block" />
        </Link>
        <HeaderMenu />
        <Input placeholder="Search" className="w-[150px] sm:w-[400px] md:w-[270px]" /> */}
      </div>
    </>
  );
}
