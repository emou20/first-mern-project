

const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_ID_USER' :
            return {
                ...state,
                idUser: action.payload,
                loggedIn: true
            }
        case 'CLEAR_USER_ID' :
            return {
                ...state,
                idUser: {},
                loggedIn: false
            }
        default :
            return state;
    }
}

export default reducer;