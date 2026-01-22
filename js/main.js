/**
 * main.js
 * 役割：
 * - 起動処理（loadDataでstateへ）
 * - ボタンなどイベントを結ぶ
 */

console.log("main.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded");

  // ① 起動時に読み込み
  state.data = loadData();
  state.currentStudent = state.data.students[0] || null;
  state.currentAssignId = state.data.assignments[0]?.id || null;

  console.log("loaded data:", state.data);

  // ② テストボタン押したら students に1人追加して保存
  const btn = document.getElementById("testBtn");
  btn.addEventListener("click", () => {
    const newName = `追加児童_${Date.now()}`;
    state.data.students.push(newName);
    saveData();
    console.log("saved! added:", newName);
  });
});