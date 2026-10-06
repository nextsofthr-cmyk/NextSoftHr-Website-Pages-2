export interface DeviceSecurityProfile {
  isKnownDevice: boolean;
  deviceName: string;
  osName: string;
  browserName: string;
  approxLocation: string;
  ipMasked: string;
  riskScore: 'low' | 'moderate' | 'elevated';
  requiresStepUpVerification: boolean;
}

const KNOWN_DEVICE_STORAGE_KEY = 'nextsofthr_known_device_fingerprint';

export function getDeviceSecurityProfile(): DeviceSecurityProfile {
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';

  // Detect OS
  let osName = 'Unknown OS';
  if (/Macintosh|Mac OS X/.test(ua)) osName = 'macOS Sonoma';
  else if (/Windows NT 10/.test(ua)) osName = 'Windows 11 Enterprise';
  else if (/Linux/.test(ua)) osName = 'Linux x86_64';
  else if (/iPhone|iPad/.test(ua)) osName = 'iOS 18.2';
  else if (/Android/.test(ua)) osName = 'Android 15';

  // Detect Browser
  let browserName = 'Secure Browser';
  if (/Chrome\//.test(ua) && !/Edg\//.test(ua)) browserName = 'Chrome Enterprise';
  else if (/Edg\//.test(ua)) browserName = 'Microsoft Edge Secure';
  else if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) browserName = 'Apple Safari';
  else if (/Firefox\//.test(ua)) browserName = 'Mozilla Firefox';

  // Local storage check for recognized device
  let isKnownDevice = false;
  try {
    const stored = localStorage.getItem(KNOWN_DEVICE_STORAGE_KEY);
    if (stored) {
      isKnownDevice = true;
    }
  } catch {
    isKnownDevice = false;
  }

  // Device model label
  const deviceName = `${osName} • ${browserName}`;

  return {
    isKnownDevice,
    deviceName,
    osName,
    browserName,
    approxLocation: 'Lagos, Nigeria (IP Geo)',
    ipMasked: '102.89.***.** (Starlink / MTN)',
    riskScore: isKnownDevice ? 'low' : 'moderate',
    requiresStepUpVerification: !isKnownDevice,
  };
}

export function trustCurrentDevice(): void {
  try {
    localStorage.setItem(KNOWN_DEVICE_STORAGE_KEY, JSON.stringify({
      timestamp: Date.now(),
      trustedUntil: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
    }));
  } catch (e) {
    console.error('Failed to trust device:', e);
  }
}

export function forgetCurrentDevice(): void {
  try {
    localStorage.removeItem(KNOWN_DEVICE_STORAGE_KEY);
  } catch (e) {
    console.error('Failed to forget device:', e);
  }
}
