const fechas = [];
const dateData = [];
let kindOfIndexToAdd = '';
async function request() {
    const resp = await fetch('https://www.banxico.org.mx/SieAPIRest/service/v1/series/SP1/datos?' + new URLSearchParams({
        'token': 'ea526ff2d8d0cce16cd66f8aa4fb078b66d1e6ce0b3b6b8c9c8dcbb25e65533e',
    }),
    // {
    //     headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Headers': 'OPTIONS, GET, POST, UPDATE, DELETE',
    //     'Access-Control-Allow-Headers': 'authorization',
    // }
    // }
    );
        const datos = await resp.json();
        // console.log(datos);
        // console.log(datos.bmx.series[0].datos)
        const dias = datos?.bmx?.series[0]?.datos;
        if (!dias) return
        let datosReversa = dias.reverse();
        // console.log(datosReversa, 'Reversa');
            for (let dia of datosReversa) {
                // console.log(dia, 'INDIVIDUAL')

                if (dateData.includes(dia.fecha.slice(3))) return
                dateData.push({fecha: dia.fecha.slice(3), dato: dia.dato});
                if (fechas.includes(dia.fecha.slice(6))) continue
                fechas.push(dia.fecha.slice(6));
            }
            // assignFirtYear();
    }
request();

let $currentSelectedYear = document.getElementById('currentSelectedYear');
const $openModalButtonPurchase = document.getElementById('selectIndexPurchase');
const $openModalButtonSell = document.getElementById('selectIndexSell');
const $closeModalButton = document.getElementById('modal__button-close');
const $modal = document.getElementById('modal');


const assignFirtYear = () => {
    let firstYear = fechas[0];
    $currentSelectedYear.innerText = firstYear;
    changeDates(Number(firstYear));
}
$openModalButtonPurchase.addEventListener('click', () => {
    $modal.classList.add('target');
    assignFirtYear();
    kindOfIndexToAdd = 'purchase';
});
$openModalButtonSell.addEventListener('click', () => {
    $modal.classList.add('target');
    assignFirtYear();
    kindOfIndexToAdd = 'sell';
});
$closeModalButton.addEventListener('click', () => {
    $modal.classList.remove('target');
});
const changeDates = (yearToFind) => {
    const $inpcContainer = document.getElementById('inpc__indices');
    const inpcData = $inpcContainer.children;
    let newDates = [];
    for (let data of dateData) {
        if (newDates.length >= 12) break;
        if (data.fecha.includes(yearToFind)) newDates.push(data);
    }
    newDates = newDates.reverse();
    for (let i in [...inpcData]) {
        inpcData[i].children[0].innerText = newDates[i]?.fecha ?? '';
        inpcData[i].children[1].innerText = newDates[i]?.dato ?? '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const $backArrow = document.getElementById('back_arrow');
    const $forwardArrow = document.getElementById('forward_arrow');
    $backArrow.addEventListener('click', () => {
        console.log('click back');
        let previousYear = Number($currentSelectedYear.innerText) - 1;
        if (!fechas.includes(previousYear.toString())) return;
            $currentSelectedYear.innerText = previousYear;
            changeDates(previousYear);
    });
    $forwardArrow.addEventListener('click', () => {
        let nextYear = Number($currentSelectedYear.innerText) + 1;
        if (!fechas.includes(nextYear.toString())) return;
            $currentSelectedYear.innerText = nextYear;
            changeDates(nextYear);
    });
});
