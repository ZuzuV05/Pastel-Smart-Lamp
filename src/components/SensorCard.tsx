import React from 'react';
import { useMqtt } from '../mqttContext';

export const SensorCard: React.FC = () => {
  const { state } = useMqtt();
  
  const tempPercent = Math.min(Math.max((state.temperature / 50) * 100, 0), 100);
  const humPercent = Math.min(Math.max(state.humidity, 0), 100);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="bg-white/60 border border-white backdrop-blur-lg rounded-[2rem] p-6 shadow-xl shadow-pink-100/20 flex flex-col justify-between gap-4">
        <div className="flex items-center gap-5 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center text-pink-500 shrink-0">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Temperature</p>
            <h2 className="text-4xl font-black text-slate-800">{state.temperature.toFixed(1)}<span className="text-pink-400">°C</span></h2>
          </div>
        </div>
        <div className="w-full bg-pink-100 rounded-full h-2 mt-2 relative z-10 overflow-hidden">
          <div 
            className="bg-pink-400 h-2 rounded-full transition-all duration-1000 ease-out" 
            style={{ width: `${tempPercent}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white/60 border border-white backdrop-blur-lg rounded-[2rem] p-6 shadow-xl shadow-emerald-100/20 flex flex-col justify-between gap-4">
        <div className="flex items-center gap-5 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-500 shrink-0">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Humidity</p>
            <h2 className="text-4xl font-black text-slate-800">{state.humidity.toFixed(0)}<span className="text-emerald-400">%</span></h2>
          </div>
        </div>
        <div className="w-full bg-emerald-100 rounded-full h-2 mt-2 relative z-10 overflow-hidden">
          <div 
            className="bg-emerald-400 h-2 rounded-full transition-all duration-1000 ease-out" 
            style={{ width: `${humPercent}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
