// 1. 禁止手機雙指張開縮放 (Pinch to zoom)
document.addEventListener('touchstart', (event) => {
  if (event.touches.length > 1) {
    event.preventDefault(); // 偵測到兩隻手指以上觸控時，取消預設縮放行為
  }
}, { passive: false }); // 必須加上 passive: false，瀏覽器才允許阻止預設行為

// 2. 禁止手機雙擊螢幕放大 (Double-tap to zoom)
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
  const now = (new Date()).getTime();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault(); // 300 毫秒內連續點擊兩下，取消放大
  }
  lastTouchEnd = now;
}, { passive: false });

// 3. 禁止電腦瀏覽器使用鍵盤快速鍵縮放 (Ctrl + + / Ctrl + - / Ctrl + 滑鼠滾輪)
document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && (event.key === '+' || event.key === '-' || event.key === '=')) {
    event.preventDefault(); // 攔截 Ctrl 和 加減號
  }
});

document.addEventListener('wheel', (event) => {
  if (event.ctrlKey) {
    event.preventDefault(); // 攔截 Ctrl + 滑鼠滾輪縮放
  }
}, { passive: false });
