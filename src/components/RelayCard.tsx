import React from 'react';
import { useMqtt } from '../mqttContext';
import { AppState } from '../types';

interface RelayCardProps {
  id: keyof AppState['relays'];
  title: string;
}

export const RelayCard: React.FC<RelayCardProps> = ({ id, title }) => {
  const { state, publish } = useMqtt();
  
  const status = state.relays[id];
  const isOn = status === 'ON';

  const handleToggle = (newState: 'ON' | 'OFF') => {
    publish(`smarthome/${id}`, newState);
  };

  return (
    <div className={`border-2 rounded-3xl p-5 flex flex-col items-center gap-4 transition-all duration-300 ${
      isOn 
        ? 'bg-emerald-50/50 border-emerald-200 shadow-lg shadow-emerald-200/20' 
        : 'bg-white/40 border-slate-100'
    }`}>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
        isOn
          ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
          : 'bg-slate-200 text-slate-400'
      }`}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.337-7.663l.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
      </div>
      
      <div className="text-center">
        <p className="text-sm font-bold text-slate-700">{title}</p>
        <span className={`text-[10px] font-black uppercase tracking-tighter ${
          isOn ? 'text-emerald-600' : 'text-slate-400'
        }`}>Status: {status}</span>
      </div>

      <div className="grid grid-cols-2 gap-2 w-full mt-auto">
        <button
          onClick={() => handleToggle('ON')}
          className={`py-2 text-[10px] font-bold rounded-xl transition-all duration-300 ${
            isOn 
              ? 'bg-emerald-500 text-white shadow-md' 
              : 'bg-white text-slate-400 border border-slate-100 hover:bg-emerald-50 hover:text-emerald-500'
          }`}
        >
          ON
        </button>
        <button
          onClick={() => handleToggle('OFF')}
          className={`py-2 text-[10px] font-bold rounded-xl transition-all duration-300 ${
            !isOn 
              ? 'bg-pink-400 text-white shadow-md shadow-pink-400/30' 
              : 'bg-white text-slate-400 border border-slate-100 hover:bg-pink-50 hover:text-pink-500'
          }`}
        >
          OFF
        </button>
      </div>
    </div>
  );
};
