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

const zw_title=',謝廷鴻,鍾葳,方東華,蔡侁甫,林**'
const zw_content=`進大學年度,2015,2018,2018,2020,2025\n
國小,,,,瑞豐國小,\n
國中,,永和國中,金華國中,瑞豐國中,敦化國中\n
高中,武陵高中,建國中學,建國中學,高雄中學,建國中學\n
大學,台大地質系、台大電機系,台大化學系,台大醫學系,台大牙醫系,台大電機系\n
就業,YT、家教,出國深造,方氏化學,,\n
科學班,,是,是,是,是\n
被告,有,有,有,有,有\n
被判刑,無,有,,,`
