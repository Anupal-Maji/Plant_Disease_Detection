
import React from 'react';
import { HistoryItem } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

interface AnalysisDashboardProps {
  history: HistoryItem[];
}

const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({ history }) => {
  const getStats = () => {
    const crops: Record<string, number> = {};
    const diseases: Record<string, number> = {};
    
    history.forEach(h => {
      crops[h.crop] = (crops[h.crop] || 0) + 1;
      diseases[h.disease] = (diseases[h.disease] || 0) + 1;
    });

    const cropData = Object.entries(crops).map(([name, value]) => ({ name, value }));
    const diseaseData = Object.entries(diseases).map(([name, value]) => ({ name, value }));

    return { cropData, diseaseData };
  };

  const { cropData, diseaseData } = getStats();
  const COLORS = ['#059669', '#10b981', '#34d399', '#6ee7b7', '#a7f3d0'];

  if (history.length === 0) {
    return (
      <div className="bg-white rounded-[24px] p-8 md:p-12 text-center border border-dashed border-slate-300">
        <div className="text-4xl md:text-5xl mb-4">📊</div>
        <h3 className="text-base md:text-lg font-bold text-slate-800">No scan data yet</h3>
        <p className="text-slate-500 text-sm max-w-xs mx-auto mt-2">Start scanning your crops to see health trends for your farm.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white p-5 md:p-6 rounded-[24px] shadow-sm border border-slate-100">
          <h3 className="text-sm md:text-lg font-bold text-slate-800 mb-4">Crops Scanned</h3>
          <div className="h-56 md:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cropData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" fontSize={10} tick={{fill: '#64748b'}} />
                <YAxis fontSize={10} tick={{fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 md:p-6 rounded-[24px] shadow-sm border border-slate-100">
          <h3 className="text-sm md:text-lg font-bold text-slate-800 mb-4">Issue Breakdown</h3>
          <div className="h-56 md:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={diseaseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {diseaseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-slate-800 text-sm md:text-base">Scan History</h3>
          <span className="text-[10px] bg-emerald-100 px-2 py-0.5 rounded-full text-emerald-700 font-bold uppercase tracking-wider">{history.length} scans</span>
        </div>
        <div className="divide-y divide-slate-100 max-h-[400px] md:max-h-[500px] overflow-y-auto custom-scrollbar">
          {history.slice().reverse().map((item) => (
            <div key={item.id} className="p-4 flex items-center gap-3 md:gap-4 hover:bg-slate-50 transition-colors">
              <img src={item.imageUrl} alt={item.crop} className="w-12 h-12 md:w-16 md:h-16 rounded-xl object-cover shadow-sm bg-slate-100 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <h4 className="font-bold text-slate-800 text-sm truncate">{item.crop}</h4>
                  <span className="text-[9px] text-slate-400 font-medium whitespace-nowrap">{new Date(item.timestamp).toLocaleDateString()}</span>
                </div>
                <p className={`text-[11px] md:text-sm truncate ${item.disease === 'Healthy' ? 'text-emerald-600' : 'text-amber-600'} font-semibold`}>
                  {item.disease}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 bg-slate-100 h-1 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full" style={{ width: `${item.confidence}%` }}></div>
                  </div>
                  <span className="text-[9px] text-slate-400 font-bold">{item.confidence}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalysisDashboard;
