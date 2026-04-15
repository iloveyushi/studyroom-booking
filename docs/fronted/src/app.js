const API_BASE = "http://localhost:9099";

async function api(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || `HTTP ${response.status}`);
  }
  return data;
}

function print(id, value) {
  document.getElementById(id).textContent = JSON.stringify(value, null, 2);
}

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const result = await api("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password })
    });
    print("meResult", result);
  } catch (error) {
    print("meResult", { success: false, message: error.message });
  }
});

document.getElementById("meBtn").addEventListener("click", async () => {
  try {
    const result = await api("/api/auth/me");
    print("meResult", result);
  } catch (error) {
    print("meResult", { success: false, message: error.message });
  }
});

document.getElementById("availableBtn").addEventListener("click", async () => {
  try {
    const result = await api("/api/user/reservations/available");
    print("availableResult", result);
  } catch (error) {
    print("availableResult", { success: false, message: error.message });
  }
});

document.getElementById("logoutBtn").addEventListener("click", async () => {
  try {
    const result = await api("/api/auth/logout", { method: "POST" });
    print("logoutResult", result);
  } catch (error) {
    print("logoutResult", { success: false, message: error.message });
  }
});
