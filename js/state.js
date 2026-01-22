/**
 * state.js
 * 役割：
 * - アプリ全体の「状態（state）」を管理する
 * - defaultData（初期データの設計図）を持つ
 */

console.log("state.js loaded");

// 初期データ（設計図）
const defaultData = {
  students: ["（サンプル）児童A", "（サンプル）児童B"],
  assignments: [
    { id: "a1", title: "ノート提出" },
    { id: "a2", title: "まとめシート" },
  ],
  assignStatusByStudent: {} // 児童×提出物の提出状態（あとで自動生成）
};

// アプリ状態（あとで storage.js の loadData() の結果を入れる）
const state = {
  data: null,
  currentStudent: null,
  currentAssignId: null,
};