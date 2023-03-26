import { createElementsForMonthData, deletePreviousElements } from './helpers.js';
const $modal = document.getElementById('modal');
const $inpcIndexesContainer = document.getElementById('inpc__indices');
class Adapter {
    showModal() {}
}
export class PurchaseModalAdapter extends Adapter {
    constructor(monthsToShow) {
        super(monthsToShow);
        this.monthsToShow = monthsToShow;
    }
    getMonths() {
        deletePreviousElements();
        $modal.classList.add('target');
        $inpcIndexesContainer.dataset.type = 'purchase';
        return this.monthsToShow;
    }
}
export class SellModalAdapter extends Adapter {
    constructor(monthsToShow) {
        super(monthsToShow);
        this.monthsToShow = monthsToShow;
    }
    getMonths() {
        deletePreviousElements();
        $modal.classList.add('target');
        $inpcIndexesContainer.dataset.type = 'sell';
        return this.monthsToShow;
    }
}

export class ListView {
    static showModal (adapter) {
        const monthsToShow = adapter.getMonths();
        createElementsForMonthData(monthsToShow);
    }
}