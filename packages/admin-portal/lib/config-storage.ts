import { WidgetConfig } from '@credit-scoring/shared';
import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const CONFIGS_FILE = path.join(DATA_DIR, 'configs.json');

// Initialize data directory and file
async function ensureDataFile() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }

  try {
    await fs.access(CONFIGS_FILE);
  } catch {
    await fs.writeFile(CONFIGS_FILE, JSON.stringify([], null, 2));
  }
}

export async function getAllConfigs(): Promise<WidgetConfig[]> {
  await ensureDataFile();
  const data = await fs.readFile(CONFIGS_FILE, 'utf-8');
  return JSON.parse(data);
}

export async function getConfigById(id: string): Promise<WidgetConfig | null> {
  const configs = await getAllConfigs();
  return configs.find(c => c.id === id) || null;
}

export async function createConfig(config: WidgetConfig): Promise<WidgetConfig> {
  const configs = await getAllConfigs();

  // Check if ID already exists
  if (configs.find(c => c.id === config.id)) {
    throw new Error(`Config with ID ${config.id} already exists`);
  }

  configs.push(config);
  await fs.writeFile(CONFIGS_FILE, JSON.stringify(configs, null, 2));
  return config;
}

export async function updateConfig(id: string, config: Partial<WidgetConfig>): Promise<WidgetConfig> {
  const configs = await getAllConfigs();
  const index = configs.findIndex(c => c.id === id);

  if (index === -1) {
    throw new Error(`Config with ID ${id} not found`);
  }

  configs[index] = { ...configs[index], ...config };
  await fs.writeFile(CONFIGS_FILE, JSON.stringify(configs, null, 2));
  return configs[index];
}

export async function deleteConfig(id: string): Promise<void> {
  const configs = await getAllConfigs();
  const filtered = configs.filter(c => c.id !== id);

  if (filtered.length === configs.length) {
    throw new Error(`Config with ID ${id} not found`);
  }

  await fs.writeFile(CONFIGS_FILE, JSON.stringify(filtered, null, 2));
}
