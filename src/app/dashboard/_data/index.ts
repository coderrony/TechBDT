
import { UrlObject } from "url";


export interface SidebarType{ 
  href: UrlObject | string ;
  label:string;
}

export const sidebar_nav_data:SidebarType[] = [

  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/products", label: "Products" },
  { href: "/dashboard/orders", label: "Orders" },
  { href: "/dashboard/users", label: "Users" },
  { href: "/dashboard/category", label: "Category" },
]