/**
 * storage.js
 * 役割（仕様メモ）：
 * - localStorage に state.data を保存/読込する（オフライン運用）
 * - 起動時に「保存済みデータがあればそれを使う / なければ defaultData を使う」
 * - 保存データが壊れていても最低限動くように補完する
 *
 * 依存：
 * - defaultData（state.js）
 * - state（state.js）
 *
 * 読み込み順（index.html）：
 *   state.js → storage.js → assignments.js → main.js
 */

console.log("storage.js loaded");

// ★キーは固定（これを変えると過去データは読めなくなります）
const DATA_KEY = "rika4_evaltool_v1";

function safeClone(obj) {
  if (obj == null) return obj;
  return JSON.parse(JSON.stringify(obj));
}

function loadData() {
  try {
    const raw = localStorage.getItem(DATA_KEY);

    // デバッグ：今どの origin で動いているか（localhost / github pages など）
    console.log("[loadData] origin:", location.origin);
    console.log("[loadData] has raw:", !!raw, raw ? `(len=${raw.length})` : "");

    if (!raw) return safeClone(defaultData);

    const d = JSON.parse(raw);

    // ---- 最低限の補完（壊れてても動くように） ----
    if (!Array.isArray(d.students)) d.students = safeClone(defaultData.students);
    if (!Array.isArray(d.assignments)) d.assignments = safeClone(defaultData.assignments);
    if (!d.assignStatusByStudent || typeof d.assignStatusByStudent !== "object") {
      d.assignStatusByStudent = {};
    }

    return d;
  } catch (e) {
    console.warn("loadData failed:", e);
    try {
      return safeClone(defaultData);
    } catch (_) {
      return { students: [], assignments: [], assignStatusByStudent: {} };
    }
  }
}

function saveData() {
  try {
    if (typeof state === "undefined" || !state || !state.data) {
      console.warn("[saveData] skipped: state.data is missing");
      return;
    }

    const json = JSON.stringify(state.data);
    localStorage.setItem(DATA_KEY, json);

    // デバッグ：保存できたか即確認
    const verify = localStorage.getItem(DATA_KEY);
    console.log("[saveData] ok:", !!verify, verify ? `(len=${verify.length})` : "");
  } catch (e) {
    console.error("saveData failed:", e);
    alert("保存に失敗しました（容量上限の可能性）");
  }
}

// ★main.js からそのまま呼べるようにグローバル公開（初心者向け）
window.loadData = loadData;
window.saveData = saveData;

// ★デバッグ用（任意）
window.rikaStorage = {
  DATA_KEY,
  loadData,
  saveData,
};