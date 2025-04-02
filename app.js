const express = require('express');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');

const app = express();
const port = 3000;

// 中間件設定
app.use(bodyParser.json());
app.use(express.static('public'));

// 測試資料
const testData = {
    'test1': { verified: true, timestamp: new Date(), attempts: 1 },
    'test2': { verified: true, timestamp: new Date(), attempts: 1 },
    'test3': { verified: false, timestamp: new Date(), attempts: 0 },
    'test4': { verified: false, timestamp: new Date(), attempts: 0 },
    'test5': { verified: false, timestamp: new Date(), attempts: 0 }
};

// 生成 QR Code
app.post('/generate-qr', async (req, res) => {
    try {
        const { id } = req.body;
        if (!id || !testData[id]) {
            return res.status(400).json({
                success: false,
                error: '無效的ID'
            });
        }

        const verificationUrl = `http://localhost:${port}/verify/${id}`;
        const qrCode = await QRCode.toDataURL(verificationUrl);

        res.json({
            success: true,
            qrCode,
            id
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'QR Code 生成失敗'
        });
    }
});

// 驗證 QR Code
app.post('/verify/:id', (req, res) => {
    const { id } = req.params;
    const status = testData[id];

    if (!status) {
        return res.status(404).json({
            success: false,
            error: '無效的驗證ID'
        });
    }

    if (status.verified) {
        return res.json({
            success: true,
            message: '重複報名',
            status: {
                verified: true,
                timestamp: status.timestamp,
                verificationTime: status.verificationTime,
                attempts: status.attempts
            }
        });
    }

    // 更新驗證狀態
    status.verified = true;
    status.verificationTime = new Date();
    status.attempts += 1;

    res.json({
        success: true,
        message: '報名成功',
        status: {
            verified: true,
            timestamp: status.timestamp,
            verificationTime: status.verificationTime,
            attempts: status.attempts
        }
    });
});

// 檢查驗證狀態
app.get('/check-status/:id', (req, res) => {
    const { id } = req.params;
    const status = testData[id];

    if (!status) {
        return res.status(404).json({
            success: false,
            error: '無效的驗證ID'
        });
    }

    res.json({
        success: true,
        status: {
            verified: status.verified,
            timestamp: status.timestamp,
            verificationTime: status.verificationTime,
            attempts: status.attempts
        }
    });
});

app.listen(port, () => {
    console.log(`伺服器運行在 http://localhost:${port}`);
}); 