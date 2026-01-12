import Link from 'next/link';

export default function DocsHomePage() {
  return (
    <section className="space-y-6">
      <h1 className="text-4xl font-bold tracking-tight">Guardrails Documentation</h1>

      <p className="max-w-2xl text-muted-foreground">
        Learn how to secure, control, and scale production AI systems using Guardrails.
      </p>

      <div className="flex gap-4">
        <Link
          href="/docs/getting-started/quickstart"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Get Started
        </Link>

        <Link
          href="/docs/introduction/architecture"
          className="rounded-md border px-4 py-2 text-sm font-medium"
        >
          Architecture
        </Link>
      </div>
    </section>
  );
}
