

const initialState = {
    urldata:{},
    data:{},
    urlcomplete:false,
    generatedcontent:[]
};

export default (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case "urldata":
            newState.urldata = action.payload;
            break;
        case "eraseurldata":
            newState.urldata = {};
            break;
        case "urlcomplete":
            newState.urlcomplete =action.payload
            break;
        case "generatedcontent":
            newState.generatedcontent =action.payload;
            break;
        default:
            break;
    }
    return newState;
};
