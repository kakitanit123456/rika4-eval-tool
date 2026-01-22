/**
 * storage.js
 * --------------------------------
 * データの保存・読み込みを担当
 *
 * ・localStorage とのやりとり
 * ・キー名の一元管理
 *
 * ※ 画面操作はしない
 * ※ state の中身を直接いじらない
 */

const STORAGE_KEY = "rika4_evaltool_v1"; //保存キーの定義

import { state } from "./state.js";

/**
 * 保存
 */
export function saveState() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(state)
  );
}

/**
 * 読み込み
 */
export function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  try {
    const data = JSON.parse(raw);

    // state を丸ごと上書き（シンプル版）
    Object.assign(state, data);
  } catch (e) {
    console.error("保存データの読み込みに失敗", e);
  }
}