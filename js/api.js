function resolveApiBaseUrl() {
  const { protocol, hostname, port } = window.location;
  const isLocalHost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';

  if (protocol === 'file:' || (isLocalHost && port && port !== '3000')) {
    return 'http://localhost:3000';
  }

  return '';
}

const API_BASE_URL = resolveApiBaseUrl();

async function requestJson(url, options = {}) {
  const method = options.method || 'GET';
  const body = options.body;
  const headers = { ...(options.headers || {}) };

  if (body && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    method,
    body,
    headers,
    credentials: API_BASE_URL ? 'include' : 'same-origin'
  });

  let payload = null;
  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    payload = await response.json();
  } else {
    payload = await response.text();
  }

  if (!response.ok) {
    const message = payload && payload.message ? payload.message : 'Erro ao processar a solicitação.';
    throw new Error(message);
  }

  return payload;
}

async function getSessionInfo() {
  try {
    return await requestJson('/api/auth/me');
  } catch (error) {
    return null;
  }
}
