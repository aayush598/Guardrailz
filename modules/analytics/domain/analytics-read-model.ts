export interface AnalyticsOverview {
  totalExecutions: number;
  totalPassed: number;
  totalFailed: number;
  avgExecutionTime: number;
  successRate: number;
  changeFromLastPeriod: {
    executions: number;
    successRate: number;
    avgTime: number;
  };
}

export interface HourlyDistribution {
  hour: number;
  executions: number;
}

export interface GuardrailStat {
  guardrailName: string;
  executions: number;
  passed: number;
  failed: number;
}

export interface ProfileStat {
  profileId: string;
  executions: number;
}

export interface AnalyticsReadModel {
  overview: AnalyticsOverview;
  hourlyDistribution: HourlyDistribution[];
  guardrailStats: GuardrailStat[];
  profileStats: ProfileStat[];
  topErrors: string[];
}
