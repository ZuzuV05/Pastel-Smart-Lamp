import React from 'react';
import { Navbar } from './Navbar';
import { SensorCard } from './SensorCard';
import { RelayCard } from './RelayCard';
import { VariationControl } from './VariationControl';
import { StatusCard } from './StatusCard';
import { NotificationPanel } from './NotificationPanel';
import { GlobalRelayControl } from './GlobalRelayControl';

export const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col h-screen w-full bg-gradient-to-br from-pink-50 via-white to-emerald-50 font-sans text-slate-700 overflow-hidden">
      <Navbar />
      
      <main className="flex-1 p-4 sm:p-6 grid grid-cols-12 gap-6 overflow-y-auto max-w-[1600px] mx-auto w-full">
        
        {/* Left Section: Sensors & Control */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          <SensorCard />
          
          <div className="flex flex-col gap-2">
            <GlobalRelayControl />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <RelayCard id="lampu1" title="Lampu 1" />
              <RelayCard id="lampu2" title="Lampu 2" />
              <RelayCard id="lampu3" title="Lampu 3" />
              <RelayCard id="lampu4" title="Lampu 4" />
            </div>
          </div>

          <VariationControl />
        </div>

        {/* Right Section: Status & Logs */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 h-full min-h-[500px]">
          <StatusCard />
          <NotificationPanel />
        </div>

      </main>
    </div>
  );
};
