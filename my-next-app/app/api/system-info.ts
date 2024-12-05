// pages/api/system-info.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import si from 'systeminformation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const battery = await si.battery();
    const cpuLoad = await si.currentLoad();

    res.status(200).json({
      batteryPercentage: battery.hasBattery ? battery.percent : null,
      cpuLoad: cpuLoad.currentLoad,
    });
  } catch (error) {
    console.error('Error fetching system information:', error);
    res.status(500).json({ error: 'Failed to fetch system information' });
  }
}