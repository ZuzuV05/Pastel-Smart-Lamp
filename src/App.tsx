/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Dashboard } from './components/Dashboard';
import { MqttProvider } from './mqttContext';

export default function App() {
  return (
    <MqttProvider>
      <Dashboard />
    </MqttProvider>
  );
}

