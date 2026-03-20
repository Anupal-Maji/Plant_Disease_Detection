
import React from 'react';

interface NavbarProps {
  onTabChange: (tab: 'scanner' | 'dashboard' | 'library') => void;
  activeTab: string;
}

const Navbar: React.FC<NavbarProps> = ({ onTabChange, activeTab }) => {
  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-3 md:px-4">
      <nav className="max-w-4xl mx-auto glass rounded-2xl shadow-sm px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-3 cursor-pointer" onClick={() => onTabChange('scanner')}>
          <div className="w-8 h-8 md:w-9 md:h-9 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg md:rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200 flex-shrink-0">
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4"></path></svg>
          </div>
          <span className="text-base md:text-lg font-extrabold text-slate-800 tracking-tight whitespace-nowrap">AgriShield<span className="text-emerald-500">.</span></span>
        </div>
        
        <div className="flex gap-1 md:gap-2">
          {[
            { id: 'scanner', label: 'Scan', icon: 'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z' },
            { id: 'dashboard', label: 'Stats', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
            { id: 'library', label: 'Learn', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => onTabChange(tab.id as any)}
              className={`
                px-2 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl text-[11px] md:text-sm font-semibold transition-all flex items-center gap-1.5 md:gap-2
                ${activeTab === tab.id 
                  ? 'bg-emerald-50 text-emerald-600 shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}
              `}
            >
              <svg className="w-3.5 h-3.5 hidden xs:block sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tab.icon}></path></svg>
              {tab.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
