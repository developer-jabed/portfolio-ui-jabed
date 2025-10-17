"use client";

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Book, User, Folder, Mail, Grid } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface NavMenuProps extends NavigationMenuProps {
  orientation?: "horizontal" | "vertical";
}

export const NavMenu = ({ orientation = "horizontal", ...props }: NavMenuProps) => {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
    { href: "/blogs", label: "Blogs", icon: <Book className="w-5 h-5" /> },
    { href: "/about", label: "About", icon: <User className="w-5 h-5" /> },
    { href: "/projects", label: "Projects", icon: <Folder className="w-5 h-5" /> },
    { href: "/contact", label: "Contact", icon: <Mail className="w-5 h-5" /> },
    { href: "/dashboard", label: "Dashboard", icon: <Grid className="w-5 h-5" /> },
  ];

  const isVertical = orientation === "vertical";

  return (
    <TooltipProvider>
      <NavigationMenu {...props}>
        <NavigationMenuList
          className={`flex ${isVertical ? "flex-col gap-4" : "flex-row gap-6"} font-medium`}
        >
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <NavigationMenuItem key={link.href}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <NavigationMenuLink asChild>
                      <Link
                        href={link.href}
                        className={`relative flex items-center gap-2 px-3 py-2 rounded-md transition-all ${isActive
                            ? "text-pink-400 font-semibold"
                            : "text-gray-300 hover:text-pink-400"
                          }`}
                      >
                        <span className="flex items-center gap-2">
                          {link.icon}
                          <span className={`${isVertical ? "text-lg" : ""}`}>{link.label}</span>
                        </span>

                        {/* Active underline */}
                        {!isVertical && (
                          <motion.span
                            layoutId="nav-underline"
                            className="absolute left-0 bottom-0 h-0.5 bg-pink-400 rounded-full"
                            animate={{ width: isActive ? "100%" : "0%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </Link>
                    </NavigationMenuLink>
                  </TooltipTrigger>
                  {!isVertical && (
                    <TooltipContent side="bottom">
                      <p>{link.label}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </TooltipProvider>
  );
};
