import Image from 'next/image';

export default function LanguageMenu({pathname}: {pathname: string}) {
  return (
    <ul id="menu-blogs-language-3" className="menu flex space-x-4 mb-5">
      <li className="mc-blog-us menu-item">
        <a href={`${pathname}?locale=en`} aria-current="page" className="flex items-center space-x-2 text-gray-500">
          <Image
            draggable={false}
            role="img"
            alt="🇺🇸"
            src="https://s.w.org/images/core/emoji/15.0.3/svg/1f1fa-1f1f8.svg"
            width={16}
            height={16}
          />
          <span>English Blog</span>
        </a>
      </li>
      <li className="mc-blog-vn menu-item">
        <a href={`${pathname}?locale=vi`} className="flex items-center space-x-2 text-gray-500 ">
          <Image
            draggable={false}
            role="img"
            alt="🇻🇳"
            src="https://s.w.org/images/core/emoji/15.0.3/svg/1f1fb-1f1f3.svg"
            width={16}
            height={16}
          />
          <span>Vietnamese Blog</span>
        </a>
      </li>
    </ul>
  );
}
