import { combineReducers } from "redux";
import globalReducer from "./globalState";
import previewReducer from "../Components/preview/reducer";
import urlReducer from "../Components/URLfeature/reducer";
import zipReducer from "../Components/unzip/reducer";

const rootReducer = combineReducers({
	main: globalReducer,
	preview: previewReducer,
	url: urlReducer,
	zip: zipReducer,
});

export default rootReducer;
