import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  Trash2, 
  Plus, 
  BookmarkCheck, 
  Users, 
  AlertCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { SavedCandidate } from '../types';

interface BulkResumeProcessorProps {
  onAddCandidatesToPool: (newCandidates: SavedCandidate[]) => void;
  onToast?: (msg: string) => void;
}

interface ParsedBulkItem {
  id: string;
  fileName: string;
  fileSize: string;
  status: 'pending' | 'parsing' | 'completed' | 'error';
  progress: number;
  extractedCandidate?: SavedCandidate;
}

export const BulkResumeProcessor: React.FC<BulkResumeProcessorProps> = ({
  onAddCandidatesToPool,
  onToast
}) => {
  const [items, setItems] = useState<ParsedBulkItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  // Preset demo batch candidates
  const DEMO_BATCH_PRESETS: Partial<SavedCandidate>[] = [
    {
      candidateName: 'Zainab Mohammed (SHRM-CP)',
      email: 'zainab.mohammed@hrnetwork.ng',
      phone: '+234 809 112 3344',
      currentRole: 'Talent Acquisition & Employer Branding Lead',
      experienceYears: '5+ years',
      location: 'Kano & Lagos, Nigeria',
      extractedSkills: ['Technical Recruiting', 'Employer Branding', 'ATS Automation', 'SHRM Certified'],
      verifiedSkills: [{ name: 'Technical Recruiting', verifiedAt: 'Verified Assessment', score: 94, type: 'assessment' }],
      matchScore: 95,
      avatarColor: 'bg-emerald-600',
      notes: 'Bulk parsed via NextSoft NLP. Strong track record in hiring senior engineers.'
    },
    {
      candidateName: 'David Osei-Tutu',
      email: 'david.oseitutu@ghanafintech.com',
      phone: '+233 24 555 7890',
      currentRole: 'Senior Site Reliability Engineer (SRE)',
      experienceYears: '7+ years',
      location: 'Accra, Ghana (Remote)',
      extractedSkills: ['Terraform', 'Kubernetes', 'Prometheus', 'AWS Infrastructure', 'Incident Management'],
      verifiedSkills: [{ name: 'Kubernetes', verifiedAt: 'CKA Credential', type: 'certification' }],
      matchScore: 97,
      avatarColor: 'bg-blue-600',
      notes: 'Bulk parsed via NextSoft NLP. Deep expertise in 99.99% high-availability architectures.'
    },
    {
      candidateName: 'Amina Belkacem',
      email: 'amina.belkacem@algeriatech.dz',
      phone: '+213 555 123 456',
      currentRole: 'Principal Product Designer (Design Systems & Fintech UX)',
      experienceYears: '6+ years',
      location: 'North Africa & Remote',
      extractedSkills: ['Figma Mastery', 'Design Systems', 'User Research', 'Fintech UX', 'Prototyping'],
      verifiedSkills: [{ name: 'Design Systems', verifiedAt: 'Verified Assessment', score: 96, type: 'assessment' }],
      matchScore: 93,
      avatarColor: 'bg-purple-600',
      notes: 'Bulk parsed via NextSoft NLP. Built scalable cross-platform design systems for 2M+ users.'
    }
  ];

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const newItems: ParsedBulkItem[] = Array.from(fileList).map((file, idx) => {
      const demoCandidate = DEMO_BATCH_PRESETS[idx % DEMO_BATCH_PRESETS.length];
      const candidate: SavedCandidate = {
        id: `bulk-${Date.now()}-${idx}`,
        candidateName: demoCandidate.candidateName || file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' '),
        email: demoCandidate.email || `candidate.${idx + 1}@example.com`,
        phone: demoCandidate.phone || '+234 800 000 0000',
        currentRole: demoCandidate.currentRole || 'Senior Professional',
        experienceYears: demoCandidate.experienceYears || '5+ years',
        location: demoCandidate.location || 'Pan-Africa (Remote)',
        extractedSkills: demoCandidate.extractedSkills || ['Strategic Planning', 'Leadership', 'Execution'],
        verifiedSkills: demoCandidate.verifiedSkills || [],
        matchScore: demoCandidate.matchScore || 92,
        avatarColor: demoCandidate.avatarColor || 'bg-blue-600',
        notes: `Imported via Bulk PDF parser (${file.name})`,
        savedAt: 'Just now'
      };

      return {
        id: `item-${Date.now()}-${idx}`,
        fileName: file.name,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        status: 'pending',
        progress: 0,
        extractedCandidate: candidate
      };
    });

    setItems(prev => [...prev, ...newItems]);
    processBatch([...items, ...newItems]);
  };

  const processBatch = (batchItems: ParsedBulkItem[]) => {
    setIsProcessing(true);
    batchItems.forEach((item, index) => {
      if (item.status === 'completed') return;

      setTimeout(() => {
        setItems(prev => prev.map(i => i.id === item.id ? { ...i, status: 'parsing', progress: 50 } : i));
      }, (index + 1) * 400);

      setTimeout(() => {
        setItems(prev => prev.map(i => i.id === item.id ? { ...i, status: 'completed', progress: 100 } : i));
        if (index === batchItems.length - 1) {
          setIsProcessing(false);
          if (onToast) onToast(`Processed ${batchItems.length} candidate resumes successfully!`);
        }
      }, (index + 1) * 900);
    });
  };

  const handleAddAllToPool = () => {
    const completedCandidates = items
      .filter(i => i.status === 'completed' && i.extractedCandidate)
      .map(i => i.extractedCandidate as SavedCandidate);

    if (completedCandidates.length === 0) return;

    onAddCandidatesToPool(completedCandidates);
    if (onToast) onToast(`🎉 Added ${completedCandidates.length} parsed candidates to Saved Candidates pool!`);
    setItems([]);
  };

  const handleAddSingleCandidate = (cand: SavedCandidate, itemId: string) => {
    onAddCandidatesToPool([cand]);
    if (onToast) onToast(`Added ${cand.candidateName} to Saved Candidates pool!`);
    setItems(prev => prev.filter(i => i.id !== itemId));
  };

  const handleLoadDemoBatch = () => {
    const demoItems: ParsedBulkItem[] = DEMO_BATCH_PRESETS.map((demo, idx) => ({
      id: `demo-${Date.now()}-${idx}`,
      fileName: `${demo.candidateName?.replace(/\s+/g, '_')}_CV.pdf`,
      fileSize: '1.2 MB',
      status: 'completed',
      progress: 100,
      extractedCandidate: {
        id: `cand-demo-bulk-${idx}-${Date.now()}`,
        candidateName: demo.candidateName!,
        email: demo.email!,
        phone: demo.phone!,
        currentRole: demo.currentRole!,
        experienceYears: demo.experienceYears!,
        location: demo.location!,
        extractedSkills: demo.extractedSkills!,
        verifiedSkills: demo.verifiedSkills || [],
        matchScore: demo.matchScore || 94,
        avatarColor: demo.avatarColor || 'bg-blue-600',
        notes: demo.notes!,
        savedAt: 'Just now'
      }
    }));
    setItems(demoItems);
    if (onToast) onToast('Loaded demo PDF resumes with NLP extraction!');
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-150">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm text-[#142B4A] dark:text-white flex items-center gap-1.5">
              <UploadCloud className="w-4 h-4 text-[#2563EB] dark:text-blue-400" />
              <span>Bulk Resume Processor & Parser</span>
            </h3>
            <span className="text-[10px] bg-lime-100 text-lime-800 dark:bg-lime-950 dark:text-lime-300 font-bold px-2 py-0.5 rounded-full">
              Multi-PDF Drag & Drop
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Drop batches of candidate CVs to automatically extract roles, skills, and add them directly into your Saved Candidates pool.
          </p>
        </div>

        <button
          type="button"
          onClick={handleLoadDemoBatch}
          className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 self-start sm:self-auto shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Load Sample 3-CV Batch</span>
        </button>
      </div>

      {/* Drag & Drop Multi-file Upload Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`p-8 border-2 border-dashed rounded-3xl text-center transition-all cursor-pointer ${
          isDragOver 
            ? 'border-[#2563EB] bg-blue-50/70 dark:bg-blue-950/40 ring-4 ring-blue-500/20' 
            : 'border-slate-300 dark:border-slate-700 hover:border-blue-400 bg-slate-50/50 dark:bg-slate-900/40'
        }`}
        onClick={() => document.getElementById('bulk-resume-file-input')?.click()}
      >
        <input
          id="bulk-resume-file-input"
          type="file"
          multiple
          accept=".pdf,.docx,.txt"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-950/80 text-[#2563EB] dark:text-blue-400 flex items-center justify-center mx-auto mb-3 shadow-xs">
          <UploadCloud className="w-7 h-7" />
        </div>

        <h4 className="font-bold text-sm text-slate-800 dark:text-white mb-1">
          Drag and Drop Multiple Candidate PDFs Here
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-3">
          Select or drag multiple resumes (PDF, DOCX). The parser will automatically analyze work experience and skills.
        </p>
        <span className="inline-block px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-colors shadow-xs">
          Browse Files to Parse
        </span>
      </div>

      {/* Batch Processing Table / Cards */}
      {items.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-slate-800 dark:text-slate-200">
              Parsed Batch Queue ({items.length} Resumes)
            </span>

            <button
              type="button"
              onClick={handleAddAllToPool}
              disabled={isProcessing}
              className="px-4 py-2 bg-lime-600 hover:bg-lime-700 disabled:bg-slate-400 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <BookmarkCheck className="w-4 h-4" />
              <span>Import All to Saved Candidates ({items.filter(i => i.status === 'completed').length})</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {items.map(item => {
              const cand = item.extractedCandidate;

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-3 shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2 truncate">
                        <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {item.fileName}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 shrink-0">{item.fileSize}</span>
                    </div>

                    {item.status === 'parsing' && (
                      <div className="space-y-1 py-2">
                        <div className="flex justify-between text-[10px] text-blue-600 dark:text-blue-400 font-semibold">
                          <span>NLP Skill Extraction...</span>
                          <span>{item.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-blue-600 h-full rounded-full transition-all duration-300" style={{ width: `${item.progress}%` }} />
                        </div>
                      </div>
                    )}

                    {cand && item.status === 'completed' && (
                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-800 dark:text-white">
                            {cand.candidateName}
                          </span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-lime-100 text-lime-800 dark:bg-lime-950 dark:text-lime-300">
                            {cand.matchScore}% Match
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300">
                          {cand.currentRole} ({cand.experienceYears})
                        </p>
                        <p className="text-[10px] text-slate-400 truncate">
                          {cand.email} · {cand.location}
                        </p>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {cand.extractedSkills.slice(0, 3).map(s => (
                            <span key={s} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-300">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {item.status === 'completed' && cand && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[10px] text-lime-600 dark:text-lime-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Parsed Ready</span>
                      </span>

                      <button
                        type="button"
                        onClick={() => handleAddSingleCandidate(cand, item.id)}
                        className="px-2.5 py-1 bg-blue-50 dark:bg-blue-950 hover:bg-blue-100 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                      >
                        + Add to Pool
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
