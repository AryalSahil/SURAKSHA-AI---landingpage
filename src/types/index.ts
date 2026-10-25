export type SupportedLanguage = 'en' | 'hi' | 'as';

export interface ThreatCategory {
  id: string;
  tag: string;
  tagColor: string;
  title: string;
  description: string;
  iconName: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  badge: string;
  iconName: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ScamExample {
  id: string;
  label: string;
  text: string;
  riskLevel: 'HIGH RISK' | 'MEDIUM RISK' | 'CAUTION';
  riskScore: number;
  detectedSigns: string[];
  explanation: string;
  recommendedAction: string;
}
