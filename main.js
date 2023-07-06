import { ListView, PurchaseModalAdapter, SellModalAdapter } from "./adapter.js";
import { request, findMonthsForYear, setIndicesForUser } from "./helpers.js";
const anios = [];
const dateData = [];

// if (indexedDB) {

// } else {
    request(dateData, anios);
// }
let $currentSelectedYear = document.getElementById('currentSelectedYear');
const $openModalButtonPurchase = document.getElementById('selectIndexPurchase');
const $openModalButtonSell = document.getElementById('selectIndexSell');
const $closeModalButton = document.getElementById('modal__button-close');
const $modal = document.getElementById('modal');
const $inpcContainer = document.getElementById('inpc__indices');

const getMonthsForCurrentYear = () => {
    let firstYear = anios[0];
    $currentSelectedYear.innerText = firstYear;
    const monthsForYear = findMonthsForYear(Number(firstYear), dateData);
    return monthsForYear;
}
$openModalButtonPurchase.addEventListener('click', () => {
    const adapter = new PurchaseModalAdapter(getMonthsForCurrentYear());
    ListView.showModal(adapter);
});
$openModalButtonSell.addEventListener('click', () => {
    const adapter = new SellModalAdapter(getMonthsForCurrentYear());
    ListView.showModal(adapter);
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
            findMonthsForYear(previousYear, dateData);
    });
    $forwardArrow.addEventListener('click', () => {
        let nextYear = Number($currentSelectedYear.innerText) + 1;
        if (!anios.includes(nextYear.toString())) return;
            $currentSelectedYear.innerText = nextYear;
            findMonthsForYear(nextYear, dateData);
    });
});

document.getElementById('inpc__indices').addEventListener('click', (event) => {
    if (event.target.className === 'inpc__indice') {
        console.log(event.target.children[0].innerText, event.target.children[1].innerText);
        const id = $inpcContainer.dataset.type === 'purchase' ? 'purchase-figure' : 'sell-figure';
        setIndicesForUser(id, { fecha: event.target.children[0].innerText, dato: event.target.children[1].innerText });
        $closeModalButton.click();
    }
});

document.getElementById('sell-purchase__container').addEventListener('keypress', (event) => {
    event.preventDefault();
      if (event.target.value.includes('.') && event.key === '.') return
      let key = window.event ? event.which : event.keyCode
      if ((key >= 48 && key <= 57) || key === 46) event.target.value += event.key
});






const tabsBox = document.querySelector(".tabs-box"),
allTabs = tabsBox.querySelectorAll(".tab"),
arrowIcons = document.querySelectorAll(".icon i");

let isDragging = false;

const handleIcons = (scrollVal) => {
    let maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
    arrowIcons[0].parentElement.style.display = scrollVal <= 0 ? "none" : "flex";
    arrowIcons[1].parentElement.style.display = maxScrollableWidth - scrollVal <= 1 ? "none" : "flex";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        // if clicked icon is left, reduce 350 from tabsBox scrollLeft else add
        let scrollWidth = tabsBox.scrollLeft += icon.id === "left" ? -340 : 340;
        handleIcons(scrollWidth);
    });
});

allTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabsBox.querySelector(".active").classList.remove("active");
        tab.classList.add("active");
    });
});

const dragging = (e) => {
    if(!isDragging) return;
    tabsBox.classList.add("dragging");
    tabsBox.scrollLeft -= e.movementX;
    handleIcons(tabsBox.scrollLeft)
}

const dragStop = () => {
    isDragging = false;
    tabsBox.classList.remove("dragging");
}

tabsBox.addEventListener("mousedown", () => isDragging = true);
tabsBox.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);