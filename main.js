import { request, createElement, changeDates, setIndicesForUser } from "./helpers.js";
const anios = [];
const dateData = [];
let kindOfIndexToAdd = '';

// if (indexedDB) {

// } else {
    request(dateData, anios);
// }
let $currentSelectedYear = document.getElementById('currentSelectedYear');
const $openModalButtonPurchase = document.getElementById('selectIndexPurchase');
const $openModalButtonSell = document.getElementById('selectIndexSell');
const $closeModalButton = document.getElementById('modal__button-close');
const $modal = document.getElementById('modal');

const assignFirtYear = () => {
    let firstYear = anios[0];
    $currentSelectedYear.innerText = firstYear;
    changeDates(Number(firstYear), dateData);
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

document.addEventListener('DOMContentLoaded', () => {
    const $backArrow = document.getElementById('back_arrow');
    const $forwardArrow = document.getElementById('forward_arrow');
    $backArrow.addEventListener('click', () => {
        let previousYear = Number($currentSelectedYear.innerText) - 1;
        if (!anios.includes(previousYear.toString())) return;
            $currentSelectedYear.innerText = previousYear;
            changeDates(previousYear, dateData);
    });
    $forwardArrow.addEventListener('click', () => {
        let nextYear = Number($currentSelectedYear.innerText) + 1;
        if (!anios.includes(nextYear.toString())) return;
            $currentSelectedYear.innerText = nextYear;
            changeDates(nextYear, dateData);
    });
});

document.getElementById('inpc__indices').addEventListener('click', (event) => {
    const closeModalButton = document.getElementById('modal__button-close');
    if (event.target.className === 'inpc__indice') {
        console.log(event.target.children[0].innerText, event.target.children[1].innerText);
        const id = kindOfIndexToAdd === 'purchase' ? 'purchase-figure' : 'sell-figure';
        console.log(id, 'ID');
        setIndicesForUser(id, { fecha: event.target.children[0].innerText, dato: event.target.children[1].innerText });
        closeModalButton.click();
    }
});