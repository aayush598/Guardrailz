'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { docsNavigation } from '../_config/navigation';
import clsx from 'clsx';

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 overflow-y-auto border-r border-border px-4 py-6">
      <nav className="space-y-6">
        {docsNavigation.map((section) => (
          <div key={section.section}>
            <h4 className="mb-2 text-sm font-semibold text-muted-foreground">{section.section}</h4>

            <ul className="space-y-1">
              {section.items.map((item) => {
                const href = `/docs/${item.slug}`;
                const active = pathname === href;

                return (
                  <li key={item.slug}>
                    <Link
                      href={href}
                      className={clsx(
                        'block rounded-md px-2 py-1 text-sm transition-colors',
                        active
                          ? 'bg-muted font-medium text-foreground'
                          : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
                      )}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
