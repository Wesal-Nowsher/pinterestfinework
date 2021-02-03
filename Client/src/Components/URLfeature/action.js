

export const urlcomplete = (bool) => async (dispatch) => {
    dispatch({
        type: "urlcomplete",
        payload:bool
    })
};

export const generatedcontent = (data) => async (dispatch) => {
    dispatch({
        type: "generatedcontent",
        payload:data
    })
};

