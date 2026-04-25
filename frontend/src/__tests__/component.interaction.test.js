const { fireEvent, screen } = require("@testing-library/dom");
const { bindApp } = require("../app");

function createPage() {
  document.body.innerHTML = `
    <main>
      <form id="loginForm">
        <input id="username" />
        <input id="password" />
        <button type="submit">登录</button>
      </form>
      <button id="meBtn">读取 me</button>
      <pre id="meResult"></pre>
      <button id="availableBtn">读取 available</button>
      <pre id="availableResult"></pre>
      <button id="logoutBtn">退出</button>
      <pre id="logoutResult"></pre>
    </main>
  `;
}

function delayedResolve(data) {
  return new Promise((resolve) => setTimeout(() => resolve(data), 0));
}

describe("组件渲染/交互测试", () => {
  beforeEach(() => {
    createPage();
  });

  test("登录提交会触发 API 调用并显示结果", async () => {
    const apiClient = jest.fn().mockResolvedValue({
      success: true,
      message: "ok",
      data: { user: { id: "32001041" } }
    });
    bindApp(document, apiClient);

    document.getElementById("username").value = " 32001041 ";
    document.getElementById("password").value = " 123 ";
    fireEvent.submit(document.getElementById("loginForm"));

    await Promise.resolve();

    expect(apiClient).toHaveBeenCalledWith("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username: "32001041", password: "123" })
    });
    expect(document.getElementById("meResult").textContent).toContain('"success": true');
  });

  test("点击 me 按钮会调用 /api/auth/me", async () => {
    const apiClient = jest.fn().mockResolvedValue({
      success: true,
      data: { s_id: "32001041" }
    });
    bindApp(document, apiClient);

    fireEvent.click(screen.getByText("读取 me"));
    await Promise.resolve();

    expect(apiClient).toHaveBeenCalledWith("/api/auth/me");
  });

  test("点击 available 按钮会渲染可预约数据", async () => {
    const apiClient = jest.fn().mockResolvedValue({
      success: true,
      data: [{ roomId: "R101" }]
    });
    bindApp(document, apiClient);

    fireEvent.click(screen.getByText("读取 available"));
    await Promise.resolve();

    expect(document.getElementById("availableResult").textContent).toContain("R101");
  });

  test("点击 logout 按钮会用 POST 调用退出接口", async () => {
    const apiClient = jest.fn().mockResolvedValue({
      success: true,
      message: "logout success"
    });
    bindApp(document, apiClient);

    fireEvent.click(screen.getByText("退出"));
    await Promise.resolve();

    expect(apiClient).toHaveBeenCalledWith("/api/auth/logout", { method: "POST" });
  });

  test("登录失败会显示错误信息", async () => {
    const apiClient = jest.fn().mockRejectedValue(new Error("用户名或密码错误"));
    bindApp(document, apiClient);

    document.getElementById("username").value = "bad";
    document.getElementById("password").value = "bad";
    fireEvent.submit(document.getElementById("loginForm"));
    await Promise.resolve();

    expect(document.getElementById("meResult").textContent).toContain("用户名或密码错误");
  });

  test("点击 me 后会先显示加载状态", async () => {
    const apiClient = jest.fn().mockImplementation(() =>
      delayedResolve({ success: true, data: { name: "Alice" } })
    );
    bindApp(document, apiClient);

    fireEvent.click(screen.getByText("读取 me"));
    expect(document.getElementById("meResult").textContent).toContain('"loading": true');
  });

  test("点击 available 失败会显示错误信息", async () => {
    const apiClient = jest.fn().mockRejectedValue(new Error("Network Error"));
    bindApp(document, apiClient);

    fireEvent.click(screen.getByText("读取 available"));
    await Promise.resolve();

    expect(document.getElementById("availableResult").textContent).toContain("Network Error");
  });

  test("点击 logout 后会先显示加载状态", async () => {
    const apiClient = jest.fn().mockImplementation(() =>
      delayedResolve({ success: true, message: "ok" })
    );
    bindApp(document, apiClient);

    fireEvent.click(screen.getByText("退出"));
    expect(document.getElementById("logoutResult").textContent).toContain('"loading": true');
  });
});
