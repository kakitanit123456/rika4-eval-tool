/**
 * assignments.js
 * 役割：
 * - 提出物に関する処理
 */

function renderAssignments() {
  const app = document.getElementById("app");
  if (!app) return;

  app.innerHTML = `
    <h2>提出物</h2>
    <button id="addAssign">追加</button>
    <ul id="assignList"></ul>
  `;

  document.getElementById("addAssign").onclick = () => {
    state.assignments.push("新しい提出物");
    saveState();
    renderAssignments();
  };

  const ul = document.getElementById("assignList");
  state.assignments.forEach(a => {
    const li = document.createElement("li");
    li.textContent = a;
    ul.appendChild(li);
  });
}