export interface Settings {
  production: boolean;
  applicationInsights: ApplicationInsightsSettings;
}

export interface ApplicationInsightsSettings {
  instrumentationKey: string;
}
