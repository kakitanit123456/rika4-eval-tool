/**
 * main.js
 * アプリ全体の起点ファイル
 * ここから他の機能を呼び出す
 */

import { state } from "./state.js";
import { loadState, saveState } from "./storage.js";

document.addEventListener("DOMContentLoaded", () => {
  loadState();
  renderAll();
  bindEvents();
});

function renderAll() {
  renderStudentSelect();
  // renderSteps();
  // renderAssignments();
}

function bindEvents() {
  const sel = document.getElementById("mainStudentSelect");
  if (sel) {
    sel.addEventListener("change", () => {
      state.currentStudent = sel.value;
      saveState();
      renderAll();
    });
  }
}