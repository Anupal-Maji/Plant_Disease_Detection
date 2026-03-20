
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ImageScanner from './components/ImageScanner';
import AnalysisDashboard from './components/AnalysisDashboard';
import DiseaseLibrary from './components/DiseaseLibrary';
import { DetectionResult, HistoryItem } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'scanner' | 'dashboard' | 'library'>('scanner');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [currentResult, setCurrentResult] = useState<DetectionResult | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('agrishield_history');
    if (saved) {
      try { setHistory(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
  }, []);

  const handleScanComplete = (result: DetectionResult, imageUrl: string) => {
    const newItem: HistoryItem = { ...result, id: crypto.randomUUID(), timestamp: Date.now(), imageUrl };
    const newHistory = [newItem, ...history];
    setHistory(newHistory);
    localStorage.setItem('agrishield_history', JSON.stringify(newHistory));
    setCurrentResult(result);
    setShowResultModal(true);
  };

  return (
    <div className="min-h-screen relative pb-10 md:pb-20">
      {/* Decorative background elements */}
      <div className="blob top-0 left-[-100px] opacity-30 md:opacity-40"></div>
      <div className="blob bottom-0 right-[-100px] opacity-20 md:opacity-30 bg-emerald-200"></div>

      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-5xl mx-auto px-4 pt-24 md:pt-32 sm:px-6 lg:px-8">
        {activeTab === 'scanner' && (
          <div className="max-w-3xl mx-auto space-y-12 md:space-y-16">
            <header className="text-center space-y-4 md:space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] md:text-[11px] font-black uppercase tracking-widest animate-in slide-in-from-top-4 duration-1000">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Neural Diagnosis Active
              </div>
              <h1 className="text-4xl md:text-7xl font-[800] text-slate-900 tracking-tight leading-[1.1] animate-in fade-in duration-1000">
                Harvest <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-lime-500">Stability</span> <br className="hidden md:block"/>through AI
              </h1>
              <p className="text-slate-500 text-base md:text-xl max-w-xl mx-auto font-medium leading-relaxed opacity-80 px-2">
                Precision disease identification powered by the Plant Village dataset and Gemini Vision.
              </p>
            </header>

            <ImageScanner onScanComplete={handleScanComplete} />
          </div>
        )}

        {activeTab === 'dashboard' && <AnalysisDashboard history={history} />}
        {activeTab === 'library' && <DiseaseLibrary />}
      </main>

      {/* Result Modal - Mobile Responsive Padding and Layout */}
      {showResultModal && currentResult && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-4 bg-white/40 backdrop-blur-md transition-all duration-500">
          <div className="bg-white rounded-[32px] md:rounded-[40px] w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-[0_20px_70px_-10px_rgba(0,0,0,0.1)] border border-white relative animate-in zoom-in-95 fade-in duration-300 custom-scrollbar">
            <button 
              onClick={() => setShowResultModal(false)}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-slate-400 hover:text-emerald-600 transition-colors p-2 z-10 bg-white/80 rounded-full"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            <div className="p-6 md:p-14">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-8 md:mb-12">
                <div className={`w-24 h-24 md:w-32 md:h-32 rounded-[24px] md:rounded-[32px] flex-shrink-0 flex items-center justify-center text-4xl md:text-5xl shadow-2xl ${currentResult.disease === 'Healthy' ? 'bg-emerald-100/50 text-emerald-600 shadow-emerald-200/50' : 'bg-amber-100/50 text-amber-600 shadow-amber-200/50'}`}>
                  {currentResult.disease === 'Healthy' ? '🌿' : '🧬'}
                </div>
                <div className="text-center md:text-left space-y-1 md:space-y-2">
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Origin</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">{currentResult.crop}</span>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900">{currentResult.disease}</h2>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full">
                    <span className="text-[10px] font-black text-slate-600 uppercase">Accuracy</span>
                    <span className="text-[10px] font-black text-emerald-600">{currentResult.confidence}%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-8 md:space-y-10">
                <section>
                  <h4 className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Diagnostic Profile</h4>
                  <p className="text-slate-600 leading-relaxed font-medium text-base md:text-lg">{currentResult.description}</p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  <div className="p-6 md:p-8 rounded-[24px] md:rounded-[32px] bg-emerald-50/50 border border-emerald-100/50">
                    <h4 className="text-emerald-700 font-black text-[9px] md:text-[10px] uppercase tracking-widest mb-4 md:mb-6 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                      Treatment
                    </h4>
                    <ul className="space-y-3 md:space-y-4">
                      {currentResult.treatment.map((t, i) => (
                        <li key={i} className="text-xs md:text-sm font-semibold text-emerald-900/70 flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0"></span>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 md:p-8 rounded-[24px] md:rounded-[32px] bg-slate-50 border border-slate-100">
                    <h4 className="text-slate-500 font-black text-[9px] md:text-[10px] uppercase tracking-widest mb-4 md:mb-6 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04c0 4.894 1.533 9.032 4.12 12.062q.391.455.82 1.016a2.41 2.41 0 003.356 0q.428-.56.819-1.016c2.587-3.03 4.12-7.168 4.12-12.062"></path></svg>
                      Prevention
                    </h4>
                    <ul className="space-y-3 md:space-y-4">
                      {currentResult.preventiveMeasures.map((pm, i) => (
                        <li key={i} className="text-xs md:text-sm font-semibold text-slate-900/60 flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 flex-shrink-0"></span>
                          {pm}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 md:pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-3 md:gap-4">
                  <button 
                    onClick={() => setShowResultModal(false)}
                    className="flex-1 py-4 md:py-5 bg-emerald-600 text-white text-sm md:text-base font-black rounded-xl md:rounded-2xl transition-all hover:bg-emerald-700 active:scale-[0.98] shadow-lg shadow-emerald-100"
                  >
                    Archive Result
                  </button>
                  <button 
                    onClick={() => window.print()}
                    className="flex-1 sm:flex-none px-8 py-4 md:py-5 bg-white border-2 border-slate-100 text-slate-800 text-sm md:text-base font-black rounded-xl md:rounded-2xl transition-all hover:bg-slate-50 active:scale-[0.98]"
                  >
                    Export PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
