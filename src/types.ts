export interface LogEntry {
  id: string;
  message: string;
  timestamp: Date;
}

export interface SystemStatus {
  esp32Online: boolean;
  mqttConnected: boolean;
  telegramConnected: boolean;
  sensorActive: boolean;
}

export type RelayStatus = 'ON' | 'OFF';

export interface AppState {
  temperature: number;
  humidity: number;
  relays: {
    lampu1: RelayStatus;
    lampu2: RelayStatus;
    lampu3: RelayStatus;
    lampu4: RelayStatus;
  };
  variation: 'VARIASI1' | 'VARIASI2' | 'STOP';
  status: SystemStatus;
  logs: LogEntry[];
  lastUpdate: Date;
}
