import React from 'react';
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetHeader, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button"
import { NavigationMenu, NavigationMenuList, NavigationMenuLink, NavigationMenuItem } from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { Columns2 } from 'lucide-react';
import Link from "next/link";
import Image from "next/image";

// Menu items.
const items = [
    {
      title: "Home",
      url: "/",
    //   icon: House,
    },
    {
      title: "About",
      url: "/about",
    //   icon: CircleUser,
    },
];

const eousIcon = "https://upload-os-bbs.hoyolab.com/upload/2024/07/03/19ebbb332c63caf074b9f469469a5be1_3831186086982316600.png";

const Navbar = () => {
    // TODO: improve performance when changing pages
    // TODO: highlight current page
    return (
        <header className="flex relative z-50 h-20 w-full shrink-0 items-center px-4 md:px-6 bg-boulder-900 backdrop-blur-md">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden">
                        <Columns2 />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <SheetHeader>
                        <SheetTitle>
                            <div className='flex gap-2'>
                                <Image alt="zzz" src={eousIcon} width={30} height={30} />
                                ZZZ Builder Tool
                            </div>
                        </SheetTitle>
                    </SheetHeader>
                    <div className="grid gap-2 py-6">
                        {items.map((item, index) => (
                            <SheetClose asChild key={index}>
                                <Button asChild variant="ghost" className="justify-start text-lg">
                                    <Link href={item.url} className="flex py-2 ">
                                        {/* {item.icon && <item.icon className="h-6 w-6 mr-2" />} */}
                                        {item.title}
                                    </Link>
                                </Button>
                            </SheetClose>
                        ))}
                    </div>
                </SheetContent>
                <SheetFooter />
            </Sheet>
            <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
                <Image alt="zzz" src={eousIcon} width={30} height={30} />
                <span className="sr-only">ZZZ Builder Tool</span>
            </Link>
            <NavigationMenu className="hidden lg:flex">
                <NavigationMenuList>
                    {items.map((item, index) => (
                        <NavigationMenuItem key={index}>
                            <Link
                                href={item.url}
                                passHref
                                legacyBehavior
                                prefetch={false}
                                >
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    {item.title}
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
            {/* TODO: Add Login */}
            {/* <div className="ml-auto flex gap-2">
                <Button variant="outline" disabled>Sign in</Button>
                <Button disabled>Sign Up</Button>
            </div> */}
        </header>
    );
};

export default Navbar;