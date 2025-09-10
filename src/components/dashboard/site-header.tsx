"use client"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { BreadcrumbComponent } from './breadcrumb-component';

export function SiteHeader() {
  const pathName = usePathname();
  const segments = pathName.split('/').filter(Boolean);

  const labels:Record<string,string> = {
    dashboard: 'dashboard',
    products:'productos',
    categories:'categorias'
  }

  const breadcrumbItems = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join('/')}`;
    return {
      label: labels[segment] || segment,
      href
    };
  });

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <BreadcrumbComponent items={breadcrumbItems}/>
      </div>
    </header>
  )
}
