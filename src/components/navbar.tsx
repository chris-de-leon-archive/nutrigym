"use client"

import { MenuIcon } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@nutrigym/components/ui/dropdown-menu"

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <div className="container mx-auto">
      <div className="flex w-full flex-row items-center justify-between md:hidden">
        <div className="flex w-full flex-row items-center gap-x-3">
          <div className="relative aspect-square w-1/12 overflow-clip rounded-full">
            <Image
              className="top-0 left-0 h-full w-full object-cover"
              src="/nutrigym.webp"
              alt="nutrigym-logo"
              fill
            />
          </div>
          <span className="font-bold">NutriGym</span>
        </div>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <MenuIcon onClick={() => setOpen(true)} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link href={"/home"} onClick={() => setOpen(false)}>
                Home
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={"/nutrition"} onClick={() => setOpen(false)}>
                Nutrition
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={"/body"} onClick={() => setOpen(false)}>
                Body
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={"/training"} onClick={() => setOpen(false)}>
                Training
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={"/profile"} onClick={() => setOpen(false)}>
                Profile
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
