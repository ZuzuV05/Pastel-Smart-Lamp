import React, { useEffect, useRef, useState } from 'react';
import { useMqtt } from '../mqttContext';

export const NotificationPanel: React.FC = () => {
  const { state } = useMqtt();
  const logsEndRef = useRef<HTMLDivElement>(null);
  const [timeAgo, setTimeAgo] = useState('Just Now');

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    
    // reset to just now when we get a new state update
    setTimeAgo('Just Now');
    
    const interval = setInterval(() => {
      const seconds = Math.floor((new Date().getTime() - state.lastUpdate.getTime()) / 1000);
      if (seconds < 60) {
        setTimeAgo(`${seconds} Seconds Ago`);
      } else {
        setTimeAgo(`${Math.floor(seconds/60)} Minutes Ago`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [state.logs, state.lastUpdate]);

  return (
    <div className="flex-1 bg-white/40 border border-white rounded-[2rem] p-6 backdrop-blur-md overflow-hidden flex flex-col h-full min-h-[250px]">
      <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Activity Log</h3>
      
      <div className="space-y-3 font-mono text-[11px] overflow-y-auto flex-1 pr-2 pb-2">
        {[...state.logs].reverse().map((log) => {
          const isError = log.message.toLowerCase().includes('error') || log.message.toLowerCase().includes('fail');
          const isSuccess = log.message.toLowerCase().includes('on') || log.message.toLowerCase().includes('connected');
          const isPink = log.message.toLowerCase().includes('variasi');
          
          let borderColor = 'border-slate-200';
          let timeColor = 'text-slate-400';
          let textColor = 'text-slate-500';

          if (isError) {
            borderColor = 'border-red-400';
            timeColor = 'text-red-400';
            textColor = 'text-red-500';
          } else if (isPink) {
            borderColor = 'border-pink-400';
            timeColor = 'text-pink-400';
            textColor = 'text-slate-600';
          } else if (isSuccess) {
            borderColor = 'border-emerald-400';
            timeColor = 'text-emerald-400';
            textColor = 'text-slate-600';
          }

          return (
            <div key={log.id} className={`flex gap-3 bg-white/50 p-2.5 rounded-xl border-l-2 ${borderColor}`}>
              <span className={`font-bold shrink-0 ${timeColor}`}>
                {log.timestamp.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
              <span className={`break-words ${textColor}`}>{log.message}</span>
            </div>
          );
        })}
        <div ref={logsEndRef} />
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase shrink-0">
        <span>Last Update</span>
        <span className="text-pink-500">{timeAgo}</span>
      </div>
    </div>
  );
};
