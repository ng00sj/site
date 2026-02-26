const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSvcc-ptXOCDJ8ARre_DVNchirMd4prIowpsNoOFfA6Meode-JWa7LYBSTq-FBASrM_maDN1vjgo7U_/pub?gid=247908776&single=true&output=csv';

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
    document.getElementById('rand0').textContent = data.rand0;
    document.getElementById('rand1').textContent = data.rand1;
    document.getElementById('rand2').textContent = data.rand2;
    document.getElementById('rand3').textContent = data.rand3;
  })
  .catch(err => console.error('讀取 Sheet 失敗', err));
