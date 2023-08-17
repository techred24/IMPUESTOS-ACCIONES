export const templateCalcularImpuestos = `<div class="buttons__container" id="buttons__container">
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
            </div>`;