import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Printer,
  Download,
  Mail,
  Copy,
  ExternalLink,
  ShieldCheck,
  Building2,
  Phone,
  Calendar,
  CreditCard,
  Sparkles,
  ArrowRight,
  FileText,
} from 'lucide-react';
import { SubscriptionInvoice } from '../types';
import { CURRENCIES } from '../data/pricingData';
import { useLanguage } from '../context/LanguageContext';
import { ConfettiEffect } from './ConfettiEffect';

interface InvoiceReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: SubscriptionInvoice | null;
  onOpenWorkspace?: () => void;
}

export const InvoiceReceiptModal: React.FC<InvoiceReceiptModalProps> = ({
  isOpen,
  onClose,
  invoice,
  onOpenWorkspace,
}) => {
  const { language } = useLanguage();
  const [copiedLink, setCopiedLink] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [confettiTrigger, setConfettiTrigger] = useState<number>(1);

  if (!isOpen || !invoice) return null;

  const currencyConfig = CURRENCIES[invoice.currency] || CURRENCIES['NGN'];

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    const link = `${window.location.origin}/invoices/${invoice.invoiceNumber}`;
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleSendEmail = () => {
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 3500);
  };

  return (
    <div
      id="invoice-receipt-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
    >
      {/* Celebration Confetti when viewing a PAID Receipt */}
      {invoice.status === 'PAID' && (
        <ConfettiEffect key={confettiTrigger} active={true} duration={4000} />
      )}

      <div className="bg-white dark:bg-[#0B132B] rounded-3xl max-w-3xl w-full my-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative flex flex-col max-h-[92vh] overflow-hidden transition-colors">
        {/* Modal Header Actions (Not Printed) */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-[#111C38] shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-slate-900 dark:text-white leading-tight">
                {invoice.status === 'PAID' ? 'Official Payment Receipt' : 'Pro-Forma Tax Invoice'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ref: {invoice.receiptNumber} • {invoice.date}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {invoice.status === 'PAID' && (
              <button
                onClick={() => setConfettiTrigger((c) => c + 1)}
                className="px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-[#070D1E] border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors shadow-xs"
                title="Celebrate with Confetti"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline">Celebrate 🎉</span>
              </button>
            )}

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-[#070D1E] border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors shadow-xs"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Body */}
        <div id="printable-receipt-area" className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-800 dark:text-slate-200 print:p-0 print:m-0 print:text-black">
          {/* Header row: Branding & Invoice Title */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0265DC] to-[#004DB3] flex items-center justify-center text-white font-bold text-lg shadow-sm">
                  N
                </div>
                <div>
                  <span className="font-display font-extrabold text-xl text-[#0B132B] dark:text-white print:text-black">
                    Next<span className="text-[#0265DC]">Soft</span>
                    <span className="text-[#65A30D] dark:text-[#A3E635]">hr</span>
                  </span>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                    Enterprise Cloud Technologies Ltd
                  </div>
                </div>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 space-y-0.5 leading-relaxed">
                <p>Tax Identification Number (TIN): 24891048-0001</p>
                <p>Pan-African Headquarters • MsmeBooks Tech Center</p>
                <p>Hotline: +234 915 848 2622 • billing@nextsofthr.org</p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-2 border shadow-xs bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800">
                ✓ {invoice.status === 'PAID' ? 'PAID & VERIFIED' : 'PENDING PAYMENT'}
              </div>
              <div className="text-base font-extrabold font-display text-slate-900 dark:text-white print:text-black">
                {invoice.invoiceNumber}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 space-y-0.5 mt-1 font-mono">
                <p>Receipt ID: {invoice.receiptNumber}</p>
                <p>Issue Date: {invoice.date}</p>
                <p>Payment Mode: {invoice.gatewayName}</p>
              </div>
            </div>
          </div>

          {/* Billing metadata grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-[#111C38] border border-slate-200/80 dark:border-slate-800 text-xs">
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Billed To (Customer Details):
              </div>
              <div className="font-bold text-sm text-slate-900 dark:text-white print:text-black">
                {invoice.customer.fullName}
              </div>
              <div className="text-slate-700 dark:text-slate-300 font-medium">
                {invoice.customer.companyName}
              </div>
              <div className="text-slate-500 dark:text-slate-400 mt-1">
                <p>{invoice.customer.email}</p>
                <p>{invoice.customer.phone}</p>
                <p>{invoice.customer.country}</p>
                {invoice.customer.taxId && (
                  <p className="font-mono mt-0.5">TIN / VAT: {invoice.customer.taxId}</p>
                )}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Payment Verification:
              </div>
              <div className="space-y-1.5 text-slate-600 dark:text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Gateway Provider:</span>
                  <span className="font-bold text-slate-900 dark:text-white print:text-black">{invoice.gatewayName}</span>
                </div>
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="text-slate-500">Transaction Ref:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">{invoice.paymentReference}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Method:</span>
                  <span>{invoice.paymentMethod}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Billing Term:</span>
                  <span className="capitalize">{invoice.billingCycle} (with 20% annual savings)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200 dark:border-slate-700">
                  <th className="p-3.5 sm:p-4">Item &amp; Description</th>
                  <th className="p-3.5 sm:p-4 text-center">Cycle</th>
                  <th className="p-3.5 sm:p-4 text-right">Price (USD)</th>
                  <th className="p-3.5 sm:p-4 text-right">Amount ({invoice.currency})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {/* Main Plan Row */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-3.5 sm:p-4">
                    <div className="font-bold text-slate-900 dark:text-white print:text-black text-sm">
                      NextSofthr {invoice.planName} Plan
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      Core HR, Multi-Currency Payroll, Time &amp; Attendance, Self-Service Mobile App
                    </div>
                  </td>
                  <td className="p-3.5 sm:p-4 text-center capitalize text-slate-600 dark:text-slate-300">
                    {invoice.billingCycle}
                  </td>
                  <td className="p-3.5 sm:p-4 text-right font-mono text-slate-700 dark:text-slate-300">
                    ${invoice.planPriceUSD.toFixed(2)}
                  </td>
                  <td className="p-3.5 sm:p-4 text-right font-mono font-bold text-slate-900 dark:text-white print:text-black">
                    {currencyConfig.format(invoice.planPriceUSD)}
                  </td>
                </tr>

                {/* Selected Extension Modules */}
                {invoice.selectedAddOns.map((addon) => {
                  const price = invoice.billingCycle === 'yearly' ? addon.yearlyPrice : addon.monthlyPrice;
                  return (
                    <tr key={addon.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="p-3.5 sm:p-4">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 print:text-black">
                          {addon.name} (Add-on Extension)
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          {addon.description}
                        </div>
                      </td>
                      <td className="p-3.5 sm:p-4 text-center capitalize text-slate-600 dark:text-slate-300">
                        {invoice.billingCycle}
                      </td>
                      <td className="p-3.5 sm:p-4 text-right font-mono text-slate-700 dark:text-slate-300">
                        ${price.toFixed(2)}
                      </td>
                      <td className="p-3.5 sm:p-4 text-right font-mono font-semibold text-slate-900 dark:text-white print:text-black">
                        {currencyConfig.format(price)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Calculations Summary Box with 7.5% Exclusive VAT */}
          <div className="flex flex-col sm:flex-row justify-between gap-6 pt-2">
            <div className="sm:max-w-xs text-xs text-slate-500 dark:text-slate-400 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Statutory Compliance Notice</span>
              </div>
              <p className="leading-relaxed">
                This receipt constitutes an official valid tax invoice under standard regional Value Added Tax
                regulations. Tax calculation reflects a statutory 7.5% Exclusive VAT rate.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 font-mono text-[10px] space-y-0.5">
                <p>Exchange Rate Benchmark: 1 USD = {currencyConfig.symbol}{currencyConfig.exchangeRate.toLocaleString()} {invoice.currency}</p>
                <p>Zero cross-border foreign transaction surcharges.</p>
              </div>
            </div>

            <div className="w-full sm:w-80 space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Subtotal (Base Plan + Add-ons):</span>
                <span className="font-mono font-semibold">{currencyConfig.format(invoice.subtotalUSD)}</span>
              </div>

              {invoice.discountAmountUSD > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Promo Discount ({invoice.promoCode || 'PROMO'}):</span>
                  </span>
                  <span className="font-mono font-bold">
                    -{currencyConfig.format(invoice.discountAmountUSD)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-slate-600 dark:text-slate-300 pt-1.5 border-t border-slate-200/80 dark:border-slate-800">
                <span>Net Taxable Amount:</span>
                <span className="font-mono font-semibold">{currencyConfig.format(invoice.taxableSubtotalUSD)}</span>
              </div>

              {/* 7.5% Exclusive VAT Row */}
              <div className="flex justify-between text-slate-800 dark:text-slate-200 font-medium">
                <div className="flex items-center gap-1">
                  <span>Value Added Tax (7.5% Exclusive VAT):</span>
                </div>
                <span className="font-mono font-bold text-slate-900 dark:text-white print:text-black">
                  +{currencyConfig.format(invoice.vatAmountUSD)}
                </span>
              </div>

              {/* Total Row */}
              <div className="flex justify-between text-base font-extrabold text-slate-950 dark:text-white print:text-black pt-3 border-t-2 border-slate-900 dark:border-slate-600">
                <span>Total Amount Paid:</span>
                <div className="text-right font-display">
                  <div className="text-lg sm:text-xl text-[#0265DC] dark:text-[#A3E635]">
                    {invoice.totalFormatted}
                  </div>
                  <div className="text-[11px] font-mono font-normal text-slate-400">
                    ≈ ${invoice.totalUSD.toFixed(2)} USD
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer certification */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Electronically signed &amp; verified by NextSofthr Cloud Billing Ledger.</span>
            </div>
            <div>Support Desk: support@nextsofthr.org</div>
          </div>
        </div>

        {/* Modal Bottom Actions (Not Printed) */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-[#111C38] flex flex-wrap items-center justify-between gap-3 shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <button
              onClick={handleSendEmail}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                emailSent
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-white dark:bg-[#070D1E] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{emailSent ? 'Receipt Emailed!' : 'Email to Customer'}</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-[#070D1E] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Link Copied!' : 'Copy Link'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
            >
              Close
            </button>

            <button
              id="receipt-go-workspace-btn"
              onClick={() => {
                onClose();
                if (onOpenWorkspace) onOpenWorkspace();
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-[#A3E635] hover:bg-[#84CC16] shadow-sm flex items-center gap-1.5 transition-all"
            >
              <span>Access NextSofthr Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
