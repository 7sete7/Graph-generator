
export default function ParseData(data) {

    const json = JSON.parse(data);
    console.log(json);

    const output = {
        labels: [],
        series: [{name: "Serie 1", value: []}]
    };

    for(let item of json){
        !output.labels.includes(item) && output.labels.push(item.label);
        output.series[0].value.push(item.value);
    }

    return output;
}
