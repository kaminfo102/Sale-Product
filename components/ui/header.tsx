"use client"

import { Menu } from "lucide-react";
import { Button } from "./button";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "./navigation-menu";
import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";

const menuItems = [
  { title: "صفحه اصلی", href: "/" },
  { title: "محصولات", href: "/products" },
  { title: "درباره ما", href: "/about" },
  { title: "تماس با ما", href: "/contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-lg shadow-md">
      <div className="container flex h-20 items-center justify-between px-4 md:px-8">
        {/* منو دسکتاپ */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {menuItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink className="px-4 py-2 text-gray-700 hover:text-black transition-all duration-300 ease-in-out">
                    {item.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* لوگو */}
        <Link href="/" className="flex items-center justify-center">
          <Image src="/images/logo.png" alt="لوگو فروشگاه چرتکه" width={80} height={80} className="object-contain transition-transform duration-300 hover:scale-110" />
        </Link>

        {/* شماره تماس و واتساپ */}
        <div className="flex items-center gap-4 text-sm md:text-base">
          <a href="tel:+989123456789" className="text-gray-600 hover:text-black transition-all duration-300">
            📞 9981051422
          </a>
          <a href="https://wa.me/9981051422" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 transition-all duration-300 flex items-center gap-1">
            <FaWhatsapp className="w-5 h-5" /> واتساپ
          </a>
        </div>

        {/* منوی موبایل */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="px-0 text-base hover:bg-transparent focus-visible:ring-0 md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">منو</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col justify-between h-full pb-6">
            <nav className="flex flex-col gap-4 mt-4">
              {menuItems.map((item) => (
                <Link key={item.href} href={item.href} className="block px-4 py-2 text-lg text-gray-700 hover:text-black transition-all duration-300">
                  {item.title}
                </Link>
              ))}
            </nav>
            {/* لوگو و شماره تماس و واتساپ در پایین منو */}
            <div className="flex flex-col items-center gap-4 mt-8 border-t pt-4">
              <Link href="/">
                <Image src="/images/logo.png" alt="لوگو فروشگاه چرتکه" width={60} height={60} className="object-contain" />
              </Link>
              <a href="tel:09981051422" className="text-gray-600 hover:text-black transition-all duration-300">
                📞 9981051422
              </a>
              <a href="https://wa.me/9981051422" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 transition-all duration-300 flex items-center gap-1">
                <FaWhatsapp className="w-5 h-5" /> واتساپ
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
