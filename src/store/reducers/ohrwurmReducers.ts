//#region > Imports
//> Action Types
import { OhrwurmState, OhrwurmAction } from "../types";
//#endregion

//#region > Constant Variables
const INIT_STATE: OhrwurmState = {
  pacs: undefined,
  tracks: undefined,
  error: undefined,
  errorDetails: undefined,
};
//#endregion

//#region > Reducers
const ohrwurmReducer = (
  state = INIT_STATE,
  action: OhrwurmAction
): OhrwurmState => {
  const { type, payload } = action;

  switch (type) {
    //> PAC
    case "OHRWURM_FETCH_PACS_REQUEST":
      return state;
    case "OHRWURM_FETCH_PACS_SUCCESS":
      return {
        ...state,
        pacs: payload?.pacs,
      };
    case "OHRWURM_FETCH_PACS_FAILURE":
      return {
        ...INIT_STATE,
        error: payload?.error,
        errorDetails: payload?.errorDetails,
      };
    //> Track
    case "OHRWURM_FETCH_TRACKS_REQUEST":
      return state;
    case "OHRWURM_FETCH_TRACKS_SUCCESS":
      return {
        ...state,
        tracks: payload?.tracks,
      };
    case "OHRWURM_FETCH_TRACKS_FAILURE":
      return {
        ...INIT_STATE,
        error: payload?.error,
        errorDetails: payload?.errorDetails,
      };
    default:
      return state;
  }
};
//#endregion

//#region > Exports
export default ohrwurmReducer;
//#endregion
