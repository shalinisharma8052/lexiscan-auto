import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Upload, 
  Search, 
  Activity, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  AlertCircle,
  BarChart3,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Users,
  DollarSign,
  Gavel
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { extractContractEntities, ExtractedEntities } from './services/geminiService';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

// Mock data for analytics
const MOCK_STATS = [
  { day: 'Mon', count: 124 },
  { day: 'Tue', count: 156 },
  { day: 'Wed', count: 210 },
  { day: 'Thu', count: 185 },
  { day: 'Fri', count: 240 },
  { day: 'Sat', count: 98 },
  { day: 'Sun', count: 82 },
];

const RECENT_DOCS = [
  { id: '1', name: 'Service_Agreement_v4.pdf', status: 'verified', entities: 12, date: '2025-11-28' },
  { id: '2', name: 'Master_Lease_NY_001.pdf', status: 'verified', entities: 8, date: '2025-11-28' },
  { id: '3', name: 'NDA_Standard_Template.pdf', status: 'warning', entities: 5, date: '2025-11-27' },
  { id: '4', name: 'Employment_Contract_Smith.pdf', status: 'verified', entities: 15, date: '2025-11-27' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'extract'>('dashboard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [results, setResults] = useState<ExtractedEntities | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pastedText, setPastedText] = useState('');

  const steps = [
    { title: 'Data Acquisition', desc: 'Tesseract OCR Pipeline (Binary Normalization)' },
    { title: 'Core Modeling', desc: 'Bi-LSTM + BERT Contextual Embedding' },
    { title: 'Verification', desc: 'Rule-Based Entity Format Validation (ISO 8601)' },
    { title: 'Finalization', desc: 'JSON Payload Serialization' }
  ];

  const handleProcess = async () => {
    if (!pastedText.trim()) return;
    
    setIsProcessing(true);
    setResults(null);
    setError(null);
    setProcessingStep(0);

    for (let i = 0; i < steps.length; i++) {
       setProcessingStep(i);
       await new Promise(r => setTimeout(r, 800));
    }

    try {
      const data = await extractContractEntities(pastedText);
      setResults(data);
      setIsProcessing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F0F0F0] relative overflow-hidden flex flex-col p-8 md:p-12 font-sans selection:bg-[#E6FF00] selection:text-black">
      {/* Background Watermark */}
      <div className="absolute top-[-80px] right-[-40px] text-[480px] font-black text-[#151515] leading-none tracking-tighter z-0 pointer-events-none select-none">
        02
      </div>

      {/* Header */}
      <header className="flex justify-between items-start z-10 border-b border-zinc-800 pb-8 mb-12">
        <div className="flex flex-col">
          <span className="text-[10px] tracking-[0.4em] uppercase text-zinc-500 mb-1">IDP Case Study // LexiScan</span>
          <h1 className="text-xl font-bold tracking-tight uppercase">LEXISCAN_AUTO_SYSTEM</h1>
        </div>
        
        <nav className="flex gap-12 pt-1">
          <NavButton 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')}
            label="Dashboard"
          />
          <NavButton 
            active={activeTab === 'extract'} 
            onClick={() => setActiveTab('extract')}
            label="Extraction"
          />
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 z-10 flex flex-col relative">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' ? (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-12 gap-8 items-end"
            >
              <div className="col-span-12 lg:col-span-9 flex flex-col">
                <h1 className="text-[60px] md:text-[120px] lg:text-[150px] font-black leading-[0.85] tracking-tighter uppercase mb-8">
                  <span className="text-[#E6FF00]">Contract</span><br/>
                  Intelligence
                </h1>
                
                <div className="flex flex-col md:flex-row gap-12 items-start md:items-end w-full">
                  <p className="text-zinc-400 max-w-lg text-sm leading-relaxed">
                    Automated structural entity extraction for high-density legal frameworks. 
                    Vol. 02 focuses on real-time IDP normalization using BERT-Large and Bi-LSTM kernels.
                    Optimized for fluid document indexing in global metropolitan registries.
                  </p>
                  
                  <div className="flex gap-4">
                    <StatCardSmall label="System Integrity" value="98.2%" />
                    <StatCardSmall label="Avg Latency" value="342MS" />
                  </div>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-3 border-l border-zinc-800 pl-8 space-y-8 flex flex-col h-full justify-end pb-4">
                 <div className="flex flex-col">
                   <span className="text-[9px] uppercase tracking-widest text-zinc-500 mb-2 font-bold">Node Identification</span>
                   <span className="text-sm font-mono tracking-tighter">LEX-01-AF // DOCKER</span>
                 </div>
                 <div className="flex flex-col">
                   <span className="text-[9px] uppercase tracking-widest text-zinc-500 mb-2 font-bold">Extraction Engine</span>
                   <span className="text-sm font-medium italic">BERT-Large-Legal-v2</span>
                 </div>
                 <div className="flex flex-col">
                   <span className="text-[9px] uppercase tracking-widest text-zinc-500 mb-2 font-bold">Deployment Status</span>
                   <span className="text-sm border-l-2 border-[#E6FF00] pl-3">Active Implementation</span>
                 </div>
              </div>
              
              {/* Detailed Dashboard View */}
              <div className="col-span-12 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 border-t border-zinc-800 pt-12">
                   <div className="lg:col-span-2">
                      <div className="flex justify-between items-center mb-6">
                         <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Document Volatility Stream</h2>
                         <Activity className="w-4 h-4 text-[#E6FF00]" />
                      </div>
                      <div className="h-[250px] w-full bg-[#111] p-4 border border-zinc-800">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={MOCK_STATS}>
                            <XAxis dataKey="day" hide />
                            <Tooltip contentStyle={{ background: '#000', border: '1px solid #333', color: '#fff', fontSize: '10px' }} />
                            <Bar dataKey="count" fill="#E6FF00" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                   </div>

                   <div className="space-y-6">
                      <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Real-Time Ingestion</h2>
                      <div className="space-y-4">
                         {RECENT_DOCS.map(doc => (
                           <div key={doc.id} className="flex justify-between items-center group cursor-pointer border-b border-zinc-800 pb-3 hover:border-[#E6FF00] transition-colors">
                              <div className="flex flex-col">
                                 <span className="text-xs font-bold tracking-tight group-hover:text-[#E6FF00] transition-colors uppercase">{doc.name}</span>
                                 <span className="text-[9px] font-mono opacity-40 uppercase tracking-widest">Entities: {doc.entities} detected</span>
                              </div>
                              <ArrowRight className="w-3 h-3 text-zinc-600 group-hover:text-[#E6FF00] group-hover:translate-x-1 transition-all" />
                           </div>
                         ))}
                      </div>
                   </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
               key="extract"
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 1.02 }}
               className="flex flex-col h-full"
            >
               <div className="grid grid-cols-12 gap-12 flex-1">
                  {/* Left Column: Input */}
                  <div className="col-span-12 lg:col-span-6 flex flex-col">
                     <h2 className="text-[40px] font-black uppercase tracking-tighter mb-8 leading-none">
                        <span className="text-[#E6FF00]">Input</span> Raw Data
                     </h2>
                     <div className="flex-1 relative group">
                        <textarea 
                           className="w-full h-full bg-[#111] border-l-4 border-[#E6FF00] border-y border-zinc-800 p-8 text-sm font-mono outline-none resize-none placeholder:text-zinc-700 transition-all focus:bg-[#151515]"
                           placeholder=">> PASTE CONTRACT BUFFER DATA..."
                           value={pastedText}
                           onChange={(e) => setPastedText(e.target.value)}
                        />
                        <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none text-[8px] font-mono">
                           ISO-27001 SECURED // BATCH_ANALYSIS_BUFFER
                        </div>
                     </div>
                     <div className="mt-8 flex justify-between items-end">
                        <div className="flex flex-col">
                           <span className="text-[9px] uppercase tracking-widest text-[#E6FF00] mb-2 font-bold flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-[#E6FF00] rounded-full animate-pulse" />
                              Ready for Sequence
                           </span>
                           <span className="text-[10px] opacity-40 uppercase tracking-widest">Protocol: LEXI_EXTRACT_v4</span>
                        </div>
                        <button 
                           onClick={handleProcess}
                           disabled={isProcessing || !pastedText.trim()}
                           className="bg-[#E6FF00] text-black px-12 py-5 text-sm font-black uppercase tracking-widest hover:bg-white transition-all disabled:opacity-30 disabled:cursor-not-allowed group relative"
                        >
                           <span className="relative z-10 flex items-center gap-3">
                              {isProcessing ? 'Processing Sequence' : 'Start Extraction'}
                              <ArrowRight className="w-5 h-5" />
                           </span>
                        </button>
                     </div>
                  </div>

                  {/* Right Column: Results */}
                  <div className="col-span-12 lg:col-span-6 flex flex-col border-l border-zinc-800 pl-12">
                     <h2 className="text-[40px] font-black uppercase tracking-tighter mb-8 leading-none">
                        <span className="text-zinc-600">Output</span> Manifest
                     </h2>
                     <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
                        <AnimatePresence mode="wait">
                           {isProcessing ? (
                             <motion.div 
                               initial={{ opacity: 0 }}
                               animate={{ opacity: 1 }}
                               exit={{ opacity: 0 }}
                               className="h-full flex flex-col justify-center space-y-12"
                             >
                                {steps.map((step, idx) => (
                                   <div key={idx} className={cn(
                                     "flex items-start gap-6 transition-all duration-300",
                                     processingStep < idx ? "opacity-10" : "opacity-100"
                                   )}>
                                      <div className="text-2xl font-black opacity-30 italic leading-none">{String(idx + 1).padStart(2, '0')}</div>
                                      <div className="flex flex-col">
                                         <span className="text-xs font-bold uppercase tracking-widest text-[#E6FF00] mb-1">{step.title}</span>
                                         <span className="text-[10px] opacity-50 uppercase font-mono">{step.desc}</span>
                                      </div>
                                   </div>
                                ))}
                             </motion.div>
                           ) : results ? (
                             <motion.div 
                               initial={{ opacity: 0 }}
                               animate={{ opacity: 1 }}
                               className="space-y-12 pb-12"
                             >
                                <ResultBlock label="Entities Involved" items={results.parties} />
                                <ResultBlock label="Key Date Registry" items={results.dates} />
                                <ResultBlock label="Value Assessment" items={results.amounts} />
                                
                                <div className="space-y-6">
                                   <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold block">Structural Clauses</span>
                                   <div className="grid gap-4">
                                      {results.clauses.map((clause, idx) => (
                                         <div key={idx} className="bg-[#111] p-6 border border-zinc-800 relative group">
                                            <div className="absolute top-0 right-0 p-3">
                                               <Gavel className="w-3 h-3 text-[#E6FF00] opacity-20 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <span className="text-[10px] font-black uppercase text-[#E6FF00] block mb-2">{clause.type}</span>
                                            <p className="text-xs text-zinc-400 font-medium italic leading-relaxed uppercase">{clause.summary}</p>
                                         </div>
                                      ))}
                                   </div>
                                </div>
                             </motion.div>
                           ) : (
                             <div className="h-full flex flex-col justify-center items-center opacity-10 text-center uppercase">
                                <Cpu className="w-24 h-24 mb-6 stroke-[0.5]" />
                                <span className="text-xl font-black tracking-widest">Awaiting Extraction</span>
                             </div>
                           )}
                        </AnimatePresence>
                     </div>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="flex justify-between items-end z-10 pt-12 border-t border-zinc-800 mt-12">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-white flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-black rotate-45"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Access Protocol</span>
            <span className="text-xs font-mono tracking-tighter uppercase">LEX-B-992-TX // GRANTED</span>
          </div>
        </div>

        <div className="flex items-center gap-16">
          <div className="text-right hidden md:block">
            <span className="block text-[9px] uppercase tracking-[0.3em] text-zinc-500 mb-2 text-right font-bold">System Load Integrity</span>
            <div className="flex gap-1 justify-end">
              <div className="w-8 h-1 bg-[#E6FF00]"></div>
              <div className="w-8 h-1 bg-[#E6FF00]"></div>
              <div className="w-8 h-1 bg-zinc-800"></div>
              <div className="w-8 h-1 bg-zinc-800"></div>
            </div>
          </div>
          <div className="text-right">
            <span className="block text-[32px] font-black leading-none italic uppercase -tracking-widest">Flow.02</span>
            <span className="text-[10px] uppercase tracking-widest text-[#E6FF00] font-bold">LexiScan IDP v2.4</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavButton({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
  return (
    <div className="group cursor-pointer flex items-center gap-3" onClick={onClick}>
      <span className={cn(
        "text-[11px] uppercase tracking-[0.2em] font-bold transition-colors",
        active ? "text-white" : "text-zinc-500 group-hover:text-white"
      )}>
        {label}
      </span>
      {active && <div className="w-1.5 h-1.5 bg-[#E6FF00] rounded-full"></div>}
    </div>
  );
}

function StatCardSmall({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex flex-col min-w-[100px]">
       <span className="text-[9px] uppercase tracking-widest text-zinc-500 mb-1 font-bold">{label}</span>
       <span className="text-sm font-mono text-[#E6FF00] font-black">{value}</span>
    </div>
  );
}

function ResultBlock({ label, items }: { label: string, items: string[] }) {
  return (
    <div className="space-y-4">
       <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold block">{label}</span>
       <div className="flex flex-wrap gap-x-12 gap-y-4">
          {items.map((item, idx) => (
             <div key={idx} className="flex flex-col">
                <span className="text-[10px] font-bold text-white uppercase italic tracking-tight">{item}</span>
                <div className="w-4 h-0.5 bg-[#E6FF00] mt-1 opacity-40"></div>
             </div>
          ))}
          {items.length === 0 && <span className="text-[9px] opacity-30 italic uppercase">Null Sequence</span>}
       </div>
    </div>
  );
}

