function draw_chart(title, content){
    const data_title=title.split(',')
    const rows_content=content.split('\n\n')
    const data_content=rows_content.map(e => e.split(','))
    document.write('<table border="1"><thead><tr>')
    data_title.forEach(element => {
        document.write('<th>' + element + '</th>')
    })
    document.write('</tr></thead><tbody>')
    data_content.forEach(e1=>{
        document.write('<tr>')
        e1.forEach(e2 => {
            document.write('<td>'+(e2||'')+'</td>')
        })
        document.write('</tr>')
    })
    document.write('</tbody></table>')
}