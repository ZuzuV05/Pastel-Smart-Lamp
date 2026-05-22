import React from 'react';
import { useMqtt } from '../mqttContext';

export const VariationControl: React.FC = () => {
  const { state, publish } = useMqtt();
  
  const currentVar = state.variation;

  const handleVariasi = (type: 'VARIASI1' | 'VARIASI2' | 'STOP') => {
    publish('smarthome/variasi', type);
  };

  return (
    <div className="bg-white/40 border border-white rounded-[2.5rem] p-6 backdrop-blur-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-md font-black text-slate-800">Lighting Effects Control</h3>
        <div className="flex items-center gap-2">
          {currentVar !== 'STOP' && <span className="flex h-2 w-2 rounded-full bg-pink-400 animate-pulse"></span>}
          <span className={`text-[10px] font-bold uppercase ${currentVar !== 'STOP' ? 'text-pink-500' : 'text-slate-500'}`}>
            {currentVar === 'VARIASI1' && 'Variasi 1 Active'}
            {currentVar === 'VARIASI2' && 'Variasi 2 Active'}
            {currentVar === 'STOP' && 'Idle'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => handleVariasi('VARIASI1')}
          className={`p-4 rounded-2xl font-bold text-sm flex flex-col items-center gap-1 transition-all duration-300 ${
            currentVar === 'VARIASI1' 
              ? 'bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-lg shadow-pink-200/50' 
              : 'bg-white border border-slate-100 text-slate-600 hover:border-pink-300 hover:text-pink-500 shadow-sm'
          }`}
        >
          <span>VARIASI 1</span>
          <span className={`text-[9px] font-normal uppercase tracking-widest ${currentVar === 'VARIASI1' ? 'opacity-80' : 'opacity-60'}`}>Sequential Loop</span>
        </button>

        <button
          onClick={() => handleVariasi('VARIASI2')}
          className={`p-4 rounded-2xl font-bold text-sm flex flex-col items-center gap-1 transition-all duration-300 ${
            currentVar === 'VARIASI2' 
              ? 'bg-white border border-emerald-300 text-emerald-500 shadow-sm shadow-emerald-200/50' 
              : 'bg-white border border-slate-100 text-slate-600 hover:border-emerald-300 hover:text-emerald-500 shadow-sm'
          }`}
        >
          <span>VARIASI 2</span>
          <span className={`text-[9px] font-normal uppercase tracking-widest ${currentVar === 'VARIASI2' ? 'opacity-80' : 'opacity-60'}`}>Gradient Stack</span>
        </button>

        <button
          onClick={() => handleVariasi('STOP')}
          className={`p-4 rounded-2xl font-bold text-sm flex flex-col items-center gap-1 transition-all duration-300 ${
            currentVar === 'STOP' 
              ? 'bg-slate-800 text-white shadow-lg shadow-slate-200' 
              : 'bg-white border border-slate-100 text-slate-600 hover:bg-slate-50 hover:text-slate-800 shadow-sm'
          }`}
        >
          <span>STOP EFFECTS</span>
          <span className={`text-[9px] font-normal uppercase tracking-widest ${currentVar === 'STOP' ? 'opacity-60' : 'opacity-60'}`}>All Off</span>
        </button>
      </div>
    </div>
  );
};
