"use client"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import Link from "next/link"




export function NavBar() {

    return (
    <nav className="w-full flex items-center justify-between px-4 py-2">
      {/* Left: menu links */}
      <NavigationMenu className="!max-w-none flex justify-start">
        <NavigationMenuList className="flex gap-4">
          <NavigationMenuItem>
            <NavigationMenuLink href="/">Home</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/favorites">Favorites</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Right: login button */}
      <Link href="/login">
        <Button variant="outline">Login</Button>
      </Link>
    </nav>
  );
}

