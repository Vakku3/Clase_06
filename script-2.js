async function segundo() {
    const consulta = await fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson");
    const data = await consulta.json();
    //Declaro variables que parten en cero
    let Mexico = 0;
    let Colombia = 0;
    let Peru = 0;
    let otro = 0;
    //Reviso data con alguna condiciones
    data.features.forEach((t) => {
        if (t.properties.place.includes("Mexico")) {
            Mexico = Mexico + 1;
        } else if (t.properties.place.includes("Colombia")) {
            Colombia = Colombia + 1;
        } else if (t.properties.place.includes("Peru")) {
            Peru = Peru + 1;
        } else {
            otro = otro + 1;
        }
    });
    //Creo una variable como un arreglo vacío
    var numeros = [];
    //Empujo a la variable los resultados del contador
    numeros.push(Mexico, Colombia, Peru, otro);
    var nombres = ["En Mexico", "En Alemania", "En Peru", "En el resto del mundo"];
    //Ahora puedo armar el gráfico
    new Chart(document.getElementById("earthquakes").getContext("2d"), {
        type: "pie",
        data: {
            labels: nombres,
            datasets: [
                { 
                    label: "Earthquakes", 
                    data: numeros, 
                    backgroundColor: ["#6a0552", "#9b0477", "#ce0a9f", "#e847c1"] 
                }
            ],
        },
        options: {
            plugins: {
                title: {
                    display: false,
                },
            },
            responsive: true,
            layout: {
                padding: 20,
            }
        }
    });
}
segundo().catch((error) => console.error(error));