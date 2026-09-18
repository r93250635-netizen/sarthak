/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Scheme {
  id: string;
  name: string;
  category: string;
  ministry: string;
  description: string;
  benefits: string[];
  eligibility: {
    ageRange?: [number, number];
    gender?: ('Male' | 'Female' | 'All')[];
    states?: string[]; // 'All' for central
    caste?: ('General' | 'OBC' | 'SC' | 'ST' | 'All')[];
    maxIncome?: number;
    occupations?: string[];
    isBPL?: boolean;
  };
  applicationUrl: string;
  tags: string[];
}

export interface DemographicProfile {
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  state: string;
  caste: 'General' | 'OBC' | 'SC' | 'ST';
  annualIncome: number;
  isBPL: boolean;
  occupation: string;
  disability: boolean;
}

export interface MatchResult {
  scheme: Scheme;
  matchScore: number; // 0 to 1
  matchReason: string;
}
