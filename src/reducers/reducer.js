import dataOfTrello from "./../store/data"



  function reducer(state = dataOfTrello , action) {
    switch (action.type) {
        case 'DRAG':
            return {
                columns : state.columns
            }   
        default:
            return state;
    }
}


export default reducer;
