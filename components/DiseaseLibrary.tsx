
import React, { useState } from 'react';
import { PLANT_VILLAGE_DATA } from '../constants';

const DiseaseLibrary: React.FC = () => {
  const [activeCrop, setActiveCrop] = useState(PLANT_VILLAGE_DATA[0].crop);

  const currentCropData = PLANT_VILLAGE_DATA.find(d => d.crop === activeCrop);

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
      {/* Sidebar Navigation - Optimized Grid for Mobile */}
      <div className="w-full md:w-72 space-y-4">
        <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-slate-100">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 pl-1">Crop Varieties</h3>
          <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-1 gap-2 max-h-[30vh] md:max-h-[60vh] overflow-y-auto pr-1 md:pr-2 custom-scrollbar">
            {PLANT_VILLAGE_DATA.map(c => (
              <button
                key={c.crop}
                onClick={() => setActiveCrop(c.crop)}
                className={`
                  text-left px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl font-bold transition-all flex items-center justify-between group text-xs md:text-sm
                  ${activeTabStyle(activeCrop === c.crop)}
                `}
              >
                <span className="truncate">{c.crop}</span>
                {activeCrop === c.crop ? (
                  <div className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></div>
                ) : (
                  <span className="text-[9px] opacity-40 font-bold group-hover:opacity-100 hidden md:block">
                    {c.diseases.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
        
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 hidden md:block">
          <p className="text-[10px] text-emerald-800 leading-relaxed font-semibold italic">
            "This library covers all 38 classes defined in the original Plant Village dataset."
          </p>
        </div>
      </div>

      {/* Content Area - Mobile Padding Adjustments */}
      <div className="flex-1 space-y-4 md:space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-xl md:text-3xl font-extrabold text-slate-900">{activeCrop}</h2>
          <div className="h-px bg-slate-200 flex-1 rounded-full opacity-50"></div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {currentCropData?.diseases.map((d, i) => (
            <div 
              key={i} 
              className="bg-white p-5 md:p-6 rounded-[24px] shadow-sm border border-slate-100 hover:border-emerald-200 transition-all group relative overflow-hidden"
            >
              {/* Healthy Badge */}
              {d.name === 'Healthy' && (
                <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[9px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                  Optimal
                </div>
              )}
              
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                  <h4 className={`text-base md:text-xl font-extrabold transition-colors ${d.name === 'Healthy' ? 'text-emerald-600' : 'text-slate-800 group-hover:text-emerald-700'}`}>
                    {d.name}
                  </h4>
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Dataset Taxonomy: PV_{activeCrop.toUpperCase()}_{i}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Description</h5>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium">{d.desc}</p>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100/50">
                  <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Management</h5>
                  <p className="text-[11px] md:text-sm text-slate-700 font-bold flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">•</span>
                    {d.prevention}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

function activeTabStyle(isActive: boolean) {
  return isActive 
    ? 'bg-emerald-600 text-white shadow-lg' 
    : 'bg-white text-slate-500 hover:bg-slate-50 border border-transparent';
}

export default DiseaseLibrary;
