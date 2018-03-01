var companies;
const pizzaSelect = document.getElementById("companySelect");

$.getJSON(
    {
    // Insert your API url Here
        url: "/scripts/pizzaAPI.json",
        success(response)
        {
            companies = response.companies;
            companies.forEach(company => {
                const option = document.createElement("option");
                option.text = company.name;
                pizzaSelect.add(option);
            });
        },
        error(jqXHR,status,error)
        {
            console.error(jqXHR);
        }
    }
);

function setPrice(){
    var selected = pizzaSelect.value;
    companies.forEach(company => {
        if (company.name == selected){
            document.getElementById("pricePerBox").value = company.price + ".00";
        }
    });
}

function checkValue(control){
    if(control.value<1){
        alert("El valor definido debe ser mayor que 0, intente nuevamente.");
        document.getElementById(control.id).focus();
    }
}

function buildString(stringContent){
    const p = document.createElement("p");
    p.innerHTML = stringContent;
    return p;
}

function cleanResult(){
    const resultParagraph = document.getElementById("result-text");
    resultParagraph.innerHTML = "Presione el boton <b>Calcular</b> para presentar el resultado aqui.";
}

function calculate(){


    if(document.getElementById("companySelect").value==""){
        return alert("Seleccione una Pizzería");
    }

    const peopleQty = document.getElementById("peopleQty").value;
    const servings = document.getElementById("servings").value;
    
    if(peopleQty < 1  || servings < 1 ){
        alert("La cantidad definida debe ser mayor a 0");
    }
    else{
        let price=0;
        let pieces=0;
        const selectedPizza = document.getElementById("companySelect").value;
        
        companies.forEach(company => {
            if (company.name == selectedPizza){
                price = company.price;
                pieces = company.pieces;
            }
        });

        let totalPieces = servings * peopleQty;
        let totalPizzas = 0;

        for (i=0;i<totalPieces;i++){
            if(i%pieces==0){
                totalPizzas++;
            }
        }

        let pricePerPerson = Math.round((price*totalPizzas)/peopleQty);
        let totalPizzaPieces = totalPizzas * pieces;
        let remainingPieces = (totalPizzas * pieces) - totalPieces;

        const resultParagraph = document.getElementById("result-text");
        resultParagraph.innerText = "";

        var resultArr = new Array(
            buildString("<b>Pizzería: </b>" + pizzaSelect.value),
            buildString("<b>Precio por Persona: </b>" + pricePerPerson),
            buildString("<b>Pedazos por Persona: </b>" + servings),
            buildString("<b>Total de pedazos: </b>" + totalPizzaPieces),
            buildString("<b>Total de pizzas: </b>" + totalPizzas),
            buildString("<b>Pedazos restantes: </b>" + remainingPieces)
        );

        resultArr.forEach(result => {
            resultParagraph.appendChild(result);
        });
        

    }
}