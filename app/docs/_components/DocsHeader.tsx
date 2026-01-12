interface DocsHeaderProps {
  title: string;
  description?: string;
}

export function DocsHeader({ title, description }: DocsHeaderProps) {
  return (
    <header className="mb-8 space-y-2">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      {description && <p className="max-w-2xl text-base text-muted-foreground">{description}</p>}
    </header>
  );
}
