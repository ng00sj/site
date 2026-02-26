const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQtbiEBEV5woM-QiXxTPC2PZByrWig3vAQcY4gt_uJ9obeNsNfSXhPRMorit2YG8BtfJSRbTUlUSTbJ/pub?gid=0&single=true&output=csv';

fetch(SHEET_URL)
  .then(res => res.text())
  .then(csv => {
    const rows = csv.split('\n');
    const data = {};

    rows.forEach(row => {
      const [key, value] = row.split(',');
      if (key && value) {
        data[key.trim()] = value.trim();
      }
    });

    // 將資料放進網頁
    document.getElementById('title').textContent = 114514; //data.title;
    document.getElementById('subtitle').textContent = data.subtitle;
    document.getElementById('content').textContent = data.content;
    document.getElementById('footer').textContent = data.footer;
  })
  .catch(err => console.error('讀取 Sheet 失敗', err));
