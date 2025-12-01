/**
 * Credit scoring risk levels
 */
export type CreditRiskLevel = 'VERY_LOW' | 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH';

/**
 * Financial situation status
 */
export type FinancialStatus =
  | 'EMPLOYED'
  | 'SELF_EMPLOYED'
  | 'RETIRED'
  | 'UNEMPLOYED'
  | 'STUDENT';

/**
 * Credit bureau lists and flags
 */
export interface CreditFlags {
  /** Is the person in any credit blacklist */
  isBlacklisted: boolean;

  /** Number of unpaid debts */
  unpaidDebts: number;

  /** Total amount of current debt */
  totalDebt: number;

  /** Payment defaults in last 12 months */
  recentDefaults: number;

  /** Is Politically Exposed Person */
  isPEP: boolean;

  /** Is in sanctions list */
  isInSanctionsList: boolean;

  /** Has active legal proceedings */
  hasLegalProceedings: boolean;

  /** Credit utilization percentage (0-100) */
  creditUtilization: number;
}

/**
 * Credit score breakdown
 */
export interface CreditScoreBreakdown {
  /** Payment history score (0-100) */
  paymentHistory: number;

  /** Debt-to-income ratio score (0-100) */
  debtToIncome: number;

  /** Credit age score (0-100) */
  creditAge: number;

  /** Credit mix score (0-100) */
  creditMix: number;

  /** Recent inquiries score (0-100) */
  recentInquiries: number;
}

/**
 * Credit analysis result
 */
export interface CreditAnalysisResult {
  /** Unique analysis ID */
  id: string;

  /** Timestamp of analysis */
  timestamp: string;

  /** Applicant's name */
  applicantName: string;

  /** Applicant's email */
  applicantEmail: string;

  /** Credit score (0-100, where 100 is safest) */
  creditScore: number;

  /** Risk level assessment */
  riskLevel: CreditRiskLevel;

  /** Approval recommendation */
  approved: boolean;

  /** Maximum recommended loan amount */
  maxLoanAmount: number;

  /** Recommended interest rate (%) */
  recommendedRate: number;

  /** Credit flags and warnings */
  flags: CreditFlags;

  /** Score breakdown by category */
  scoreBreakdown: CreditScoreBreakdown;

  /** Analysis notes and recommendations */
  notes: string[];

  /** Form data submitted */
  submittedData: Record<string, any>;
}

/**
 * Credit analysis request
 */
export interface CreditAnalysisRequest {
  /** Configuration ID used */
  configId: string;

  /** Form data submitted by user */
  formData: Record<string, any>;
}

/**
 * Credit analysis API response
 */
export interface CreditAnalysisResponse {
  success: boolean;
  data?: CreditAnalysisResult;
  error?: string;
}
