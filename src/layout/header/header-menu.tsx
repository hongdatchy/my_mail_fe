'use client';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';

import * as React from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
// import useTransClientSide from '@/lang/useTransClientSide';
import { getMenuItemsByTran, MenuItem } from './menu-items';
import useTransClientSide from '@/lang/useTransClientSide';

export function HeaderMenu() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = searchParams?.get('locale') || process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE;
  const trans = useTransClientSide();

  const isActive = (item: MenuItem) => {
    const getBaseUrl = (url: string) => url.split('?')[0];
    const isMatching = (href: string) => pathname === getBaseUrl(href);
  
    return isMatching(item.href) || item.subItems.some(subItem => isMatching(subItem.href));
  };
  

  return (
    <>
      <NavigationMenu className="hidden md:block">
        <NavigationMenuList>
          {getMenuItemsByTran(trans, locale).map((item) => (
            <NavigationMenuItem key={item.title}>
              {/* TODO : co thoi gian chuyen thanh Accordion*/}
              {item.subItems.length > 0 && (
                <>
                  <NavigationMenuTrigger>
                    <span className={cn('font-bold', isActive(item) ? 'text-[#27ba77]' : '')}>{item.title}</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {item.subItems.map((subItems) => (
                        <ListItem key={subItems.title} title={subItems.title} href={subItems.href}>
                          {subItems.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              )}
              {item.subItems.length == 0 && (
                <>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      <span className="font-bold">
                        <span className={cn('font-bold', isActive(item) ? 'text-[#27ba77]' : '')}>{item.title}</span>
                      </span>
                    </NavigationMenuLink>
                  </Link>
                </>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}

const ListItem = ({ href, title, children }: { href: string; title: string; children: React.ReactNode }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
          )}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

ListItem.displayName = 'ListItem';
