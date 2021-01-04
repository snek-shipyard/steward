//#region > Imports
//> Action Types
import { OhrwurmState, OhrwurmAction } from "../types";
//#endregion

//#region > Constant Variables
const INIT_STATE: OhrwurmState = {
  pacs: undefined,
  tracks: undefined,
  members: undefined,
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
    //> Get PACs
    case "OHRWURM_FETCH_PACS_REQUEST":
    case "OHRWURM_ADD_PAC_REQUEST":
    case "OHRWURM_DELETE_PAC_REQUEST":
    case "OHRWURM_UPDATE_PAC_REQUEST":
      return state;
    case "OHRWURM_FETCH_PACS_SUCCESS":
    case "OHRWURM_ADD_PAC_SUCCESS":
    case "OHRWURM_DELETE_PAC_SUCCESS":
    case "OHRWURM_UPDATE_PAC_SUCCESS":
      return {
        ...state,
        pacs: payload?.pacs,
      };
    case "OHRWURM_FETCH_PACS_FAILURE":
    case "OHRWURM_ADD_PAC_FAILURE":
    case "OHRWURM_DELETE_PAC_FAILURE":
    case "OHRWURM_UPDATE_PAC_FAILURE":
      return {
        ...INIT_STATE,
        error: payload?.error,
        errorDetails: payload?.errorDetails,
      };
    //> Get Tracks
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
    //> Members
    case "OHRWURM_FETCH_MEMBERS_REQUEST":
    case "OHRWURM_ADD_MEMBER_REQUEST":
    case "OHRWURM_DELETE_MEMBER_REQUEST":
    case "OHRWURM_UPDATE_MEMBER_REQUEST":
      return state;
    case "OHRWURM_FETCH_MEMBERS_SUCCESS":
    case "OHRWURM_ADD_MEMBER_SUCCESS":
    case "OHRWURM_DELETE_MEMBER_SUCCESS":
    case "OHRWURM_UPDATE_MEMBER_SUCCESS":
      return {
        ...state,
        members: payload?.members,
      };
    case "OHRWURM_FETCH_MEMBERS_FAILURE":
    case "OHRWURM_ADD_MEMBER_FAILURE":
    case "OHRWURM_DELETE_MEMBER_FAILURE":
    case "OHRWURM_UPDATE_MEMBER_FAILURE":
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
