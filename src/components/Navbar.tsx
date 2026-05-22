import React, { useEffect, useState } from 'react';
import { useMqtt } from '../mqttContext';

export const Navbar: React.FC = () => {
  const { state } = useMqtt();
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="h-16 px-4 sm:px-8 flex items-center justify-between border-b border-pink-100/50 bg-white/40 backdrop-blur-md shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-tr from-pink-400 to-emerald-300 rounded-xl flex items-center justify-center shadow-sm">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-800 leading-none">Smart Home IoT</h1>
          <p className="text-[10px] text-pink-500 uppercase tracking-widest font-semibold hidden sm:block mt-1">Realtime Monitoring & Control</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4 sm:gap-6">
        <div className={`flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full border ${state.status.mqttConnected ? 'bg-emerald-100/60 border-emerald-200' : 'bg-red-100/60 border-red-200'}`}>
          <div className={`w-2 h-2 rounded-full ${state.status.mqttConnected ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
          <span className={`text-[10px] sm:text-xs font-medium uppercase ${state.status.mqttConnected ? 'text-emerald-700' : 'text-red-700'}`}>
            {state.status.mqttConnected ? 'MQTT Connected' : 'MQTT Offline'}
          </span>
        </div>
        <div className="text-right hidden sm:block">
          <div className="text-sm font-bold text-slate-800">{time.toLocaleTimeString([], { hour12: false })}</div>
          <div className="text-[10px] text-slate-400">{time.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
        </div>
      </div>
    </nav>
  );
};
