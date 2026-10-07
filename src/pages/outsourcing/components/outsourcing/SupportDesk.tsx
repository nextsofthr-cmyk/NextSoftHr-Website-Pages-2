import React, { useState } from 'react';
import { 
  Headphones, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Send, 
  MessageSquare, 
  Check, 
  LifeBuoy,
  Plus
} from 'lucide-react';
import { SUPPORT_TICKETS } from '../../data/mockData';
import { SupportTicket } from '../../types';

interface SupportDeskProps {
  onOpenLeadModal: (service?: string) => void;
}

export const SupportDesk: React.FC<SupportDeskProps> = ({ onOpenLeadModal }) => {
  const [tickets, setTickets] = useState<SupportTicket[]>(SUPPORT_TICKETS);
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<SupportTicket['category']>('Payroll Inquiry');
  const [newPriority, setNewPriority] = useState<SupportTicket['priority']>('Medium');

  const ticketStatuses: SupportTicket['status'][] = [
    'New',
    'Assigned',
    'In Progress',
    'Waiting',
    'Resolved',
    'Closed'
  ];

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created: SupportTicket = {
      id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newTitle,
      client: 'Apex Global Logistics Ltd',
      category: newCategory,
      priority: newPriority,
      status: 'New',
      assignedTo: 'NextSofthr Triaging Specialist',
      createdAt: 'Just now',
      slaTarget: '4 hours'
    };

    setTickets([created, ...tickets]);
    setNewTitle('');
    setShowNewTicketModal(false);
  };

  const handleAdvanceStatus = (id: string) => {
    setTickets(prev => prev.map(t => {
      if (t.id !== id) return t;
      const currentIdx = ticketStatuses.indexOf(t.status);
      const nextStatus = ticketStatuses[Math.min(currentIdx + 1, ticketStatuses.length - 1)];
      return { ...t, status: nextStatus };
    }));
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0A1E4A] via-[#0F2D6B] to-[#0A1E4A] text-white pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-lime-400 uppercase tracking-wider">
            <Headphones className="w-3.5 h-3.5" />
            <span>Dedicated Service Desk</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            “Your HR Team Is Never Far Away.”
          </h1>

          <p className="text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Direct access to dedicated human specialists backed by clear SLAs. Submit payroll queries, request contract drafting, or resolve employee concerns with complete transparency.
          </p>
        </div>
      </section>

      {/* Ticket Status Workflow & Live Service Desk */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Operations Desk</span>
              <h3 className="text-2xl font-bold text-slate-900">Live Support Tickets & SLA Tracker</h3>
            </div>

            <button
              onClick={() => setShowNewTicketModal(true)}
              className="px-4 py-2.5 bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Open New Support Ticket</span>
            </button>
          </div>

          {/* Ticket Status Flow Indicator */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 overflow-x-auto">
            <div className="flex items-center gap-2 min-w-[650px] text-xs font-semibold">
              <span className="text-slate-400 uppercase text-[10px] tracking-wider shrink-0 mr-2">Lifecycle:</span>
              {ticketStatuses.map((s, idx) => (
                <div key={s} className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700">
                    {s}
                  </span>
                  {idx < ticketStatuses.length - 1 && <span className="text-slate-300">→</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Tickets List */}
          <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
            {tickets.map(ticket => (
              <div key={ticket.id} className="p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#0F2D6B] bg-blue-50 px-2 py-0.5 rounded">
                      {ticket.id}
                    </span>
                    <span className="font-bold text-sm text-slate-900">{ticket.title}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      ticket.priority === 'Critical' ? 'bg-rose-100 text-rose-800' :
                      ticket.priority === 'High' ? 'bg-amber-100 text-amber-800' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {ticket.priority}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">
                    Category: <strong className="text-slate-800">{ticket.category}</strong> · Assigned: {ticket.assignedTo} · SLA: <strong className="text-emerald-700">{ticket.slaTarget}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-200">
                    {ticket.status}
                  </span>
                  {ticket.status !== 'Closed' && (
                    <button
                      onClick={() => handleAdvanceStatus(ticket.id)}
                      className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 rounded-lg text-xs font-semibold shadow-2xs"
                    >
                      Advance Status
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Ticket Modal */}
      {showNewTicketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-base text-slate-900">Open Outsourcing Support Ticket</h3>
              <button onClick={() => setShowNewTicketModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Subject / Issue Summary *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Request revision of overtime rate calculation"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="Payroll Inquiry">Payroll Inquiry</option>
                    <option value="Statutory Tax">Statutory Tax</option>
                    <option value="Employee Onboarding">Employee Onboarding</option>
                    <option value="Leave Policy">Leave Policy</option>
                    <option value="System Access">System Access</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={e => setNewPriority(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="Low">Low (24hr SLA)</option>
                    <option value="Medium">Medium (8hr SLA)</option>
                    <option value="High">High (4hr SLA)</option>
                    <option value="Critical">Critical (2hr SLA)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewTicketModal(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0F2D6B] text-white font-bold rounded-lg hover:bg-[#0A1E4A]"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
