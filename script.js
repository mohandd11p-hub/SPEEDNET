let botInterval = null;

async function startBot() {
    if (botInterval) return; // منع تشغيل أكثر من حلقة

    document.getElementById('bot-status').innerText = "يعمل...";
    log("بدء الاتصال بـ Binance API...");

    // حلقة تكرار تجلب السعر كل 5 ثوانٍ
    botInterval = setInterval(async () => {
        try {
            // جلب سعر البيتكوين مقابل الدولار (مثال)
            const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
            const data = await response.json();
            const price = parseFloat(data.price).toFixed(2);

            // تحديث الواجهة
            document.getElementById('current-price').innerText = price;
            
            // هنا يمكنك إضافة منطق التداول (IF/ELSE) مستقبلاً
            // log("السعر الحالي: " + price); 

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
