import { ReactNode } from 'react';
import Header from '@/layout/header';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { headers } from 'next/headers';


interface LayoutProps {
  children: ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const locale = (await headers()).get('locale') || process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE;
  return (
    <>
      
      <Header locale={locale} />
      <SidebarProvider
        className="min-h-[calc(100svh-50px)]"
      >
        <AppSidebar />
        <SidebarTrigger
        />
          <div className='p-4 w-full'>
            {children}
          </div>
          
      </SidebarProvider>

    </>
  );
}
