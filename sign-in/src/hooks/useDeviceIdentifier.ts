import { useState, useEffect } from 'react';

export interface DeviceInfo {
  browser: string;
  os: string;
  deviceLabel: string; // e.g., 'Chrome on macOS' or 'Safari on iOS'
  approxLocation: string;
  timestamp: string;
  ipMasked: string;
  isCurrentSession: boolean;
}

export function useDeviceIdentifier(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(() => detectDevice());

  useEffect(() => {
    setDeviceInfo(detectDevice());
  }, []);

  return deviceInfo;
}

export function detectDevice(): DeviceInfo {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return {
      browser: 'Web Browser',
      os: 'Unknown OS',
      deviceLabel: 'Web Browser on Device',
      approxLocation: 'Lagos, Nigeria',
      timestamp: 'Today at ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ipMasked: '102.89.***.**',
      isCurrentSession: true,
    };
  }

  const ua = navigator.userAgent;

  // 1. Detect Operating System
  let os = 'Unknown OS';
  if (/Macintosh|Mac OS X/i.test(ua)) {
    os = 'macOS';
  } else if (/Windows NT 10|Windows NT 11/i.test(ua)) {
    os = 'Windows';
  } else if (/Android/i.test(ua)) {
    os = 'Android';
  } else if (/iPhone|iPad|iPod/i.test(ua)) {
    os = 'iOS';
  } else if (/Linux/i.test(ua)) {
    os = 'Linux';
  }

  // 2. Detect Browser
  let browser = 'Browser';
  if (/Edg\//i.test(ua)) {
    browser = 'Edge';
  } else if (/Chrome\//i.test(ua) && !/Edg\//i.test(ua)) {
    browser = 'Chrome';
  } else if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) {
    browser = 'Safari';
  } else if (/Firefox\//i.test(ua)) {
    browser = 'Firefox';
  } else if (/Opera|OPR\//i.test(ua)) {
    browser = 'Opera';
  }

  // Exact requested format: e.g., 'Chrome on macOS'
  const deviceLabel = `${browser} on ${os}`;

  const timeFormatted = 'Today at ' + new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return {
    browser,
    os,
    deviceLabel,
    approxLocation: 'Lagos, NG (Enterprise IP)',
    timestamp: timeFormatted,
    ipMasked: '102.89.14.*',
    isCurrentSession: true,
  };
}
