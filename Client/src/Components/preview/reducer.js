

const initialState = {
    previewopen:false,
    data:{}

};

export default (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case "previewopen":
            newState.previewopen = !newState.previewopen;
            break;
        case "previewdata":
            newState.data = action.payload;
            break;
        default:
            break;
    }
    return newState;
};
