# Engineering Math Hub｜研究所工程數學學習知識庫

以原生 HTML、CSS、JavaScript 建立的繁體中文學習網站，使用資料驅動的教材模板。內容為原創練習，不是考古題。

## 使用方式
1. 下載或解壓專案，在瀏覽器開啟 `index.html`。
2. 依分類或關鍵字搜尋，點選卡片進入教材；自我練習可展開答案。
3. 若要檢查資料格式（需 Node.js），執行 `node validate.js`。

## 讓 AI 繼續新增內容
先給 AI `AGENTS.md` 與本專案檔案，再要求「依照 AGENTS.md 新增分離變數法單元」。只需修改 `topics.js` 的資料陣列，首頁及詳情就會自動更新。`fourier-series` 是相同格式的擴充示例。

## GitHub Pages 部署
建立公開 repository `engineering-math-hub`，把本資料夾內的檔案全部上傳到 repository 根目錄（index.html 必須在根目錄）。Settings → Pages → Deploy from a branch → main → /(root) → Save。部署成功後點 Visit site 確認網站。實際 URL 以 GitHub 顯示為準。
