import React from 'react';
import { useMqtt } from '../mqttContext';

export const StatusCard: React.FC = () => {
  const { state } = useMqtt();
  const { status } = state;

  return (
    <div className="bg-slate-900 rounded-[2rem] p-6 text-white shadow-2xl shrink-0">
      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Hardware Status</h3>
      <div className="space-y-4">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${status.esp32Online ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-slate-500'}`}></div>
            <span className="text-xs font-medium text-slate-200">ESP32 Core</span>
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded-full ${status.esp32Online ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>{status.esp32Online ? 'ONLINE' : 'OFFLINE'}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${status.mqttConnected ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-slate-500'}`}></div>
            <span className="text-xs font-medium text-slate-200">MQTT Node</span>
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded-full ${status.mqttConnected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>{status.mqttConnected ? 'STABLE' : 'OFFLINE'}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${status.telegramConnected ? 'bg-pink-400 shadow-[0_0_8px_rgba(244,114,182,0.8)]' : 'bg-slate-500'}`}></div>
            <span className="text-xs font-medium text-slate-200">Telegram Bot</span>
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded-full ${status.telegramConnected ? 'bg-pink-500/20 text-pink-400' : 'bg-slate-800 text-slate-400'}`}>{status.telegramConnected ? 'LISTENING' : 'OFFLINE'}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${status.sensorActive ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-slate-500'}`}></div>
            <span className="text-xs font-medium text-slate-200">Sensor Active</span>
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded-full ${status.sensorActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>{status.sensorActive ? 'REALTIME' : 'OFFLINE'}</span>
        </div>

      </div>
    </div>
  );
};
