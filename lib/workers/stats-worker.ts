import { getTransfersToAddress, type TransferEvent } from "../kiteindex";

export interface ServiceStats {
  reliability_30d: number;
  avg_latency_ms_30d: number;
  total_calls_30d: number;
  unique_callers_30d: number;
  last_call_at: string | null;
}

export async function computeServiceStats(
  serviceAddress: string,
): Promise<ServiceStats> {
  const now = Math.floor(Date.now() / 1000);
  const thirtyDaysAgo = now - 30 * 86400;

  const transfers = await getTransfersToAddress(serviceAddress, thirtyDaysAgo);

  if (transfers.length === 0) {
    return {
      reliability_30d: 0,
      avg_latency_ms_30d: 0,
      total_calls_30d: 0,
      unique_callers_30d: 0,
      last_call_at: null,
    };
  }

  const uniqueCallers = new Set(transfers.map((t) => t.from.toLowerCase()));
  const lastCall = transfers[0];

  return {
    reliability_30d: 100,
    avg_latency_ms_30d: 0,
    total_calls_30d: transfers.length,
    unique_callers_30d: uniqueCallers.size,
    last_call_at: new Date(Number(lastCall.timestamp) * 1000).toISOString(),
  };
}
