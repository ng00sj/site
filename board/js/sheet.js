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
//const time = document.createElement('p');
time.innerHTML = item['time'];
        const content= document.createElement('p');
        content.innerHTML = item['content'];
        bigDiv.appendChild(name);
        //bigDiv.appendChild(time);
bigDiv.appendChild(content);
        document.getElementById('text').appendChild(bigDiv);
    });
document.getElementById('loading').hidden=true;
  });
