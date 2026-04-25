(function initFrontend(globalObj) {
  const API_BASE = "";

  function createApiClient(fetchImpl, baseUrl) {
    return async function request(path, options = {}) {
      const response = await fetchImpl(`${baseUrl}${path}`, {
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
    };
  }

  function printJson(doc, id, value) {
    const el = doc.getElementById(id);
    if (el) {
      el.textContent = JSON.stringify(value, null, 2);
    }
  }

  function bindApp(doc, apiClient) {
    const loginForm = doc.getElementById("loginForm");
    const meBtn = doc.getElementById("meBtn");
    const availableBtn = doc.getElementById("availableBtn");
    const logoutBtn = doc.getElementById("logoutBtn");

    if (!loginForm || !meBtn || !availableBtn || !logoutBtn) {
      return;
    }

    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        const username = doc.getElementById("username").value.trim();
        const password = doc.getElementById("password").value.trim();
        printJson(doc, "meResult", { success: true, loading: true, message: "loading" });
        const result = await apiClient("/api/auth/login", {
          method: "POST",
          body: JSON.stringify({ username, password })
        });
        printJson(doc, "meResult", result);
      } catch (error) {
        printJson(doc, "meResult", { success: false, message: error.message });
      }
    });

    meBtn.addEventListener("click", async () => {
      try {
        printJson(doc, "meResult", { success: true, loading: true, message: "loading" });
        const result = await apiClient("/api/auth/me");
        printJson(doc, "meResult", result);
      } catch (error) {
        printJson(doc, "meResult", { success: false, message: error.message });
      }
    });

    availableBtn.addEventListener("click", async () => {
      try {
        printJson(doc, "availableResult", { success: true, loading: true, message: "loading" });
        const result = await apiClient("/api/user/reservations/available");
        printJson(doc, "availableResult", result);
      } catch (error) {
        printJson(doc, "availableResult", { success: false, message: error.message });
      }
    });

    logoutBtn.addEventListener("click", async () => {
      try {
        printJson(doc, "logoutResult", { success: true, loading: true, message: "loading" });
        const result = await apiClient("/api/auth/logout", { method: "POST" });
        printJson(doc, "logoutResult", result);
      } catch (error) {
        printJson(doc, "logoutResult", { success: false, message: error.message });
      }
    });
  }

  const exported = { createApiClient, printJson, bindApp };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = exported;
  }

  if (globalObj.document && globalObj.fetch) {
    bindApp(globalObj.document, createApiClient(globalObj.fetch.bind(globalObj), API_BASE));
  }
})(typeof window !== "undefined" ? window : globalThis);
