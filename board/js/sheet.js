const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQg4stbNkv97OWBe8dyTY_q7zi8yJrg5LP8hEDBckqKTqld1tgFtDc85ZbvglrE8dbBuYGWSmey7R5T/pub?gid=178105941&single=true&output=csv';

fetch(SHEET_URL)
  .then(res => res.text())
  .then(csv => {
    const rows = csv.split('\n');
    const data = [];

    rows.forEach(row => {
      const [time, name, content] = row.split(',');
      if (time && name && content) {
        data.unshift({name: name, content: content});
      }
    });
    
    data.forEach(item=>{
        const bigDiv= document.createElement('div');
        const name= document.createElement('h2');
        name.innerHTML = item['name'];
        const content= document.createElement('p');
        content.innerHTML = item['content'];
        bigDiv.addchild(name);
        bigDiv.addchild(content);
        document.getElementById('text').addchild(bigDiv);
    })
  })
  .catch(err => console.error('讀取 Sheet 失敗', err));
