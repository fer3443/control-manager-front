import React from 'react'
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  items: {
    label: string;
    href: string;
  }[];
}

export const BreadcrumbComponent = ({ items }: BreadcrumbProps) => {
  return (
   <div className="flex items-center space-x-1 text-sm text-muted-foreground capitalize">
    {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <div key={item.href} className="flex items-center">
            <Link 
              href={item.href}
              className={`hover:text-foreground ${isLast ? 'text-foreground font-medium' : ''}`}
            >
              {item.label}
            </Link>
            {!isLast && (
              <ChevronRight className="h-4 w-4 mx-1" />
            )}
          </div>
        );
      })}
   </div>
  )
}
