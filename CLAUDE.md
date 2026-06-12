# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.


## git commit
- git commit 訊息 請使用正體中文
- 必須要有 type (Prefix)，請參照類別規範
- 必須要有 subject
  - 不超過 50 個字元
  - 結尾不加句號
  - 盡量讓 Commit 單一化，一次只更動一個主題
- type 請寫在 commit subject   
  

### <type> 類別規範
* feat：新增或修改功能（feature）
* fix：修補 bug（bug fix）
* docs：文件（documentation）
* style：格式
* refactor：重構
* perf：改善效能（improves performance）
* test：增加測試（when adding missing tests）
* chore：maintain，不影響程式碼運行，建構程序或輔助工具的變動
* revert：撤銷回覆先前的 commit

## 專案概述

ICU 護理新人工作手冊，VitePress 靜態文件站。內容來源為 `工作手冊.pdf`（42 頁，A4，Canva 匯出），由文字抽取與頁面圖片轉檔組成。所有頁面文字為**繁體中文**，臨床術語保留原文（英文藥名、ABG、RASS 等）。

## 指令

```bash
npm install          # 安裝相依套件
npm run docs:dev     # 本機預覽 (http://localhost:5173)
npm run docs:build   # 建置到 .vitepress/dist
npm run docs:preview # 預覽建置結果
```

無測試與 lint 設定（`npm test` 為佔位，會 exit 1）。驗證變更的方式是 `npm run docs:build`（會檢查死連結與 markdown 錯誤），必要時起 dev server 用 `curl` 確認路由與圖片回 200。

::: 注意
`npm run docs:dev` 的 SSR HTML **不含**內文（client 端 hydrate）。要用 grep 驗證渲染輸出，請查 `.vitepress/dist/**/*.html`（build 後），而非 dev server 回應。
:::

## 架構

### 內容產生流程

PDF → 兩條路徑：

1. **文字**：`pdftotext -layout 工作手冊.pdf manual.txt` 抽出，手動整理成表格／條列。`manual.txt` 為中間產物，已列入 `.gitignore`。
2. **頁面圖片**：`pdftoppm -jpeg -jpegopt quality=82 -r 120 工作手冊.pdf src/public/pages/page` 轉成 `page-01.jpg`…`page-42.jpg`，內嵌於各章節「原始頁面」段落作對照。

PDF 第 39、40、43 頁為純圖或空白，文字無法抽取，僅以頁面圖呈現。

### 站台結構

VitePress root 為**專案根目錄**（`.vitepress/` 在此），內容來源為 `src/`（config 設 `srcDir: 'src'`）。

- `.vitepress/config.mts` — 站台設定。側邊欄為 8 大分類手動維護的固定結構；新增章節須同步在此加 `link`。本地搜尋（`search.provider: 'local'`）與所有 UI 字串皆繁中化。
- `src/index.md` — 首頁（layout: home，hero + features）。
- `src/guide/*.md` — 30 個章節。檔名英文 kebab-case，標題繁中。
- `src/public/pages/` — PDF 各頁 JPG（VitePress public 目錄，引用路徑為 `/pages/xxx.jpg`，不含 `public` 前綴）。

### 自訂主題（兩個刻意設計的機制）

`.vitepress/theme/index.ts` 以 `extends: DefaultTheme` 並在 `setup()` 中：

- **圖片放大**：動態 import `medium-zoom`，只綁定 `.zoomable img`。`watch(route.path)` 在路由切換時 detach 舊 instance 重新掛載（VitePress SPA 導航不會重跑 onMounted）。

`.vitepress/theme/custom.css` 兩個關鍵 class：

- **`.raw-page { display: none }`** — 各章節末「原始頁面」對照區塊包在 `<div class="raw-page">` 中，目前全站隱藏。刪此規則即可恢復顯示，圖檔仍在 `src/public/pages/`。
- **`.zoomable`** — 包住要可放大的圖（目前僅 `src/guide/environment.md` 的平面圖）。要讓其他頁圖片可放大，把該圖以 `<div class="zoomable">` 包起即可。

::: markdown 內嵌 HTML 注意
在 markdown 用 `<div class="...">` 包圖時，div 與圖之間須留**空行**，否則 VitePress 不會把內部當 markdown 渲染。
:::

## 新增章節步驟

1. 建 `src/guide/<kebab-name>.md`，標題用繁中。
2. 在 `config.mts` 對應分類的 `items` 加 `{ text: '...', link: '/guide/<kebab-name>' }`。
3. 若有原始頁面對照，末段包進 `<div class="raw-page">`（沿用既有格式）。
4. `npm run docs:build` 驗證無死連結。
