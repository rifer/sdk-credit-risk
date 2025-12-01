import { NextRequest, NextResponse } from 'next/server';
import {
  CreditAnalysisRequest,
  CreditAnalysisResult,
  CreditRiskLevel,
} from '@credit-scoring/shared';

/**
 * Mock credit scoring algorithm
 * In production, this would integrate with real credit bureaus and scoring systems
 */
function generateMockCreditAnalysis(
  request: CreditAnalysisRequest
): CreditAnalysisResult {
  const { formData } = request;

  // Extract common fields (adjust based on your form schema)
  const amount = parseFloat(formData.amount as string) || 10000;
  const name = (formData.fullName || formData.name || 'Unknown') as string;
  const email = (formData.email || 'unknown@example.com') as string;

  // Generate mock credit score (0-100)
  // In production, this would be calculated by credit bureaus
  const randomBase = Math.random() * 100;
  const creditScore = Math.round(randomBase);

  // Determine risk level based on score
  let riskLevel: CreditRiskLevel;
  if (creditScore >= 80) riskLevel = 'VERY_LOW';
  else if (creditScore >= 60) riskLevel = 'LOW';
  else if (creditScore >= 40) riskLevel = 'MEDIUM';
  else if (creditScore >= 20) riskLevel = 'HIGH';
  else riskLevel = 'VERY_HIGH';

  // Generate mock flags
  const isPEP = Math.random() > 0.95; // 5% chance
  const isInSanctionsList = Math.random() > 0.98; // 2% chance
  const isBlacklisted = creditScore < 30; // Low scores might be blacklisted
  const unpaidDebts = creditScore < 50 ? Math.floor(Math.random() * 3) : 0;
  const totalDebt = creditScore < 60 ? Math.floor(Math.random() * 50000) : Math.floor(Math.random() * 10000);
  const recentDefaults = creditScore < 40 ? Math.floor(Math.random() * 2) : 0;

  // Calculate approval and loan parameters
  const approved = creditScore >= 50 && !isPEP && !isInSanctionsList && !isBlacklisted;
  const maxLoanAmount = approved ? Math.min(amount * 1.5, 50000) : 0;
  const recommendedRate = approved
    ? 3 + (100 - creditScore) * 0.15 // 3% to 18% based on score
    : 0;

  // Generate score breakdown
  const scoreBreakdown = {
    paymentHistory: Math.min(100, creditScore + Math.floor(Math.random() * 20) - 10),
    debtToIncome: Math.min(100, creditScore + Math.floor(Math.random() * 20) - 10),
    creditAge: Math.min(100, creditScore + Math.floor(Math.random() * 20) - 10),
    creditMix: Math.min(100, creditScore + Math.floor(Math.random() * 20) - 10),
    recentInquiries: Math.min(100, creditScore + Math.floor(Math.random() * 20) - 10),
  };

  // Generate analysis notes
  const notes: string[] = [];

  if (approved) {
    notes.push('✅ Application approved based on credit assessment');
    notes.push(`Recommended loan amount: $${maxLoanAmount.toLocaleString()}`);
    notes.push(`Recommended interest rate: ${recommendedRate.toFixed(2)}%`);
  } else {
    notes.push('❌ Application requires manual review');
    if (isBlacklisted) notes.push('⚠️ Applicant is in credit blacklist');
    if (isPEP) notes.push('⚠️ Applicant is a Politically Exposed Person - Enhanced due diligence required');
    if (isInSanctionsList) notes.push('⚠️ Applicant appears in sanctions list - Cannot process');
    if (creditScore < 50) notes.push('⚠️ Credit score below minimum threshold');
    if (unpaidDebts > 0) notes.push(`⚠️ ${unpaidDebts} unpaid debt(s) detected`);
  }

  if (recentDefaults > 0) {
    notes.push(`⚠️ ${recentDefaults} payment default(s) in last 12 months`);
  }

  if (totalDebt > 30000) {
    notes.push(`⚠️ High debt level: $${totalDebt.toLocaleString()}`);
  }

  // Create result
  const result: CreditAnalysisResult = {
    id: `CA-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    applicantName: name,
    applicantEmail: email,
    creditScore,
    riskLevel,
    approved,
    maxLoanAmount,
    recommendedRate,
    flags: {
      isBlacklisted,
      unpaidDebts,
      totalDebt,
      recentDefaults,
      isPEP,
      isInSanctionsList,
      hasLegalProceedings: Math.random() > 0.9,
      creditUtilization: Math.min(100, Math.floor(Math.random() * 100)),
    },
    scoreBreakdown,
    notes,
    submittedData: formData,
  };

  return result;
}

export async function POST(request: NextRequest) {
  try {
    const body: CreditAnalysisRequest = await request.json();

    // Validate request
    if (!body.configId || !body.formData) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Simulate processing delay (like real credit bureau API)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate mock credit analysis
    const analysis = generateMockCreditAnalysis(body);

    return NextResponse.json({
      success: true,
      data: analysis,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process credit analysis',
      },
      { status: 500 }
    );
  }
}
