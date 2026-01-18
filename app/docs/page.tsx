import Link from 'next/link';
import { ArrowRight, Rocket, Layers, ShieldCheck, Terminal } from 'lucide-react';

export default function DocsHomePage() {
  const quickLinks = [
    {
      icon: Rocket,
      title: 'Quickstart',
      description: 'Get up and running with Guardrails in minutes',
      href: '/docs/getting-started/quickstart',
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
      hoverBorder: 'group-hover:border-blue-200',
    },
    {
      icon: Layers,
      title: 'Architecture',
      description: 'Understand how Guardrails works under the hood',
      href: '/docs/introduction/architecture',
      iconColor: 'text-indigo-600',
      iconBg: 'bg-indigo-50',
      hoverBorder: 'group-hover:border-indigo-200',
    },
    {
      icon: ShieldCheck,
      title: 'Security',
      description: 'Learn about security features and best practices',
      href: '/docs/deployment/security',
      iconColor: 'text-teal-600',
      iconBg: 'bg-teal-50',
      hoverBorder: 'group-hover:border-teal-200',
    },
    {
      icon: Terminal,
      title: 'API Reference',
      description: 'Explore the complete API documentation',
      href: '/docs/sdk/overview',
      iconColor: 'text-violet-600',
      iconBg: 'bg-violet-50',
      hoverBorder: 'group-hover:border-violet-200',
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <section className="space-y-4 pt-4">
        <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-5xl font-bold tracking-tight text-transparent">
          Guardrails Documentation
        </h1>
        <p className="max-w-2xl text-lg text-gray-600">
          Learn how to secure, control, and scale production AI systems using Guardrails. From quick
          starts to advanced configurations.
        </p>
      </section>

      {/* Quick Links Grid */}
      <section className="grid gap-6 md:grid-cols-2">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 transition-all hover:shadow-md ${link.hoverBorder}`}
            >
              <div className="relative flex items-start gap-4">
                {/* Icon */}
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${link.iconBg}`}
                >
                  <Icon className={`h-6 w-6 ${link.iconColor}`} />
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                    {link.title}
                    <ArrowRight className="h-4 w-4 text-gray-400 decoration-2 transition-transform group-hover:translate-x-1 group-hover:text-gray-900" />
                  </h3>
                  <p className="text-sm text-gray-600">{link.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </section>

      {/* Getting Started Section */}
      <section className="space-y-4 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-8">
        <h2 className="text-2xl font-bold text-gray-900">Getting Started</h2>
        <p className="text-gray-600">
          New to Guardrails? Follow our step-by-step guide to integrate AI safety into your
          application.
        </p>
        <div className="flex gap-3 pt-2">
          <Link
            href="/docs/getting-started/quickstart"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-gray-900/10 transition-all hover:bg-gray-800 hover:shadow-gray-900/20"
          >
            Start Building
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/docs/introduction/overview"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50"
          >
            Read Overview
          </Link>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Popular Topics</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { title: 'Installation', href: '/docs/getting-started/installation' },
            { title: 'Configuration', href: '/docs/deployment/environment' },
            { title: 'Best Practices', href: '/docs/guardrails/writing-custom' },
            { title: 'Troubleshooting', href: '/docs/api/errors' },
          ].map((topic) => (
            <Link
              key={topic.href}
              href={topic.href}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50"
            >
              {topic.title}
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
