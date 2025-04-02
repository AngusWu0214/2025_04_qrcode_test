# QR Code 驗證系統

這是一個簡單的 QR Code 驗證系統，使用 Node.js 和 Express.js 建立。

## 功能特點

- 兩個獨立頁面：QR Code 顯示頁面和掃描頁面
- 支援測試 ID（test1-test5）
- 即時驗證狀態顯示
- 相機掃描功能
- 驗證結果即時回饋

## 安裝步驟

1. 確保您已安裝 Node.js
2. 克隆此專案
3. 在專案目錄中執行：
   ```bash
   npm install
   ```

## 執行方式

1. 啟動伺服器：
   ```bash
   npm start
   ```
   或使用開發模式（自動重啟）：
   ```bash
   npm run dev
   ```

2. 開啟瀏覽器訪問：
   - QR Code 顯示頁面：`http://localhost:3000/display.html`
   - QR Code 掃描頁面：`http://localhost:3000/scan.html`

## API 端點

- `POST /generate-qr`：生成新的 QR Code
- `POST /verify/:id`：驗證指定的 QR Code
- `GET /check-status/:id`：檢查 QR Code 的驗證狀態

## 使用方式

### QR Code 顯示頁面
1. 從下拉選單選擇測試 ID（test1-test5）
2. 點擊「生成 QR Code」按鈕
3. 顯示對應的 QR Code
4. 可點擊「檢查狀態」按鈕查看驗證狀態

### QR Code 掃描頁面
1. 允許瀏覽器使用相機
2. 將 QR Code 對準掃描框
3. 系統會自動驗證並顯示結果
4. 可使用「開始掃描」和「停止掃描」按鈕控制掃描器

## 測試資料

- test1：已驗證（重複報名）
- test2：已驗證（重複報名）
- test3：未驗證
- test4：未驗證
- test5：未驗證

## 注意事項

- 請確保瀏覽器支援相機功能
- 掃描時請保持 QR Code 在掃描框內
- 建議使用 HTTPS 協議以確保相機功能正常運作 