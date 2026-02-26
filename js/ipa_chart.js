const con_title='雙唇,唇齒,舌唇,齒,齒齦,齦後,捲舌,齦腭,硬腭,軟腭,小舌,咽,會⁠厭,聲門'
const con_content=`鼻音,m̥,m,,ɱ,,n̼,,,n̥,n,,,ɳ̊,ɳ,,,ɲ̊,ɲ,ŋ̊,ŋ,,ɴ,,,,,,
塞音,p,b,p̪,b̪,t̼,d̼,,,t,d,,,ʈ,ɖ,,,c,ɟ,k,ɡ,q,ɢ,,,ʡ,,ʔ,
有噝擦音,,,,,,,,,s,z,ʃ,ʒ,ʂ,ʐ,ɕ,ʑ,,,,,,,,,,,,
無噝擦音,ɸ,β,f,v,θ̼,ð̼,θ,ð,θ̠,ð̠,ɹ̠̊˔,ɹ̠˔,,ɻ˔,,,ç,ʝ,x,ɣ,χ,ʁ,ħ,ʕ,ʜ,ʢ,h,ɦ
近音,,,ʋ̥,ʋ,,,,,ɹ̥,ɹ,,,ɻ̊,ɻ,,,j̊,j,ɰ̊,ɰ,,,,,,,,ʔ̞
閃音,,ⱱ̟,,ⱱ,,ɾ̼,,,ɾ̥,ɾ,,,ɽ̊,ɽ,,,,,,,,ɢ̆,,,,ʡ̆,,
顫音,ʙ̥,ʙ,,,,,,,r̥,r,,,ɽ̊r̥,ɽr,,,,,,,ʀ̥,ʀ,,,,,,
邊擦音,,,,,,,,,ɬ,ɮ,,,ɭ̊˔,ɭ˔,,,ʎ̝̊,ʎ̝,ʟ̝̊,ʟ̝,,,,,,,,
邊近音,,,,,,,,,l̥,l,,,ɭ̊,ɭ,,,ʎ̥,ʎ,ʟ̥,ʟ,,ʟ̠,,,,,,
邊閃音,,,,,,,,,,ɺ,,,,ɭ̆,,,,ʎ̆,,ʟ̆,,,,,,,,`
const vow_title='前,次前,央,次後,後'
const vow_content=`閉,i,y,,,ɨ,ʉ,,,ɯ,u
次閉,,,ʉ,ʏ,ɪ̈,ʊ̈,ɯ̞,ʊ,,
半閉,e,ø,,,ɘ,ɵ,,,ɤ,o
中,e̞,ø̞,,,ə,ə̹,,,ɤ̞,o̞
半開,ɛ,œ,,,ɜ,ɞ,,,ʌ,ɔ
次開,æ,,,,ɐ,ɐ̹,,,,
開,a,ɶ,,,ä,ɒ̈,,,ɑ,ɒ`


function load_table_con(title, content,containerId){
    const container = document.getElementById(containerId)
    container.innerHTML = ''
    
    const data_title=title.split(',')
    const rows_content=content.trim().split('\n')
    const data_content=rows_content.map(e => e.split(','))
    
    const table = document.createElement('table')
    table.style.border = '1px'
    
    const thead = document.createElement('thead')
    const trHead = document.createElement('tr')
    const th0 = document.createElement('th')
    th0.textContent = '方式＼部位'
    th0.style.width = '10%'
    trHead.appendChild(th0)

    data_title.forEach(element => {
        const th = document.createElement('th')
        th.colSpan = 2
        th.textContent = element
        trHead.appendChild(th)
    })
    thead.appendChild(trHead)
    table.appendChild(thead)
    
    const tbody = document.createElement('tbody')
    data_content.forEach((row,rowIndex)=>{
        const tr = document.createElement('tr')
        
        row.forEach((cell,colIndex) => {
            const td = document.createElement('td')
            td.textContent = cell || ''
            td.className = 'copy-cell'
            td.id = `con-${rowIndex}-${colIndex}`
            td.addEventListener('click',()=>{
              if (!cell) return
              navigator.clipboard.writeText(cell).then(()=>alert(`已複製：${cell}`))
            })
            tr.appendChild(td)
        })
        tbody.appendChild(tr)
    })
    table.appendChild(tbody)
    container.appendChild(table)
}

function load_table_vow(title, content,containerId){
    const container = document.getElementById(containerId)
    container.innerHTML = ''

    const data_title=title.split(',')
    const rows_content=content.trim().split('\n')
    const data_content=rows_content.map(e => e.split(','))
    
    const table = document.createElement('table')
    table.style.border = '1px'
    
    const thead = document.createElement('thead')
    const tr = document.createElement('tr')
    
    const th0 = document.createElement('th')
    th0.textContent = '舌位'
    th0.style.width = '10%'
    tr.appendChild(th0)
    
    data_title.forEach(element => {
        const th = document.createElement('th')
        th.colSpan = 2
        th.textContent = element
        tr.appendChild(th)
    })
    
    thead.appendChild(tr)
    table.appendChild(thead)
    
    const tbody = document.createElement('tbody')
    
    data_content.forEach((row,rowIndex) =>{
        const tr = document.createElement('tr')
        row.forEach((cell,colIndex) => {
            const td = document.createElement('td')
            td.textContent = cell || ''
            td.className = 'copy-cell'
            td.id = `vow-${rowIndex}-${colIndex}`
            td.addEventListener('click',()=>{
              if (!cell) return
              navigator.clipboard.writeText(cell).then(()=>alert(`已複製：${cell}`))
            })
            tr.appendChild(td)
        })
        tbody.appendChild(tr)
    })
    table.appendChild(tbody)
    container.appendChild(table)
}