
export function parseData(data) {

    if(!data){
        console.error("Graph must receive json data.");
        process.exit(1);
    }

    const json = JSON.parse(data);

    const output = {
        labels: [],
        series: [{name: "Serie 1", value: []}]
    };

    output.labels = getLabels(json);

    output.series[0].value = Array(output.labels.length).fill(null);
    for(let plot of json)
        output.series[0].value[output.labels.indexOf(plot.label)] = plot.value;
    
    return output;
}

/*
* Preenche os espaço entre os meses enviados.
* Jan/18, Abr/18 -> Jan/18, Fev/18, Mar/18, Abr/18
* 
* Funciona com anos diferentes também.
* Para adcionar meses em outras linguas, colocar no array Months e no monthType.
*/
function getLabels(json){
    const months = [
      //  ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
       // ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
        ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]
    ];

    const jsonLabels = json.map(item => item.label);
    const lastYear = Math.max(...jsonLabels.map(itm => itm.split('/')[1]));
    const firstYear = Math.min(...jsonLabels.map(itm => itm.split('/')[1]));

    const labelsInLastYear = jsonLabels.filter(itm => itm.split("/")[1] == lastYear);
    const labelsInFirstYear = jsonLabels.filter(itm => itm.split("/")[1] == firstYear);

    const monthType = months[0].includes(labelsInLastYear[0].split("/")[0].toLowerCase()) ? 0 : 1;
    const lastLabel = labelsInLastYear.sort((a, b) => {
        return months[monthType].indexOf(a.split("/")[0]) - months[monthType].indexOf(b.split("/")[0])
    })[labelsInLastYear.length - 1];

    const firstLabel = labelsInFirstYear.sort((a, b) => {
        return months[monthType].indexOf(a.split("/")[0]) - months[monthType].indexOf(b.split("/")[0])
    })[0];

    const finalLabels = [];
    for(let year = firstYear; year <= lastYear; year++){
        let start = 0;
        let end = 11;
        let meses = months[monthType];

        if(year === firstYear) start = meses.indexOf(firstLabel.split("/")[0]);
        if(year === lastYear) end = meses.indexOf(lastLabel.split("/")[0]);

        if(start < 0 || start > 11) start = 0;
        if(end > 11 || end < 0) end = 11;

        for(var j = start; j <= end; j++){
            finalLabels.push(`${meses[j]}/${year}`);
        }
        finalLabels.push(`${meses[j] || meses[0]}/${meses[j]? year : year + 1}`);
    }

    return finalLabels;
}

/**
 * 
 * 
 */
export function applyStyles(style) {
    // if(!style) return "";
    let output = "";

    const json = style ? JSON.parse(style) : {};
    for(let key in styles){
        output += styles[key](json[key] || undefined);
    }

    return output;
}

const styles = {
    lineColor: (color = "#2e4f5a") =>             `.ct-line  {stroke:     ${color}!important}`,
    textColor: (color = "#545454") =>             `.ct-labels {fill:      ${color}!important}`,
    plotColor: (color = "#2e4f5a") =>             `.ct-point {stroke:     ${color}!important}`,
    backgroundColor: (color = "antiquewhite") =>  `svg {background-color: ${color}!important}`,
    textDecoration: (decoration = "font-weight: bold;") => `.ct-label {${decoration}!important}`
  }
