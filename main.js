import { ListView, PurchaseModalAdapter, SellModalAdapter } from "./adapter.js";
import { request, findMonthsForYear, setIndicesForUser, deletePreviousElements, createElementsForMonthData } from "./helpers.js";
import { Router, customRoutes } from "./router.js";
import { createToast } from "./toast.js";
const anios = [];
const dateData = [];

    request(dateData, anios);

const $inpcContainer = document.getElementById('inpc__indices');
const $closeModalButton = document.getElementById('modal__button-close');
const clickListenerOnTab = (event) => {
    if (event.target.className === 'tab__date') {
        // console.log(event.target.children[0].innerText, event.target.children[1].innerText);
        const id = $inpcContainer.dataset.type === 'purchase' ? 'purchase-figure' : 'sell-figure';
        setIndicesForUser(id, { fecha: event.target.children[0].innerText, dato: event.target.children[1].innerText });
        $closeModalButton.click();
    }
}
document.getElementById('dates-box').addEventListener('click', clickListenerOnTab);


let $currentSelectedYear = document.getElementById('currentSelectedYear');
document.addEventListener('DOMContentLoaded', () => {
    const $backArrow = document.getElementById('back_arrow');
    const $forwardArrow = document.getElementById('forward_arrow');
    $backArrow.addEventListener('click', () => {
        // console.log('Clicking on back arrow')
        let previousYear = Number($currentSelectedYear.innerText) - 1;
        if (!anios.includes(previousYear.toString())) return;
            $currentSelectedYear.innerText = previousYear;
            deletePreviousElements();
            let newDatesForTabs = findMonthsForYear(previousYear, dateData);
            createElementsForMonthData(newDatesForTabs);
            checkOverflow();
    });
    $forwardArrow.addEventListener('click', () => {
        // console.log('Clicking on forward arrow')
        let nextYear = Number($currentSelectedYear.innerText) + 1;
        if (!anios.includes(nextYear.toString())) return;
            $currentSelectedYear.innerText = nextYear;
            deletePreviousElements();
            let newDatesForTabs = findMonthsForYear(nextYear, dateData);
            createElementsForMonthData(newDatesForTabs);
            checkOverflow();
    });
});
export const getMonthsForCurrentYear = () => {
    let firstYear = anios[0];
    $currentSelectedYear.innerText = firstYear;
    const monthsForYear = findMonthsForYear(Number(firstYear), dateData);
    return monthsForYear;
}

const $modal = document.getElementById('modal');
$closeModalButton.addEventListener('click', () => {
    $modal.classList.remove('target');
    enableScroll();
});

const datesBox = document.querySelector('#dates-box');
const dateTabs = document.querySelectorAll('.tab__date');
const dateArrowIcons = document.querySelectorAll('.icon-date i');

let isDragginDateTabs = false;
const handleDateIcons = (scrollVal) => {
    let maxScrollableWidth = datesBox.scrollWidth - datesBox.clientWidth;
    dateArrowIcons[0].parentElement.style.display = scrollVal <= 0 ? "none" : "flex";
    dateArrowIcons[1].parentElement.style.display = maxScrollableWidth - scrollVal <= 1 ? "none" : "flex";
}

dateArrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let scrollWidth = datesBox.scrollLeft += icon.id === "date-left" ? -340 : 340;
        handleDateIcons(scrollWidth);
    });
});

dateTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        // tabsBox.querySelector(".active").classList.remove("active");
        dateTabs.forEach(tab => tab.matches('.active') ? tab.classList.remove('active') : null);
        tab.classList.add("active");
    });
});
const draggingDates = (e) => {
    if(!isDragginDateTabs) return;
    datesBox.classList.add("dragging");
    // console.log(e.movementX, 'e.movementX');
    // console.log(datesBox.scrollLeft, 'datesBox.scrollLeft');
    datesBox.scrollLeft -= e.movementX;
    handleDateIcons(datesBox.scrollLeft);
}

const dateDragStop = () => {
    isDragginDateTabs = false;
    datesBox.classList.remove("dragging");
}
datesBox.addEventListener('wheel', (e) => {
    // console.log(e.deltaY, 'e.deltaY')
    // console.log(e.wheelDeltaY, 'e.wheelDeltaY')
    // console.log(e.currentTarget.scrollLeft, 'SCROLLLEFT DESDE CURRENT TARGET')
    let newValue = datesBox.scrollLeft - e.deltaY;
    datesBox.scrollLeft -= e.deltaY;
    handleDateIcons(newValue);
});
datesBox.addEventListener("mousedown", () => isDragginDateTabs = true);
datesBox.addEventListener("mousemove", draggingDates);
document.addEventListener("mouseup", dateDragStop);


const tabsBox = document.querySelector(".tabs-box"),
allTabs = tabsBox.querySelectorAll(".tab__button"),
arrowIcons = document.querySelectorAll(".icon i");

let isDragging = false;

const handleIcons = (scrollVal) => {
    let maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
    // console.log(maxScrollableWidth, 'maxScrollableWidth');
    arrowIcons[0].parentElement.style.display = scrollVal <= 0 ? "none" : "flex";
    // console.log(maxScrollableWidth - scrollVal, 'maxScrollableWidth - scrollVal');
    // console.log(maxScrollableWidth - scrollVal <= 1, 'maxScrollableWidth - scrollVal <= 1');
    arrowIcons[1].parentElement.style.display = maxScrollableWidth - scrollVal <= 1 ? "none" : "flex";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        // if clicked icon is left, reduce 350 from tabsBox scrollLeft else add
        let scrollWidth = tabsBox.scrollLeft += icon.id === "left" ? -340 : 340;
        // console.log(scrollWidth, 'scrollWidth');
        handleIcons(scrollWidth);
    });
});

allTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        // localStorage.clear();
        // tabsBox.querySelector(".active").classList.remove("active");
        allTabs.forEach(tab => tab.matches('.active') ? tab.classList.remove('active') : null);
        tab.classList.add("active");
    });
});

allTabs.forEach(tab => {
    tab.addEventListener('click', ()=> {
        // if (tab.innerText === 'Calcular impuesto de enajenación de acción') {
        // }
    });
})
export function checkOverflow() {
    let el = document.getElementById('dates-box');
    let isOverflowing = el.clientWidth < el.scrollWidth;
    // console.log(isOverflowing, 'Overflow state')
    let maxScrollableWidth = datesBox.scrollWidth - datesBox.clientWidth;
    if (!isOverflowing) dateArrowIcons.forEach(icon => icon.parentElement.style.display = 'none');
    if (isOverflowing) {
        dateArrowIcons[0].parentElement.style.display = datesBox.scrollLeft <= 0 ? 'none' : 'flex';
        dateArrowIcons[1].parentElement.style.display = maxScrollableWidth - datesBox.scrollLeft <= 1 ? 'none' : 'flex';
    }
}

const dragging = (e) => {
    if(!isDragging) return;
    tabsBox.classList.add("dragging");
    console.log(e.movementX, 'e.movementX');
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


// IMPLEMENTING NO SCROLL
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

const preventDefaultForScrollKeys = (e) => {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
let supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

let wheelOpt = supportsPassive ? { passive: false } : false;
let wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

export function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

export function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}


// INPUTS

document.getElementById('pdf-input').addEventListener('change', (event) => {
    // console.log(document.getElementById('pdf-input').value)
    console.log(event.target.files[0])
    const documentName = event.target.files[0].name
    const extension = documentName.substring(documentName.lastIndexOf('.') + 1);
    console.log(extension);
    if (extension !== 'pdf') {
        event.target.value = null
        createToast('warning', 'Seleccione un archivo con extensión pdf')
    }
})





const fileInput = document.querySelector('#avatar');
const preview = document.querySelector("img.preview");
const eventLog = document.querySelector(".event-log-contents");
const reader = new FileReader();

function handleEvent(event) {
  eventLog.textContent += `${event.type}: ${event.loaded} bytes transferred\n`;

  if (event.type === "load") {
    preview.src = reader.result;
  }
}

function addListeners(reader) {
  reader.addEventListener("loadstart", handleEvent);
  reader.addEventListener("load", handleEvent);
  reader.addEventListener("loadend", handleEvent);
  reader.addEventListener("progress", handleEvent);
  reader.addEventListener("error", handleEvent);
  reader.addEventListener("abort", handleEvent);
}

function handleSelected(e) {
  eventLog.textContent = "";
  const selectedFile = fileInput.files[0];
  if (selectedFile) {
    addListeners(reader);
    reader.readAsDataURL(selectedFile);
  }
}

fileInput.addEventListener("change", handleSelected);