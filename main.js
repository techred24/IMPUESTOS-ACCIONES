import { ListView, PurchaseModalAdapter, SellModalAdapter } from "./adapter.js";
import { request, findMonthsForYear, setIndicesForUser } from "./helpers.js";
const anios = [];
const dateData = [];


    request(dateData, anios);


// let $currentSelectedYear = document.getElementById('currentSelectedYear');
// const $openModalButtonPurchase = document.getElementById('selectIndexPurchase');
// const $openModalButtonSell = document.getElementById('selectIndexSell');
// const $closeModalButton = document.getElementById('modal__button-close');
// const $modal = document.getElementById('modal');
// const $inpcContainer = document.getElementById('inpc__indices');

// const getMonthsForCurrentYear = () => {
//     let firstYear = anios[0];
//     $currentSelectedYear.innerText = firstYear;
//     const monthsForYear = findMonthsForYear(Number(firstYear), dateData);
//     return monthsForYear;
// }
// $openModalButtonPurchase.addEventListener('click', () => {
//     const adapter = new PurchaseModalAdapter(getMonthsForCurrentYear());
//     ListView.showModal(adapter);
// });
// $openModalButtonSell.addEventListener('click', () => {
//     const adapter = new SellModalAdapter(getMonthsForCurrentYear());
//     ListView.showModal(adapter);
// });
// $closeModalButton.addEventListener('click', () => {
//     $modal.classList.remove('target');
// });

// document.addEventListener('DOMContentLoaded', () => {
//     const $backArrow = document.getElementById('back_arrow');
//     const $forwardArrow = document.getElementById('forward_arrow');
//     $backArrow.addEventListener('click', () => {
//         let previousYear = Number($currentSelectedYear.innerText) - 1;
//         if (!anios.includes(previousYear.toString())) return;
//             $currentSelectedYear.innerText = previousYear;
//             findMonthsForYear(previousYear, dateData);
//     });
//     $forwardArrow.addEventListener('click', () => {
//         let nextYear = Number($currentSelectedYear.innerText) + 1;
//         if (!anios.includes(nextYear.toString())) return;
//             $currentSelectedYear.innerText = nextYear;
//             findMonthsForYear(nextYear, dateData);
//     });
// });

// document.getElementById('inpc__indices').addEventListener('click', (event) => {
//     if (event.target.className === 'inpc__indice') {
//         console.log(event.target.children[0].innerText, event.target.children[1].innerText);
//         const id = $inpcContainer.dataset.type === 'purchase' ? 'purchase-figure' : 'sell-figure';
//         setIndicesForUser(id, { fecha: event.target.children[0].innerText, dato: event.target.children[1].innerText });
//         $closeModalButton.click();
//     }
// });

// document.getElementById('sell-purchase__container').addEventListener('keypress', (event) => {
//     event.preventDefault();
//       if (event.target.value.includes('.') && event.key === '.') return
//       let key = window.event ? event.which : event.keyCode
//       if ((key >= 48 && key <= 57) || key === 46) event.target.value += event.key
// });








const tabsBox = document.querySelector(".tabs-box"),
allTabs = tabsBox.querySelectorAll(".tab"),
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
        // tabsBox.querySelector(".active").classList.remove("active");
        allTabs.forEach(tab => tab.matches('.active') ? tab.classList.remove('active') : null);
        tab.classList.add("active");
    });
});
allTabs.forEach(tab => {
    tab.addEventListener('click', ()=> {
        if (tab.innerText === 'Calcular impuesto de enajenación de acción') {
            document.body.insertAdjacentHTML('beforeend', `<div class="buttons__container" id="buttons__container">
            <button id="selectIndexPurchase" class="selectIndex">Seleccionar indice de compra</button>
            <button id="selectIndexSell" class="selectIndex">Seleccionar indice de venta</button>
            <div class="indices-compra-venta__wrapper">
                <p class="purchase-index">Indice de mes anterior a la compra: <span id="purchase-figure"></span></p>
                <p class="sell-index">Indice de mes al vender: <span id="sell-figure"></span></p>
                <p class="update-factor">Factor de actualización: <span id="update-figure"></span></p>
            </div>
            </div>
            
            
            <div class="sell-purchase__container" id="sell-purchase__container">
            <div class="data__purchase">
                <div class="input__data">
                    <label for="purchasePrice">Precio de compra:</label>
                    <input type="text" id="purchasePrice">
                </div>
                <div class="input__data">
                    <label for="purchaseCommission">Comisión pagada por la compra:</label>
                    <input type="text" id="purchaseCommission">
                </div>
            </div>
            
            <div class="data__sell">
                <div class="input__data">
                    <label for="sellPrice">Precio de venta:</label>
                    <input type="text" id="sellPrice">
                </div>
                <div class="input__data">
                    <label for="sellCommission">Comisión pagada por la venta:</label>
                    <input type="text" id="sellCommission">
                </div>
            </div>
            </div>`)

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
        }
    })
})

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

