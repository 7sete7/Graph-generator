#Graph-api
Uma api que gera gráficos legais feitos no back-end;
Um exemplo de seu uso pode ser encontrado no arquivo Example.html.

A URL espera 2 parametros, o `data` e o `style`. Ambos JSON.

#### Estrutura do data
```json
{
    "data": [
        {"label": "May/18", "value": 40000},
        {"label": "Dez/18", "value": 42500},
        {...}
    ],

}
```

#### Estrutura do style
##### Esse paramêtro e todas suas opções são opcionais
```json
{
    "lineColor":       "#2e4f5a",
    "textColor":       "#545454",
    "plotColor":       "#000",                
    "backgroundColor": "beige",
    "textDecoration":  "font-wheight: 'bold';"
}
```