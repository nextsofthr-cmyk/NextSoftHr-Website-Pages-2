/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from '../../components/partner-commission-1/Header';
import { ScheduleViewer } from '../../components/partner-commission-1/ScheduleViewer';
import { CommissionCalculator } from '../../components/partner-commission-1/CommissionCalculator';
import { StatementLedger } from '../../components/partner-commission-1/StatementLedger';
import { LeadRegistry } from '../../components/partner-commission-1/LeadRegistry';
import { DigitalExecution } from '../../components/partner-commission-1/DigitalExecution';
import { DisputeCenter } from '../../components/partner-commission-1/DisputeCenter';
import { SCHEDULE_METADATA } from '../../data/partner-commission-1/scheduleData';
import {
  INITIAL_STATEMENTS,
  INITIAL_LEADS,
  INITIAL_EXECUTION_DATA,
  INITIAL_DISPUTES,
} from '../../data/partner-commission-1/seedData';
import {
  CommissionStatementItem,
  RegisteredLead,
  PartnerExecutionData,
  DisputeRecord,
} from './types';
import { CheckCircle2, ShieldCheck, PhoneCall, Globe, ArrowRight } from 'lucide-react';

export default function PartnerCommission1Page() {
  const [activeTab, setActiveTab] = useState<
    'schedule' | 'calculator' | 'statements' | 'leads' | 'execution' | 'disputes'
  >('schedule');
  const [targetSectionId, setTargetSectionId] = useState<number | null>(null);

  // App State seeded with realistic operational data
  const [statements, setStatements] = useState<CommissionStatementItem[]>(INITIAL_STATEMENTS);
  const [leads, setLeads] = useState<RegisteredLead[]>(INITIAL_LEADS);
  const [executionData, setExecutionData] = useState<PartnerExecutionData>(INITIAL_EXECUTION_DATA);
  const [disputes, setDisputes] = useState<DisputeRecord[]>(INITIAL_DISPUTES);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleJumpToSection = (sectionId: number) => {
    setTargetSectionId(sectionId);
    setActiveTab('schedule');
  };

  const handleAddStatement = (newItem: CommissionStatementItem) => {
    setStatements((prev) => [newItem, ...prev]);
    showToast(`Invoice ${newItem.invoiceNumber} recorded on Partner Ledger.`);
  };

  const handleRegisterLead = (newLead: RegisteredLead) => {
    setLeads((prev) => [newLead, ...prev]);
    showToast(`Lead "${newLead.companyName}" locked under 90-day protection window.`);
  };

  const handleConvertLead = (lead: RegisteredLead, createdStatement: CommissionStatementItem) => {
    // Update lead status
    setLeads((prev) =>
      prev.map((l) =>
        l.id === lead.id ? { ...l, status: 'Converted to Customer', protectionDaysRemaining: 0 } : l
      )
    );
    // Add to statements
    setStatements((prev) => [createdStatement, ...prev]);
    showToast(`Opportunity "${lead.companyName}" successfully converted to customer sale!`);
    setActiveTab('statements');
  };

  const handleUpdateExecution = (data: PartnerExecutionData) => {
    setExecutionData(data);
    showToast('Schedule B Commercial Acceptance signed & cryptographically logged.');
  };

  const handleSubmitDispute = (dispute: DisputeRecord) => {
    setDisputes((prev) => [dispute, ...prev]);
    showToast(`Dispute for ${dispute.invoiceNumber} submitted for Section 40 investigation.`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Top Bar Navigation */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} onPrint={handlePrint} />

      {/* Floating Status Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Active Tab Viewport */}
        {activeTab === 'schedule' && (
          <ScheduleViewer
            onNavigateTab={(tab) => setActiveTab(tab)}
            targetSectionId={targetSectionId}
          />
        )}

        {activeTab === 'calculator' && (
          <CommissionCalculator onJumpToSection={handleJumpToSection} />
        )}

        {activeTab === 'statements' && (
          <StatementLedger
            statements={statements}
            onAddStatement={handleAddStatement}
            onJumpToSection={handleJumpToSection}
          />
        )}

        {activeTab === 'leads' && (
          <LeadRegistry
            leads={leads}
            onRegisterLead={handleRegisterLead}
            onConvertLead={handleConvertLead}
            onJumpToSection={handleJumpToSection}
          />
        )}

        {activeTab === 'execution' && (
          <DigitalExecution
            executionData={executionData}
            onUpdateExecutionData={handleUpdateExecution}
            onJumpToSection={handleJumpToSection}
          />
        )}

        {activeTab === 'disputes' && (
          <DisputeCenter
            disputes={disputes}
            onSubmitDispute={handleSubmitDispute}
            onJumpToSection={handleJumpToSection}
          />
        )}

      </main>

      {/* Corporate B2B Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 text-sm tracking-tight">
                NextSoft<span className="text-blue-600">HR</span>
              </span>
              <span aria-hidden="true">·</span>
              <span>{SCHEDULE_METADATA.subtitle}</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-slate-600">
              <a
                href="https://www.nextsofthr.org"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-600 transition-colors flex items-center gap-1 font-mono"
              >
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                {SCHEDULE_METADATA.website}
              </a>
              <span className="text-slate-300">|</span>
              <a
                href={`tel:${SCHEDULE_METADATA.phone}`}
                className="hover:text-blue-600 transition-colors flex items-center gap-1 font-mono"
              >
                <PhoneCall className="w-3.5 h-3.5 text-slate-400" />
                {SCHEDULE_METADATA.phone}
              </a>
            </div>

            <div className="text-slate-400">
              © 2026 NextSoftHR. All Rights Reserved. Powering People. Driving Businesses.
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
