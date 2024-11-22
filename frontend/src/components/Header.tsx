"use client";
import Image from "next/image";
import logo from "@/public/logo.png";
import user from "@/public/user.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const pathName = usePathname();
  return (
    <div className=" p-3 flex items-center justify-between h-[8vh] shadow-md bg-white">
      <div className="flex items-center">
        <Image src={logo} width={50} height={50} alt="Logo" />
        <div className="  text-2xl font-semibold tracking-tight ">BankEase</div>
      </div>
      <div className="mr-[50px]">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Image src={user} width={35} height={35} alt="User" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
            <Link href={pathName.includes("admin") ? "/" : "/admin"}>
              <DropdownMenuItem>
                Switch To {pathName.includes("admin") ? "User" : "Admin"}
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default Header;
