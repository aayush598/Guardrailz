import { requireAuth } from '@/shared/auth';
import { getAnalytics } from '@/lib/analytics/get-analytics';
import AnalyticsClient from './AnalyticsClient';

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: { range?: string };
}) {
  const { dbUser } = await requireAuth();

  const range = searchParams.range ?? '7d';

  const analytics = await getAnalytics(dbUser.id, range);

  return <AnalyticsClient analytics={analytics} range={range} />;
}
