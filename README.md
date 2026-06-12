# ICU 工作手冊（VitePress）

由 `工作手冊.pdf` 建立的 VitePress 線上文件站，涵蓋 30 個 ICU 新人主題（工作守則、三班常規、藥物、呼吸照護、評估量表等）。

## 開發

```bash
npm install        # 安裝相依套件
npm run docs:dev   # 本機預覽 (http://localhost:5173)
npm run docs:build # 建置靜態站台到 .vitepress/dist
npm run docs:preview
```

## 結構

```
.vitepress/
├─ config.mts             # 站台設定、側邊欄、本地搜尋、繁中 UI（srcDir: 'src'）
└─ theme/
   ├─ index.ts            # 自訂主題：medium-zoom 圖片放大
   └─ custom.css          # 隱藏原始頁面、圖片放大樣式
src/
├─ index.md               # 首頁
├─ guide/                 # 各章節 markdown（30 個主題）
└─ public/pages/          # PDF 各頁轉出的 JPG（原始頁面對照）
```

> VitePress root 為專案根目錄，內容來源設為 `src/`（config `srcDir: 'src'`）。

## 內容來源

文字由 `pdftotext` 抽出後手動整理成表格與條列；圖表頁（環境配置、抗生素敏感性、溶液效期、班表等）以 `pdftoppm` 轉成 JPG，內嵌於各章節「原始頁面」段落。

## 功能

### 隱藏原始頁面對照

各章節末「原始頁面」區塊包在 `<div class="raw-page">` 中，由 `.vitepress/theme/custom.css` 的 `.raw-page { display: none }` 隱藏。

要恢復顯示，刪掉該規則即可。圖檔仍保留在 `src/public/pages/`。

### 圖片點擊放大

採用 [`medium-zoom`](https://github.com/francoischalifour/medium-zoom)，於 `.vitepress/theme/index.ts` 綁定，路由切換時重新掛載。

只作用於包在 `<div class="zoomable">` 內的圖片（目前為「認識單位環境」平面圖）。支援手機／平板點擊放大、雙指縮放。

要讓其他頁圖片也可放大，把該圖包進 `<div class="zoomable">` 即可。

## 重新產生頁面圖片

```bash
pdftoppm -jpeg -jpegopt quality=82 -r 120 工作手冊.pdf src/public/pages/page
```
