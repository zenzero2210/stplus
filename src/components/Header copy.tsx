// src/components/layout/Header.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// --- สมมติว่าคอมโพเนนต์เหล่านี้ถูกติดตั้งจาก shadcn/ui ---
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

// --- ไอคอน ---
const HostingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-blue-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 17.25v-.228a4.5 4.5 0 00-.12-1.03l-2.268-9.64a3.375 3.375 0 00-3.285-2.65H8.25a3.375 3.375 0 00-3.285 2.65l-2.268 9.64a4.5 4.5 0 00-.12 1.03v.228m15.562 0a2.25 2.25 0 01-2.25 2.25h-13.125a2.25 2.25 0 01-2.25-2.25m17.625 0h.008v.015h-.008v-.015z"
    />
  </svg>
);
const ServerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-green-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3v-3a3 3 0 013-3h13.5a3 3 0 013 3v3a3 3 0 01-3 3m-13.5 0v-3.375c0-.621.504-1.125 1.125-1.125h11.25c.621 0 1.125.504 1.125 1.125V14.25"
    />
  </svg>
);
const BlogIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-3 text-purple-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3h2m-4 3h2m-4 3h2m-4 3h2"
    />
  </svg>
);
const NewsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-3 text-red-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3h2m-4 3h2m-4 3h2m-4 3h2"
    />
  </svg>
);
const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
    />
  </svg>
);

// --- โครงสร้างข้อมูลเมนู ---
const navItems = [
  { name: "หน้าแรก", href: "/" },
  { name: "เกี่ยวกับเรา", href: "/about" },
  {
    name: "บริการ",
    isMega: true,
    items: [
      {
        title: "Shared Hosting",
        href: "/services/shared-hosting",
        description: "The most affordable way to get your site online.",
        icon: <HostingIcon />,
      },
      {
        title: "WordPress Hosting",
        href: "/services/wordpress-hosting",
        description: "Optimized for speed and security on WordPress.",
        icon: <HostingIcon />,
      },
      {
        title: "VPS Hosting",
        href: "/services/vps-hosting",
        description: "More power and control for growing websites.",
        icon: <HostingIcon />,
      },
      {
        title: "Cloud Servers",
        href: "/services/cloud-servers",
        description: "Scalable resources for demanding applications.",
        icon: <ServerIcon />,
      },
      {
        title: "Dedicated Servers",
        href: "/services/dedicated-servers",
        description: "Ultimate performance and total isolation.",
        icon: <ServerIcon />,
      },
      {
        title: "Backup Servers",
        href: "/services/backup-servers",
        description: "Secure your data with reliable backup solutions.",
        icon: <ServerIcon />,
      },
    ],
  },
  {
    name: "บทความ",
    isMega: false,
    items: [
      {
        title: "บล็อกของเรา",
        href: "/blog",
        description: "บทความ, เทคนิค, และเรื่องราวน่าสนใจจากเรา",
        icon: <BlogIcon />,
      },
      {
        title: "ข่าวสารและอัปเดต",
        href: "/news",
        description: "ติดตามข่าวสารและโปรโมชันล่าสุด",
        icon: <NewsIcon />,
      },
    ],
  },
  { name: "ติดต่อเรา", href: "/contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMobileSubMenu, setOpenMobileSubMenu] = useState<string | null>(
    null
  );
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerClass = isScrolled
    ? "bg-white/95 shadow-lg text-gray-800 backdrop-blur-sm"
    : "bg-white/30 text-gray-800 backdrop-blur-sm border-b border-black/10";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerClass}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <Link href="/">
            <Image
              src="/images/logo/logo-web-2b.svg"
              alt="Your Company Logo"
              width={100}
              height={40}
              priority
            />
          </Link>

          <div className="hidden lg:block">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    {!item.items ? (
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href!}
                          className={navigationMenuTriggerStyle()}
                        >
                          {item.name}
                        </Link>
                      </NavigationMenuLink>
                    ) : (
                      <>
                        <NavigationMenuTrigger>
                          {item.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          {/* แก้ไข #1 และ #2: ปรับ Layout ของ Mega Menu และ Dropdown */}
                          <ul
                            className={`p-4 gap-3 ${
                              item.isMega
                                ? "grid w-screen max-w-5xl grid-cols-4"
                                : "grid w-[300px]"
                            }`}
                          >
                            {item.items.map((component) => (
                              <ListItem
                                key={component.title}
                                title={component.title}
                                href={component.href}
                                icon={component.icon}
                              >
                                {component.description}
                              </ListItem>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center">
            <Link
              href="/quote"
              className="hidden sm:block bg-blue-600 text-white px-5 py-2.5 rounded-md font-semibold text-sm hover:bg-blue-700 transition-colors duration-300"
            >
              Get a Quote
            </Link>
            <div className="lg:hidden ml-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* แก้ไข #3: ยกเครื่อง Mobile Menu ใหม่ทั้งหมด */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg text-black">
          <nav className="flex flex-col px-4 pt-2 pb-4">
            {navItems.map((item) =>
              !item.items ? (
                <Link
                  key={item.name}
                  href={item.href!}
                  className="px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ) : (
                <div key={item.name}>
                  <button
                    onClick={() =>
                      setOpenMobileSubMenu(
                        openMobileSubMenu === item.name ? null : item.name
                      )
                    }
                    className="w-full flex justify-between items-center px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    <span>{item.name}</span>
                    <ChevronDownIcon />
                  </button>
                  {openMobileSubMenu === item.name && (
                    <div className="pl-4 mt-2 space-y-2 border-l-2 border-gray-200">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          className="block p-2 text-sm text-gray-600 hover:text-blue-600"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            )}
            <Link
              href="/quote"
              className="block bg-blue-600 text-white text-center mt-4 mx-3 py-2 rounded-md font-semibold hover:bg-blue-700"
            >
              Get a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          {...props}
        >
          <div className="flex items-center text-sm font-medium leading-none">
            {icon && <div className="mr-2">{icon}</div>}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Header;
