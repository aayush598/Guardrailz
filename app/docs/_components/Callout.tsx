import clsx from 'clsx';

type CalloutVariant = 'info' | 'warning' | 'success' | 'error';

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
}

const styles: Record<CalloutVariant, string> = {
  info: 'border-blue-500/40 bg-blue-500/5 text-blue-900',
  warning: 'border-yellow-500/40 bg-yellow-500/5 text-yellow-900',
  success: 'border-green-500/40 bg-green-500/5 text-green-900',
  error: 'border-red-500/40 bg-red-500/5 text-red-900',
};

export function Callout({ variant = 'info', title, children }: CalloutProps) {
  return (
    <div className={clsx('my-6 rounded-lg border-l-4 p-4', styles[variant])}>
      {title && <p className="mb-1 font-semibold">{title}</p>}
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}
