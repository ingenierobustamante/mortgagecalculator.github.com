/* variables de DATOS */
let val = document.querySelectorAll('.input-value');
let lab = document.querySelectorAll('label');
let req = document.querySelectorAll('.required');
let opr = document.querySelectorAll('.option-radio');

let monto = 0, interes = 0, tiempo = 0, pot = 0;
let contador = 0, cuota = 0, totalPagar = 0, interesOnly = 0;

/* datos a mostrar */
let formRepayment = document.getElementById('card-repayment');
let formInteres = document.getElementById('card-interes-only');

/* borrar datos del formulario */
function clearAll(){
    document.getElementById('mortgage-result').style.zIndex = 0;
    for (let i = 0; i < 3; i++){
        val[i].value = null;
        val[i].style.outlineColor = 'initial';
        req[i].style.display = 'none';
        lab[i].style.backgroundColor = '#e3f3fd';
    }
    opr[0].checked = false;
    opr[1].checked = false;
    req[3].style.display = 'none';
}

/* funcion PRINCIPAL */
function calcMortgage(){
    contador = 0;
    for ( let i = 0; i < 3; i++){
        if ( val[i].value == '' ){
            val[i].style.outlineColor = '#d73328';
            lab[i].style.backgroundColor = '#d73328';
            req[i].style.display = 'inline';
            contador++;
        }else{
            val[i].style.outlineColor = 'initial';
            lab[i].style.backgroundColor = '#e3f3fd';
            req[i].style.display = 'none';
        }
    }
    if (!opr[0].checked && !opr[1].checked){
        req[3].style.display = 'inline';
        contador++;
    }else{
        req[3].style.display = 'none';
    }
    if (contador == 0){
        mortgageCalculator();
    }
}

function mortgageCalculator(){
    monto = parseFloat(val[0].value);
    tiempo = 12*parseFloat(val[1].value);
    interes = parseFloat(val[2].value)/1200;
    pot = Math.pow(interes+1,tiempo);
    cuota = 0, totalPagar = 0, interesOnly = 0;
    
    cuota = (monto*interes*pot/(pot-1)).toFixed(2);
    totalPagar = ((monto*interes*pot/(pot-1))*tiempo).toFixed(2);
    interesOnly = ((monto*interes*pot/(pot-1))*tiempo - monto).toFixed(2);

    /* MUESTRA VENTANA DE RESULTADOS */
    document.getElementById('mortgage-result').style.zIndex=1;
    let results = document.querySelector('.card-result');

    
    if ( opr[0].checked ){
        results.innerHTML = `
            <p class="p-right p-repayment">Your monthly repayments</p>
            <h4 id="resultPrice" class="result-price">${'£ ' + new Intl.NumberFormat('es-MX').format(cuota)}</h4><hr>
            <p class="p-right">Total you'll repay over the term</p>
            <h4 id="resultTotal" class="result-total">${'£ ' + new Intl.NumberFormat('es-MX').format(totalPagar)}</h4>`
    }else{
        results.innerHTML = `
            <p class="p-right p-repayment p-text-only">Your Interes only</p>
            <h4 id="resultPrice" class="result-price interes-only">${'£ ' + new Intl.NumberFormat('es-MX').format(interesOnly)}</h4>
        `
    }
}