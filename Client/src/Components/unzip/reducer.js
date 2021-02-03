

const initialState = {
    zipfiles:[],

};

export default (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case "zipfiles":
            newState.zipfiles = action.payload;
            break;
        default:
            break;
    }
    return newState;
};
