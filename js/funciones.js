const form = document.getElementById("transactionForm");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let transactionFormData = new FormData(form);
  let transactionTable = document.getElementById("transactionTable");
  let transactionObj = convertFormDataToTransactionObj(transactionFormData);
  console.log(transactionObj);
  saveTransactionObj(transactionObj);
  insertRowTransactionTable(transactionObj);
  form.reset();
});

//DOMContentLoaded es un escuchador del DOM , quiere decir que va a ejecutar una funcion 
// que le pasemos como segundo parametro del metodo addEventListener ;
document.addEventListener("DOMContentLoaded",function(event){
  let transactionObjArray= JSON.parse(localStorage.getItem("transactionData"))
  transactionObjArray.forEach(function(iterator) {
    insertRowTransactionTable(iterator);
  });
});
function convertFormDataToTransactionObj(transactionFormData) {
  let tipo = transactionFormData.get("tipo");
  let description = transactionFormData.get("description");
  let categoria = transactionFormData.get("categoria");
  let monto = transactionFormData.get("monto");
  return {
    "tipo": tipo,
    "description": description,
    "categoria": categoria,
    "monto": monto
  }
}

function saveTransactionObj(transactionObj){

let myTransactionArray=JSON.parse(localStorage.getItem("transactionData")) || [];
  myTransactionArray.push(transactionObj);
  let transactionArrayJson =JSON.stringify(myTransactionArray);
  localStorage.setItem("transactionData",transactionArrayJson);

}

function insertRowTransactionTable(transactionObj) {
  let transactionTablaRef = document.getElementById("transactionTable");
  let newTransactionRowRef = transactionTablaRef.insertRow(-1);

  let newTypeCellRef = newTransactionRowRef.insertCell(0);
  newTypeCellRef.textContent = transactionObj["tipo"];

  newTypeCellRef = newTransactionRowRef.insertCell(1);
  newTypeCellRef.textContent = transactionObj["description"];

  newTypeCellRef = newTransactionRowRef.insertCell(2);
  newTypeCellRef.textContent = transactionObj["categoria"];

  newTypeCellRef = newTransactionRowRef.insertCell(3);
  newTypeCellRef.textContent = transactionObj["monto"];
}
