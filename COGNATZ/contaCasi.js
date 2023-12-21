var booleanoChiusura = false;
//in questa lista inserisco i casi già testati 
let listaTestati = [];
let chiamateInsert = 0;

function avviaContaCasi(){
    //se riesco ad eseguire la funzione correttamente:
    contaCasi(0, 1, 0, false);
    if(!booleanoChiusura){
        alert("L'algoritmo funziona");
    }
    else{
        alert("Attenzione: 10000 casi raggiunti");
        booleanoChiusura = false; 
    }
}

function contaCasi(numeroCasi, moltiplicatoreN, moltiplicatoreNoto, precedentePari) {
  if (numeroCasi == 10000 && booleanoChiusura == false) {
    booleanoChiusura = true;
    // alert("Attenzione: 10000 casi raggiunti");
    return;
  }

  if (numeroCasi % 100 === 0) {
    console.log("Numero casi fin qui: " + numeroCasi);
  }
  //se moltiplicatoreN<1 -> non bisogna andare avanti con questo caso
  if(moltiplicatoreN<1){
    //in questo caso, aggiungo nella lista e ritorno
    insertIntoListaTestati(moltiplicatoreN, moltiplicatoreNoto, precedentePari);
    return;
  }

  //se è già nella lista dei testati posso chiudere questo caso
  if(listaTestatiIncludes(moltiplicatoreN, moltiplicatoreNoto)){
    insertIntoListaTestati(moltiplicatoreN, moltiplicatoreNoto, precedentePari);
    return;
  }


  numeroCasi++;

  if (isAmbo(moltiplicatoreN, moltiplicatoreNoto)) {
    // Caso pari
    //per alleggerire, se moltiplicatoreN<2 non valuto il caso pari:
    if(moltiplicatoreN>2){
      contaCasi(numeroCasi, moltiplicatoreN / 2, moltiplicatoreNoto / 2, true);
    }
    insertIntoListaTestati(moltiplicatoreN, moltiplicatoreNoto, precedentePari);


    // Caso dispari
    contaCasi(numeroCasi, moltiplicatoreN * 3, moltiplicatoreNoto + 1, false);

    insertIntoListaTestati(moltiplicatoreN, moltiplicatoreNoto, precedentePari);
    return;
  }

  if (isPari(moltiplicatoreN, moltiplicatoreNoto)) {
    //per alleggerire, se moltiplicatoreN<2 non valuto il caso pari:
    if(moltiplicatoreN<=2){
        insertIntoListaTestati(moltiplicatoreN, moltiplicatoreNoto, precedentePari);
        return;
    }
    contaCasi(numeroCasi, moltiplicatoreN / 2, moltiplicatoreNoto / 2, true);
    insertIntoListaTestati(moltiplicatoreN, moltiplicatoreNoto, precedentePari);

    
    return;
  }

  if (isDispari(moltiplicatoreN, moltiplicatoreNoto)) {
    contaCasi(numeroCasi, moltiplicatoreN * 3, moltiplicatoreNoto + 1, false);
    insertIntoListaTestati(moltiplicatoreN, moltiplicatoreNoto, precedentePari);
    return;
  }
}

function isAmbo(moltiplicatoreN, moltiplicatoreNoto) {
    if (!Number.isInteger(moltiplicatoreN) || !Number.isInteger(moltiplicatoreNoto)) {
      return true;
    }
    return false;
  }
  
  function isPari(moltiplicatoreN, moltiplicatoreNoto) {
    if ((moltiplicatoreN % 2 == 0 && moltiplicatoreNoto % 2 == 0 && !isAmbo(moltiplicatoreN, moltiplicatoreNoto))
      || (moltiplicatoreN % 2 != 0 && moltiplicatoreNoto % 2 != 0 && !isAmbo(moltiplicatoreN, moltiplicatoreNoto))) {
      return true;
    }
    return false;
  }
  
  function isDispari(moltiplicatoreN, moltiplicatoreNoto) {
    if ((moltiplicatoreN % 2 == 0 && moltiplicatoreNoto % 2 != 0 && !isAmbo(moltiplicatoreN, moltiplicatoreNoto))
      || (moltiplicatoreN % 2 != 0 && moltiplicatoreNoto % 2 == 0 && !isAmbo(moltiplicatoreN, moltiplicatoreNoto))) {
      return true;
    }
    return false;
  }
  
function insertIntoListaTestati(moltiplicatoreN, moltiplicatoreNoto, precedentePari){

    if(precedentePari){
        if(listaTestatiIncludes(moltiplicatoreN*2, moltiplicatoreNoto*2)){
            return;
        }
    listaTestati.push([moltiplicatoreN*2, moltiplicatoreNoto*2]);
    }
    else{
        if(listaTestatiIncludes(moltiplicatoreN/3, moltiplicatoreNoto-1)){
            return;
        }
        listaTestati.push([moltiplicatoreN/3, moltiplicatoreNoto-1])
    }
}

function listaTestatiIncludes(moltiplicatoreN, moltiplicatoreNoto){
  
  if(listaTestati.length%100==0 && listaTestati.length!=0){
    console.log("casi nella lista: " + listaTestati.length);
  }
  if(listaTestati.length==2800){
    stopDebug = "";
  }
  chiamateInsert++;

    for(let i = 0; i<listaTestati.length; i++){
        if(listaTestati[i][0]==moltiplicatoreN && listaTestati[i][0]==moltiplicatoreNoto){
            return true;
        }
    }
    return false;
}
