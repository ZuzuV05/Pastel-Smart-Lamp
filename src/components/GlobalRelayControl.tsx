import React from 'react';
import { useMqtt } from '../mqttContext';

export const GlobalRelayControl: React.FC = () => {
  const { publish } = useMqtt();

  const handleAll = (status: 'ON' | 'OFF') => {
    ['lampu1', 'lampu2', 'lampu3', 'lampu4'].forEach((lamp) => {
      publish(`smarthome/${lamp}`, status);
    });
  };

  return (
    <div className="flex items-center justify-between mb-1 px-2">
      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Relay Controls</h3>
      <div className="flex gap-2">
        <button
          onClick={() => handleAll('ON')}
          className="px-4 py-1.5 bg-emerald-100/80 hover:bg-emerald-200 text-emerald-700 text-[10px] uppercase font-bold rounded-xl transition-all shadow-sm"
        >
          All ON
        </button>
        <button
          onClick={() => handleAll('OFF')}
          className="px-4 py-1.5 bg-pink-100/80 hover:bg-pink-200 text-pink-700 text-[10px] uppercase font-bold rounded-xl transition-all shadow-sm"
        >
          All OFF
        </button>
      </div>
    </div>
  );
};
