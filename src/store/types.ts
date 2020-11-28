//#region > Imports
//> Client
import { SnekClient as _SnekClient } from "snek-client";
//#endregion

//#region > General
export type SnekClient = _SnekClient;

export interface ErrorState {
  error?: {
    message: string;
    code?: number;
  };
  errorDetails?: any;
}

export interface Pagination {
  total: number;
  nextPage: number;
}
//#endregion

//#region > User Reducers
export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGOUT_REQUEST = "USER_LOGOUT_REQUEST";
export const USER_LOGOUT_FAILURE = "USER_LOGOUT_FAILURE";
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";

export interface UserState extends ErrorState {
  anonymous?: boolean;
  username?: string;
}

export type LoginAction = {
  type:
    | typeof USER_LOGIN_REQUEST
    | typeof USER_LOGIN_FAILURE
    | typeof USER_LOGIN_SUCCESS
    | typeof USER_LOGOUT_REQUEST
    | typeof USER_LOGOUT_FAILURE
    | typeof USER_LOGOUT_SUCCESS;
  payload?: UserState;
};
//#endregion

//#region > Ohrwurm Reducers
export const OHRWURM_FETCH_PACS_REQUEST = "OHRWURM_FETCH_PACS_REQUEST";
export const OHRWURM_FETCH_PACS_SUCCESS = "OHRWURM_FETCH_PACS_SUCCESS";
export const OHRWURM_FETCH_PACS_FAILURE = "OHRWURM_FETCH_PACS_FAILURE";
export const OHRWURM_SEARCH_PACS_REQUEST = "OHRWURM_SEARCH_PACS_REQUEST";
export const OHRWURM_SEARCH_PACS_SUCCESS = "OHRWURM_SEARCH_PACS_SUCCESS";
export const OHRWURM_SEARCH_PACS_FAILURE = "OHRWURM_SEARCH_PACS_FAILURE";

export const OHRWURM_FETCH_TRACKS_REQUEST = "OHRWURM_FETCH_TRACKS_REQUEST";
export const OHRWURM_FETCH_TRACKS_SUCCESS = "OHRWURM_FETCH_TRACKS_SUCCESS";
export const OHRWURM_FETCH_TRACKS_FAILURE = "OHRWURM_FETCH_TRACKS_FAILURE";
export const OHRWURM_SEARCH_TRACKS_REQUEST = "OHRWURM_SEARCH_TRACKS_REQUEST";
export const OHRWURM_SEARCH_TRACKS_SUCCESS = "OHRWURM_SEARCH_TRACKS_SUCCESS";
export const OHRWURM_SEARCH_TRACKS_FAILURE = "OHRWURM_SEARCH_TRACKS_FAILURE";

export interface PAC {
  id: number;
  title: string;
  description: string;
}

export interface Track {
  id: number;
  title: string;
  createdAt: string;
  description: string;
  tags: { name: string; significance: string }[];
  transcript: string;
  pac: PAC;
  audioFileUrl: string;
}

export interface OhrwurmState extends ErrorState {
  pacs?: {
    pagination: Pagination;
    items: PAC[];
  };
  tracks?: {
    pacId: number;
    pagination: Pagination;
    items?: Track[];
  };
}

export type OhrwurmAction = {
  type:
    | typeof OHRWURM_FETCH_PACS_REQUEST
    | typeof OHRWURM_FETCH_PACS_SUCCESS
    | typeof OHRWURM_FETCH_PACS_FAILURE
    | typeof OHRWURM_SEARCH_PACS_REQUEST
    | typeof OHRWURM_SEARCH_PACS_SUCCESS
    | typeof OHRWURM_SEARCH_PACS_FAILURE
    | typeof OHRWURM_FETCH_TRACKS_REQUEST
    | typeof OHRWURM_FETCH_TRACKS_SUCCESS
    | typeof OHRWURM_FETCH_TRACKS_FAILURE
    | typeof OHRWURM_SEARCH_TRACKS_REQUEST
    | typeof OHRWURM_SEARCH_TRACKS_SUCCESS
    | typeof OHRWURM_SEARCH_TRACKS_FAILURE;
  payload?: OhrwurmState;
};
//#endregion
