import { getUsageStats } from '../queries/usage.query';
import { AnalyticsQuery } from '../domain/analytics-query';
import { AnalyticsReadModel } from '../domain/analytics-read-model';
import { isGuardrailExecutedEvent } from '../utils/type-guards';

export class AnalyticsQueryService {
  async getDashboardAnalytics(query: AnalyticsQuery): Promise<AnalyticsReadModel> {
    const events = await getUsageStats(query);

    const guardrailEvents = events.filter(isGuardrailExecutedEvent);

    const totalExecutions = guardrailEvents.length;
    const totalPassed = guardrailEvents.filter((e) => e.payload.passed).length;
    const totalFailed = totalExecutions - totalPassed;

    const avgExecutionTime =
      totalExecutions === 0
        ? 0
        : Math.round(
            guardrailEvents.reduce((sum, e) => sum + e.payload.executionTimeMs, 0) /
              totalExecutions,
          );

    return {
      overview: {
        totalExecutions,
        totalPassed,
        totalFailed,
        avgExecutionTime,
        successRate: totalExecutions === 0 ? 0 : (totalPassed / totalExecutions) * 100,
        changeFromLastPeriod: {
          executions: 0,
          successRate: 0,
          avgTime: 0,
        },
      },
      hourlyDistribution: [],
      guardrailStats: [],
      profileStats: [],
      topErrors: [],
    };
  }
}
