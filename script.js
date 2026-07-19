let botInterval = null;
let priceHistory = []; 
let alertSent = false;

async function startBot() {
    if (botInterval) return; // منع تشغيل أكثر من حلقة

    document.getElementById('bot-status').innerText = "يعمل...";
    log("بدء الاتصال بـ Binance API...");

    // حلقة تكرار تجلب السعر كل 5 ثوانٍ
    botInterval = setInterval(async () => {
        try {
            // جلب سعر البيتكوين مقابل الدولار (مثال)
            const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=XAUUSDT');
            const data = await response.json();
            const price = parseFloat(data.price).toFixed(2);

            // تحديث الواجهة
            document.getElementById('current-price').innerText = price;
         priceHistory.push(parseFloat(price));
if (priceHistory.length > 5) priceHistory.shift(); 

const sum = priceHistory.reduce((a, b) => a + b, 0);
const average = sum / priceHistory.length;

if (price < average && !alertSent) {
    log("تحليل فني: السعر " + price + " أقل من المتوسط " + average.toFixed(2));
    alertSent = true;
} else if (price >= average) {
    alertSent = false;
}


        } catch (error) {
            log("خطأ في الاتصال: " + error.message);
        }
    }, 5000);
}

function stopBot() {
    clearInterval(botInterval);
    botInterval = null;
    document.getElementById('bot-status').innerText = "متوقف";
    log("تم إيقاف البوت.");
}

function log(message) {
    const logBox = document.getElementById('log-box');
    const time = new Date().toLocaleTimeString();
    logBox.innerHTML += `<p style="color:#4caf50">[${time}] ${message}</p>`;
    logBox.scrollTop = logBox.scrollHeight; // جعل السجل ينزل للأسفل تلقائياً
}
