import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import mqtt, { MqttClient } from 'mqtt';
import { AppState, LogEntry, RelayStatus } from './types';

interface MqttContextType {
  client: MqttClient | null;
  state: AppState;
  publish: (topic: string, message: string) => void;
}

const defaultState: AppState = {
  temperature: 29,
  humidity: 75,
  relays: {
    lampu1: 'ON',
    lampu2: 'OFF',
    lampu3: 'ON',
    lampu4: 'OFF',
  },
  variation: 'STOP',
  status: {
    esp32Online: false,
    mqttConnected: false,
    telegramConnected: true,
    sensorActive: true,
  },
  logs: [],
  lastUpdate: new Date(),
};

const MqttContext = createContext<MqttContextType>({
  client: null,
  state: defaultState,
  publish: () => {},
});

export const useMqtt = () => useContext(MqttContext);

const BROKER_URL = 'wss://broker.hivemq.com:8884/mqtt';

export const MqttProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [state, setState] = useState<AppState>(defaultState);
  const logsRef = useRef<LogEntry[]>([]);

  const addLog = (message: string) => {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      message,
      timestamp: new Date(),
    };
    logsRef.current = [newLog, ...logsRef.current].slice(0, 50); // keep last 50 logs
    setState((prev) => ({ ...prev, logs: logsRef.current, lastUpdate: new Date() }));
  };

  useEffect(() => {
    // Initial dummy data logs
    addLog('System initialized with dummy data.');

    const mqttClient = mqtt.connect(BROKER_URL, {
      reconnectPeriod: 5000,
    });

    setClient(mqttClient);

    mqttClient.on('connect', () => {
      setState((prev) => ({
        ...prev,
        status: { ...prev.status, mqttConnected: true, esp32Online: true },
        lastUpdate: new Date(),
      }));
      addLog('MQTT Connected to broker');
      mqttClient.subscribe('smarthome/#');
    });

    mqttClient.on('reconnect', () => {
      addLog('MQTT Reconnecting...');
    });

    mqttClient.on('offline', () => {
      setState((prev) => ({
        ...prev,
        status: { ...prev.status, mqttConnected: false, esp32Online: false },
        lastUpdate: new Date(),
      }));
      addLog('MQTT Offline');
    });

    mqttClient.on('error', (err) => {
      addLog(`MQTT Error: ${err.message}`);
    });

    mqttClient.on('message', (topic, payload) => {
      const message = payload.toString();
      setState((prev) => ({ ...prev, lastUpdate: new Date() }));

      switch (topic) {
        case 'smarthome/suhu':
          setState((prev) => ({ ...prev, temperature: parseFloat(message) }));
          addLog(`Suhu diupdate: ${message}°C`);
          break;
        case 'smarthome/kelembaban':
          setState((prev) => ({ ...prev, humidity: parseFloat(message) }));
          addLog(`Kelembaban diupdate: ${message}%`);
          break;
        case 'smarthome/lampu1':
        case 'smarthome/lampu2':
        case 'smarthome/lampu3':
        case 'smarthome/lampu4':
          const lampKey = topic.split('/')[1] as keyof AppState['relays'];
          setState((prev) => ({
            ...prev,
            relays: { ...prev.relays, [lampKey]: message as RelayStatus },
          }));
          addLog(`Status ${lampKey} menjadi ${message}`);
          break;
        case 'smarthome/variasi':
          setState((prev) => ({ ...prev, variation: message as any }));
          addLog(message === 'STOP' ? 'Variasi stopped' : `${message} Activated`);
          break;
        case 'smarthome/status':
          // Assuming payload is JSON for status, but fallback to simple string
          try {
            const parsedStatus = JSON.parse(message);
            setState((prev) => ({
              ...prev,
              status: { ...prev.status, ...parsedStatus },
            }));
            addLog('Status device diperbarui');
          } catch (e) {
            const upperMsg = message.toUpperCase();
            if (upperMsg === 'ONLINE' || upperMsg === 'CONNECTED') {
              setState((prev) => ({ ...prev, status: { ...prev.status, esp32Online: true } }));
            } else if (upperMsg === 'OFFLINE' || upperMsg === 'DISCONNECTED') {
              setState((prev) => ({ ...prev, status: { ...prev.status, esp32Online: false } }));
            }
            // we ignore other malformed payloads gracefully instead of erroring out
          }
          break;
        default:
          break;
      }
    });

    return () => {
      mqttClient.end();
    };
  }, []);

  const publish = (topic: string, message: string) => {
    if (client && client.connected) {
      client.publish(topic, message);
      // We also update state optimistically or rely on the loopback from broker
    } else {
      addLog('Failed to publish: MQTT not connected');
    }
  };

  return (
    <MqttContext.Provider value={{ client, state, publish }}>
      {children}
    </MqttContext.Provider>
  );
};
