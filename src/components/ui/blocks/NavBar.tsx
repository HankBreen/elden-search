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
        
        <NavigationMenu viewport={false}>
            <NavigationMenuList>
                <NavigationMenuLink>
                    <Link href="/">Home</Link>
                </NavigationMenuLink>
                <NavigationMenuLink>
                    <Link href="/favorites">Favorites</Link>
                </NavigationMenuLink>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

