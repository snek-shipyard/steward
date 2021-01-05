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
export const USER_CHANGE_PASSWORD_REQUEST = "USER_CHANGE_PASSWORD_REQUEST";
export const USER_CHANGE_PASSWORD_FAILURE = "USER_CHANGE_PASSWORD_FAILURE";
export const USER_CHANGE_PASSWORD_SUCCESS = "USER_CHANGE_PASSWORD_SUCCESS";

export interface UserState extends ErrorState {
  anonymous?: boolean;
  passwordChanged?: boolean;
  isOhrwurmSupervisor?: boolean;
  username?: string;
}

export type LoginAction = {
  type:
    | typeof USER_LOGIN_REQUEST
    | typeof USER_LOGIN_FAILURE
    | typeof USER_LOGIN_SUCCESS
    | typeof USER_LOGOUT_REQUEST
    | typeof USER_LOGOUT_FAILURE
    | typeof USER_LOGOUT_SUCCESS
    | typeof USER_CHANGE_PASSWORD_REQUEST
    | typeof USER_CHANGE_PASSWORD_FAILURE
    | typeof USER_CHANGE_PASSWORD_SUCCESS;
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

export const OHRWURM_ADD_PAC_REQUEST = "OHRWURM_ADD_PAC_REQUEST";
export const OHRWURM_ADD_PAC_SUCCESS = "OHRWURM_ADD_PAC_SUCCESS";
export const OHRWURM_ADD_PAC_FAILURE = "OHRWURM_ADD_PAC_FAILURE";
export const OHRWURM_DELETE_PAC_REQUEST = "OHRWURM_DELETE_PAC_REQUEST";
export const OHRWURM_DELETE_PAC_SUCCESS = "OHRWURM_DELETE_PAC_SUCCESS";
export const OHRWURM_DELETE_PAC_FAILURE = "OHRWURM_DELETE_PAC_FAILURE";
export const OHRWURM_UPDATE_PAC_REQUEST = "OHRWURM_UPDATE_PAC_REQUEST";
export const OHRWURM_UPDATE_PAC_SUCCESS = "OHRWURM_UPDATE_PAC_SUCCESS";
export const OHRWURM_UPDATE_PAC_FAILURE = "OHRWURM_UPDATE_PAC_FAILURE";

export const OHRWURM_FETCH_TRACKS_REQUEST = "OHRWURM_FETCH_TRACKS_REQUEST";
export const OHRWURM_FETCH_TRACKS_SUCCESS = "OHRWURM_FETCH_TRACKS_SUCCESS";
export const OHRWURM_FETCH_TRACKS_FAILURE = "OHRWURM_FETCH_TRACKS_FAILURE";
export const OHRWURM_SEARCH_TRACKS_REQUEST = "OHRWURM_SEARCH_TRACKS_REQUEST";
export const OHRWURM_SEARCH_TRACKS_SUCCESS = "OHRWURM_SEARCH_TRACKS_SUCCESS";
export const OHRWURM_SEARCH_TRACKS_FAILURE = "OHRWURM_SEARCH_TRACKS_FAILURE";

export const OHRWURM_FETCH_MEMBERS_REQUEST = "OHRWURM_FETCH_MEMBERS_REQUEST";
export const OHRWURM_FETCH_MEMBERS_SUCCESS = "OHRWURM_FETCH_MEMBERS_SUCCESS";
export const OHRWURM_FETCH_MEMBERS_FAILURE = "OHRWURM_FETCH_MEMBERS_FAILURE";
export const OHRWURM_ADD_MEMBER_REQUEST = "OHRWURM_ADD_MEMBER_REQUEST";
export const OHRWURM_ADD_MEMBER_SUCCESS = "OHRWURM_ADD_MEMBER_SUCCESS";
export const OHRWURM_ADD_MEMBER_FAILURE = "OHRWURM_ADD_MEMBER_FAILURE";
export const OHRWURM_DELETE_MEMBER_REQUEST = "OHRWURM_DELETE_MEMBER_REQUEST";
export const OHRWURM_DELETE_MEMBER_SUCCESS = "OHRWURM_DELETE_MEMBER_SUCCESS";
export const OHRWURM_DELETE_MEMBER_FAILURE = "OHRWURM_DELETE_MEMBER_FAILURE";
export const OHRWURM_UPDATE_MEMBER_REQUEST = "OHRWURM_UPDATE_MEMBER_REQUEST";
export const OHRWURM_UPDATE_MEMBER_SUCCESS = "OHRWURM_UPDATE_MEMBER_SUCCESS";
export const OHRWURM_UPDATE_MEMBER_FAILURE = "OHRWURM_UPDATE_MEMBER_FAILURE";

export interface Member {
  id: string;
  username: string;
  isOhrwurmSupervisor?: boolean;
}

export interface PAC {
  id: string;
  title: string;
  description?: string;
  channelId?: string;
  members?: Member[];
}

export interface Track {
  id: string;
  title: string;
  createdAt: string;
  description: string;
  tags: { name: string; significance: string }[];
  attendees: { name: string }[];
  transcript: string;
  pac: PAC;
  audioFileUrl: string;
  actions: string;
}

export interface OhrwurmState extends ErrorState {
  pacs?: {
    pagination: Pagination;
    items: PAC[];
  };
  tracks?: {
    pacId: string;
    pagination: Pagination;
    items?: Track[];
  };
  members?: {
    added?: {
      username: string;
      generatedPassword: string;
    };
    items?: Member[];
  };
}

export type OhrwurmAction = {
  type:
    | typeof OHRWURM_FETCH_PACS_REQUEST
    | typeof OHRWURM_FETCH_PACS_SUCCESS
    | typeof OHRWURM_FETCH_PACS_FAILURE
    | typeof OHRWURM_ADD_PAC_REQUEST
    | typeof OHRWURM_ADD_PAC_SUCCESS
    | typeof OHRWURM_ADD_PAC_FAILURE
    | typeof OHRWURM_DELETE_PAC_REQUEST
    | typeof OHRWURM_DELETE_PAC_SUCCESS
    | typeof OHRWURM_DELETE_PAC_FAILURE
    | typeof OHRWURM_UPDATE_PAC_REQUEST
    | typeof OHRWURM_UPDATE_PAC_SUCCESS
    | typeof OHRWURM_UPDATE_PAC_FAILURE
    | typeof OHRWURM_SEARCH_PACS_REQUEST
    | typeof OHRWURM_SEARCH_PACS_SUCCESS
    | typeof OHRWURM_SEARCH_PACS_FAILURE
    | typeof OHRWURM_FETCH_TRACKS_REQUEST
    | typeof OHRWURM_FETCH_TRACKS_SUCCESS
    | typeof OHRWURM_FETCH_TRACKS_FAILURE
    | typeof OHRWURM_SEARCH_TRACKS_REQUEST
    | typeof OHRWURM_SEARCH_TRACKS_SUCCESS
    | typeof OHRWURM_SEARCH_TRACKS_FAILURE
    | typeof OHRWURM_FETCH_MEMBERS_REQUEST
    | typeof OHRWURM_FETCH_MEMBERS_FAILURE
    | typeof OHRWURM_FETCH_MEMBERS_SUCCESS
    | typeof OHRWURM_ADD_MEMBER_REQUEST
    | typeof OHRWURM_ADD_MEMBER_FAILURE
    | typeof OHRWURM_ADD_MEMBER_SUCCESS
    | typeof OHRWURM_DELETE_MEMBER_REQUEST
    | typeof OHRWURM_DELETE_MEMBER_FAILURE
    | typeof OHRWURM_DELETE_MEMBER_SUCCESS
    | typeof OHRWURM_UPDATE_MEMBER_REQUEST
    | typeof OHRWURM_UPDATE_MEMBER_FAILURE
    | typeof OHRWURM_UPDATE_MEMBER_SUCCESS;
  payload?: OhrwurmState;
};
//#endregion
