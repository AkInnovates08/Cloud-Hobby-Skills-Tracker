// Leave VITE_API_URL empty for local development so Vite proxies /api to FastAPI.
// For production, set VITE_API_URL to the deployed backend URL.
const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

export function getApiBaseUrl() {
  return API_URL || "same-origin Vite proxy";
}

async function request(path, options = {}) {
  const token = localStorage.getItem("hobby_token");
  const headers = { ...(options.headers || {}) };
  if (!(options.body instanceof FormData)) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
      signal: controller.signal,
    });

    let data = null;
    try { data = await response.json(); } catch { /* empty response */ }

    if (!response.ok) {
      const detail = Array.isArray(data?.detail)
        ? data.detail.map(x => x.msg).join(", ")
        : data?.detail;
      throw new Error(detail || `Request failed (${response.status})`);
    }

    return data;
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error("The backend took too long to respond. Make sure FastAPI is running on port 8000.");
    }
    if (err instanceof TypeError) {
      throw new Error("Cannot reach FastAPI. Start the backend with: uvicorn app.main:app --reload --port 8000");
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

export const api = {
  get: (p) => request(p),
  post: (p, body) => request(p, {
    method: "POST",
    body: body instanceof FormData ? body : JSON.stringify(body),
  }),
  put: (p, body) => request(p, {
    method: "PUT",
    body: JSON.stringify(body),
  }),
  del: (p) => request(p, { method: "DELETE" }),
};
