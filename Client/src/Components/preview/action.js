

export const openpreview = () => async (dispatch) => {
console.log("openpreview iss called")
    dispatch({
        type: "previewopen",
    })
};
export const previewdata = (data) => async (dispatch) => {
    console.log("openpreview iss called")
    dispatch({
        type: "previewdata",
        payload:data
    })
};
export const previewdataactioncheck = () => {
    console.log("openpreview iss called")
    return {"text":"wesal"};
};
