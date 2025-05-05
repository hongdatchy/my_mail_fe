import { TranslationData } from '@/lang/useTransClientSide';

export const getMenuItemsByTran = (trans: TranslationData, locale?: string): MenuItem[] => {
  return [
    {
      title: trans.header.post.title,
      href: '/',
      subItems: [
        {
          title: trans.header.post.subItems.trending.title,
          href: `/trending?locale=${locale}`,
          description: trans.header.post.subItems.trending.description,
        },
        {
          title: trans.header.post.subItems.allPosts.title,
          href: `/?locale=${locale}`,
          description: trans.header.post.subItems.allPosts.description,
        },
      ],
    },
    {
      title: trans.header.categories.title,
      href: `/category?locale=${locale}`,
      subItems: [],
    },
    {
      title: trans.header.author.title,
      href: `/author?locale=${locale}`,
      subItems: [],
    },
  ];
};

type SubMenuItem = {
  title: string;
  href: string;
  description: string;
};

export type MenuItem = {
  title: string;
  href: string;
  subItems: SubMenuItem[];
};
