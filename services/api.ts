export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(endpoint, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    let errorMsg = 'An API error occurred';
    try {
      const errData = await res.json();
      errorMsg = errData.error || errorMsg;
    } catch {
      // JSON parse error
    }
    throw new Error(errorMsg);
  }

  return res.json();
}
