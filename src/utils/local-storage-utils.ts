export function getNumber(key: string, defaultValue: number): number {
  const item = localStorage.getItem(key);
  return item === null ? defaultValue : parseInt(item, 10);
}

export function setNumber(key: string, value: number) {
  localStorage.setItem(key, String(value));
}

export function getString(key: string, defaultValue: string): string {
  const item = localStorage.getItem(key);
  return item === null ? defaultValue : item;
}

export function setString(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function getBoolean(key: string, defaultValue: boolean): boolean {
  const item = localStorage.getItem(key);
  return item === null ? defaultValue : JSON.parse(item);
}

export function setBoolean(key: string, value: boolean) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getObject<T extends object>(
  key: string,
  defaultValue: T | null
): T | null {
  const item = localStorage.getItem(key);
  return item === null ? defaultValue : JSON.parse(item);
}

export function setObject<T extends object>(key: string, value: T | null) {
  localStorage.setItem(key, JSON.stringify(value));
}
