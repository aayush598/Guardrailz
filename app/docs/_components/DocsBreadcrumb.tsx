'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function DocsBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.replace('/docs', '').split('/').filter(Boolean);

  if (!segments.length) return null;

  return (
    <nav className="mb-4 text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <Link href="/docs" className="hover:text-foreground">
            Docs
          </Link>
        </li>

        {segments.map((segment, idx) => {
          const href = `/docs/${segments.slice(0, idx + 1).join('/')}`;
          const label = segment.replace(/-/g, ' ');

          return (
            <li key={href} className="flex items-center gap-1">
              <span>/</span>
              <Link href={href} className="capitalize hover:text-foreground">
                {label}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
