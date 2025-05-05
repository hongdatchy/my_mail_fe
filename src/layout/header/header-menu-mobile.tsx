'use client';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';

import * as React from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Icons } from '../../components/custom/common/icons';
import { getMenuItemsByTran, MenuItem } from './menu-items';
import useTransClientSide from '@/lang/useTransClientSide';
// import useTransClientSide from '@/lang/useTransClientSide';

export function HeaderMenuMobile() {
  const trans = useTransClientSide();
  const searchParams = useSearchParams();
  const locale = searchParams?.get('locale') || process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE;
  const pathname = usePathname();
  const isActive = (item: MenuItem) => {
    const getBaseUrl = (url: string) => url.split('?')[0];
    const isMatching = (href: string) => pathname === getBaseUrl(href);
  
    return isMatching(item.href) || item.subItems.some(subItem => isMatching(subItem.href));
  };
  

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Drawer direction="left" open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild>
        <Button className="block md:hidden" variant="outline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-menu"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full max-w-[300px]">
        <DrawerHeader>
          <DrawerTitle>
            <div className="flex justify-between items-center">
              <span>Menu</span>
              <DrawerClose asChild>{Icons.xClose()}</DrawerClose>
            </div>
          </DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <NavigationMenu className="block md:hidden">
          <NavigationMenuList className="flex-col items-start space-x-0">
            {getMenuItemsByTran(trans, locale).map((item) => (
              <NavigationMenuItem key={item.title}>
                {/* TODO : co thoi gian chuyen thanh Accordion*/}
                {item.subItems.length > 0 && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        <span className={cn('font-bold', isActive(item) ? 'text-[#27ba77]' : '')}>{item.title}</span>
                      </NavigationMenuLink>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="start">
                      {item.subItems.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                          onClick={handleCloseDrawer}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
                {item.subItems.length == 0 && (
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()} onClick={handleCloseDrawer}>
                      <span className={cn('font-bold', isActive(item) ? 'text-[#27ba77]' : '')}>{item.title}</span>
                    </NavigationMenuLink>
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </DrawerContent>
    </Drawer>
  );
}

const ListItem = ({
  href,
  title,
  children,
  onClick,
}: {
  href: string;
  title: string;
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <DropdownMenuItem asChild>
      <Link
        href={href}
        className={cn(
          'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
        )}
        onClick={onClick} // Close drawer when clicked
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
      </Link>
    </DropdownMenuItem>
  );
};

ListItem.displayName = 'ListItem';
