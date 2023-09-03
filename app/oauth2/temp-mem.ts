import fs from 'fs/promises';

export interface CloudTokenData {
    access_token: string;
    hostname: string;
    userid: number | string;
    locationid: string;
}

interface CloudTokenDataWithCachedOn extends CloudTokenData {
    cachedOn: number;
}

const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

export async function get(key: string) {
  const data = await read();
  const value = data[key];
  if (!value || Date.now() - value.cachedOn > CACHE_DURATION) {
    return null;
  }

  return value;
}

export async function set(value: CloudTokenData) {
  const key = Array.from(value.userid.toString()).reverse().slice(0, 4).join('');
  const data = await read();
  cleanup(data);
  data[key] = { ...value, cachedOn: Date.now() };
  await write(data);

  return key;
}

async function read() {
    const file = await fs.readFile('./temp-mem.json', 'utf-8').catch(() => '{}');
    return JSON.parse(file) as Record<string, CloudTokenDataWithCachedOn>;
}

async function write(data: Record<string, CloudTokenDataWithCachedOn>) {
    await fs.writeFile('./temp-mem.json', JSON.stringify(data));
}

function cleanup(data: Record<string, CloudTokenDataWithCachedOn>) {
    for (const key in data) {
        if (Date.now() - data[key].cachedOn > CACHE_DURATION) {
            delete data[key];
        }
    }
}
