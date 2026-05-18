const KITEINDEX_URL = process.env.KITEINDEX_GRAPHQL_URL || "http://localhost:42069/graphql/public";

export async function gqlQuery<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(KITEINDEX_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`KiteIndex HTTP ${res.status}`);
  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors[0].message);
  return json.data as T;
}

export interface TransferEvent {
  from: string;
  to: string;
  value: string;
  blockNumber: string;
  timestamp: string;
  transactionHash: string;
}

export async function getTransfersToAddress(address: string, since: number): Promise<TransferEvent[]> {
  const data = await gqlQuery<{ transferEvents: { items: TransferEvent[] } }>(
    `query($addr: String!, $since: Int!) {
      transferEvents(where: { to: $addr, timestamp_gte: $since }, limit: 1000, orderBy: "blockNumber", orderDirection: "desc") {
        items { from to value blockNumber timestamp transactionHash }
      }
    }`,
    { addr: address.toLowerCase(), since }
  );
  return data.transferEvents.items;
}
