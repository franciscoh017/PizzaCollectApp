var companies;
const pizzaSelect = document.getElementById("companySelect");

$.getJSON({
    // Insert your API url Here
    url: "http://localhost:3000/companies",
    success(response){
        console.log(response);
        companies = response;
        companies.forEach(company => {
            const option = document.createElement("option");
            option.text = company.name;
            pizzaSelect.add(option);
        });
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
    p.innerText = stringContent;
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
        console.log(resultParagraph);

        var resultArr = new Array(
            buildString("Pizzería: " + pizzaSelect.value),
            buildString("Precio por Persona: " + pricePerPerson),
            buildString("Pedazos por Persona: " + servings),
            buildString("Total de pedazos: " + totalPizzaPieces),
            buildString("Total de pizzas: " + totalPizzas),
            buildString("Pedazos restantes: " + remainingPieces)
        );

        resultArr.forEach(result => {
            resultParagraph.appendChild(result);
        });
        

    }
}