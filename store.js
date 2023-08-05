const createStore = (reducer, initialState) => {
    let state = initialState;
    let updater = () => {};

    const getState = () => state;
    
    const dispatch = (action) => {
        state = reducer(state, action);
        updater();
    }
    const subscribe = (listener) => {
        updater = listener;
    }
    return {
        getState,
        dispatch,
        subscribe
    }
}
const reducer = (state, action) => {
    switch (action.type) {
        case 'purchase-date':{
          return { ...state, ...action.payload }
        }
        case 'sell-date':{
          return { ...state, ...action.payload }
        }
        case 'purchase-price':{
            return { ...state, ...action.payload }
        }
        case 'sell-price':{
            return { ...state, ...action.payload }
        }
        case 'commission-paid-purchase':{
            return { ...state, ...action.payload }
        }
        case 'commission-paid-sell':{
            return { ...state, ...action.payload }
        }
        default: {
          return state
        }
      }
}
export const store = createStore(reducer, {
    purchaseDate: '',
    sellDate: ''
});
// store.dispatch();
// store.getState();
// store.subscribe();

store.subscribe(() => {
    //console.log('Ha cambiado algo en el store', store.getState());
});
store.dispatch({
    type: 'purchase-date',
    payload: {
        purchaseDate: 'New purchase date'
    }
});
store.dispatch({
    type: 'sell-date',
    payload: {
        sellDate: 'New sell date'
    }
});