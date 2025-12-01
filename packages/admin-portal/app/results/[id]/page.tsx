'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CreditAnalysisResult } from '@credit-scoring/shared';
import Link from 'next/link';

export default function ResultsPage() {
  const params = useParams();
  const analysisId = params.id as string;

  // In a real app, this would fetch from API/database
  // For now, we'll get it from sessionStorage
  const [analysis, setAnalysis] = useState<CreditAnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get analysis from sessionStorage
    const stored = sessionStorage.getItem(`analysis_${analysisId}`);
    if (stored) {
      setAnalysis(JSON.parse(stored));
    }
    setLoading(false);
  }, [analysisId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Analysis Not Found</h1>
          <p className="text-gray-600 mb-6">The credit analysis could not be loaded.</p>
          <Link href="/" className="text-primary-500 hover:text-primary-600 font-medium">
            ← Go Home
          </Link>
        </div>
      </div>
    );
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'VERY_LOW': return 'text-green-600 bg-green-100';
      case 'LOW': return 'text-green-500 bg-green-50';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-100';
      case 'HIGH': return 'text-orange-600 bg-orange-100';
      case 'VERY_HIGH': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    if (score >= 20) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Credit Analysis Report</h1>
          <p className="text-gray-600">Analysis ID: {analysis.id}</p>
          <p className="text-sm text-gray-500">Generated: {new Date(analysis.timestamp).toLocaleString()}</p>
        </div>

        {/* Approval Status */}
        <div className={`mb-8 p-6 rounded-xl shadow-lg ${analysis.approved ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'}`}>
          <div className="flex items-center gap-4">
            <div className="text-4xl">{analysis.approved ? '✅' : '❌'}</div>
            <div>
              <h2 className={`text-2xl font-bold ${analysis.approved ? 'text-green-900' : 'text-red-900'}`}>
                {analysis.approved ? 'Application Approved' : 'Application Requires Review'}
              </h2>
              <p className={analysis.approved ? 'text-green-700' : 'text-red-700'}>
                {analysis.approved
                  ? `Approved for up to $${analysis.maxLoanAmount.toLocaleString()} at ${analysis.recommendedRate.toFixed(2)}% APR`
                  : 'This application needs manual review before processing'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Credit Score */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Credit Score</h3>
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <svg className="w-48 h-48">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="#e5e7eb"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${analysis.creditScore * 5.53} 553`}
                    strokeLinecap="round"
                    transform="rotate(-90 96 96)"
                    className={getScoreColor(analysis.creditScore)}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <div className={`text-5xl font-bold ${getScoreColor(analysis.creditScore)}`}>
                    {analysis.creditScore}
                  </div>
                  <div className="text-sm text-gray-500">out of 100</div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <span className={`inline-block px-4 py-2 rounded-lg font-semibold ${getRiskColor(analysis.riskLevel)}`}>
                {analysis.riskLevel.replace('_', ' ')} RISK
              </span>
            </div>
          </div>

          {/* Applicant Info */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Applicant Information</h3>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-500">Name</div>
                <div className="font-semibold text-gray-900">{analysis.applicantName}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Email</div>
                <div className="font-semibold text-gray-900">{analysis.applicantEmail}</div>
              </div>
              {analysis.approved && (
                <>
                  <div>
                    <div className="text-sm text-gray-500">Max Loan Amount</div>
                    <div className="font-semibold text-green-600 text-lg">
                      ${analysis.maxLoanAmount.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Recommended Rate</div>
                    <div className="font-semibold text-blue-600 text-lg">
                      {analysis.recommendedRate.toFixed(2)}% APR
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Score Breakdown</h3>
            <div className="space-y-4">
              {Object.entries(analysis.scoreBreakdown).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">{value}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getScoreColor(value).replace('text-', 'bg-')}`}
                      style={{ width: `${value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Credit Flags */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Credit Flags</h3>
            <div className="space-y-3">
              <FlagItem
                label="Blacklisted"
                value={analysis.flags.isBlacklisted}
                icon="🚫"
              />
              <FlagItem
                label="PEP (Politically Exposed)"
                value={analysis.flags.isPEP}
                icon="👤"
              />
              <FlagItem
                label="Sanctions List"
                value={analysis.flags.isInSanctionsList}
                icon="⚠️"
              />
              <FlagItem
                label="Legal Proceedings"
                value={analysis.flags.hasLegalProceedings}
                icon="⚖️"
              />
              <div className="pt-2 border-t border-gray-200">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Total Debt</span>
                  <span className="font-semibold text-gray-900">
                    ${analysis.flags.totalDebt.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Unpaid Debts</span>
                  <span className="font-semibold text-gray-900">
                    {analysis.flags.unpaidDebts}
                  </span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Recent Defaults</span>
                  <span className="font-semibold text-gray-900">
                    {analysis.flags.recentDefaults}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Credit Utilization</span>
                  <span className="font-semibold text-gray-900">
                    {analysis.flags.creditUtilization}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Notes */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Analysis Notes</h3>
          <ul className="space-y-2">
            {analysis.notes.map((note, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-gray-600">{note}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
          >
            ← Back to Home
          </Link>
          <button
            onClick={() => window.print()}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
          >
            🖨️ Print Report
          </button>
        </div>
      </div>
    </div>
  );
}

function FlagItem({ label, value, icon }: { label: string; value: boolean; icon: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span>{icon}</span>
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      <span className={`text-sm font-semibold ${value ? 'text-red-600' : 'text-green-600'}`}>
        {value ? 'YES' : 'NO'}
      </span>
    </div>
  );
}
