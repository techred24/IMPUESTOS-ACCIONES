export const createElement = ({ name, attributes }) => {
    const element = document.createElement(name);
    for (const [attribute, value] of Object.entries(attributes)) {
        element.setAttribute(attribute, value);
    }
    return element;
}

export const removeAttributeById = (id) => document.getElementById(id).remove();

export const request = async (dateData, anios) => {
    const resp = await fetch('https://www.banxico.org.mx/SieAPIRest/service/v1/series/SP1/datos?' + new URLSearchParams({
        'token': 'ea526ff2d8d0cce16cd66f8aa4fb078b66d1e6ce0b3b6b8c9c8dcbb25e65533e',
    }));
        const dias = (await resp.json())?.bmx?.series[0]?.datos ?? [];
        if (!dias) return
        let datosReversa = dias.reverse();
            for (let dia of datosReversa) {
                // console.log(dia, 'DIA')
                if (dateData.includes(dia.fecha.slice(3))) return
                dateData.push({fecha: dia.fecha.slice(3), dato: dia.dato});
                if (anios.includes(dia.fecha.slice(6))) continue
                anios.push(dia.fecha.slice(6));
            }
    }
 export const findMonthsForYear = (yearToFind, [...dateData]) => {
        let newDates = dateData.filter(date => date.fecha.includes(yearToFind));
        return newDates;
    }
 export const deletePreviousElements = () => {
        const $inpcContainer = document.getElementById('inpc__indices');
        const inpcData = $inpcContainer.children;
        if (inpcData.length === 0) return
        [...inpcData].forEach(element => element.remove());
    }
export const createElementsForMonthData = (newDates) => {
    const elementDataContainer = {
        name: 'div',
        attributes: {
            class: 'inpc__indice'
        }
    }
    const dateElement = {
        name: 'p',
        attributes: {
            class: 'inpc__fecha',
            style: 'pointer-events: none'
        }
    }
    const dataElement = {
        name: 'p',
        attributes: {
            class: 'inpc__dato',
            style: 'pointer-events: none'
        }
    }
    for (const infoToAdd of newDates) {
        const elementToAdd = createElement(elementDataContainer);
        const dato = createElement(dataElement);
        dato.innerText = infoToAdd.dato;
        const fecha = createElement(dateElement);
        fecha.innerText = infoToAdd.fecha;
        elementToAdd.appendChild(fecha);
        elementToAdd.appendChild(dato);
        document.getElementById('inpc__indices').prepend(elementToAdd);
    }
}

export const setIndicesForUser = (id, { fecha, dato }) => {
    const indexToShow = document.getElementById(id);
    // indexToShow.innerText = '';
    indexToShow.innerText = `${dato} (${fecha})`;
    verifyIfSetBothIndexed()
}
const verifyIfSetBothIndexed = () => {
    const purchaseIndexContent = document.getElementById('purchase-figure').innerHTML;
    const sellIndexContent = document.getElementById('sell-figure').innerHTML;
    if (purchaseIndexContent.length === 0 || sellIndexContent.length === 0) return;
    console.log('llegando aqui')
    setUpdateFactor();
}
const setUpdateFactor = () => {
    const purchaseIndex = document.getElementById('purchase-figure').innerText.split(' ')[0];
    const sellIndex = document.getElementById('sell-figure').innerText.split(' ')[0];
    console.log(Number(purchaseIndex))
    console.log(Number(sellIndex))
    console.log(Number(sellIndex) / Number(purchaseIndex))
    const updateFigure = document.getElementById('update-figure');
    let updateIndex = Number(sellIndex) / Number(purchaseIndex);
    updateFigure.innerText = updateIndex;
}
// Addin' comment