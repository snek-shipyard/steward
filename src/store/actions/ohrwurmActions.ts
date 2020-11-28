//#region > Imports
//> Error Serialization
// Serialize/deserialize an error into a plain object
import { serializeError } from "serialize-error";
//> Redux
import { ThunkAction, ThunkDispatch } from "redux-thunk";
//> GQL
// DocumentNode needed for queries
import gql from "graphql-tag";
//> Client
import { SnekClient } from "snek-client";

//> Action Types
import { RootState } from "../reducers/index";
import { OhrwurmAction, Pagination, PAC, Track } from "../types";
//#endregion

//#region > Queries
const paginationQueryFragment = `
  pagination {
    total
    nextPage
  }
`;

const pacQueryFragment = `
  id
  title
  description
`;

const trackQueryFragment = `
  id
  title
  createdAt
  audioChannel
  audioCodec
  audioBitrate
  description
  tags {
    ... on TagBlock {
      name
      significance
    }
  }
  transcript
  pac {
    ${pacQueryFragment}
  }
  audioFileUrl
`;
//#endregion

//#region > Types
type ohrwurmArguments = {
  getClientSnek: () => SnekClient;
};
//#endregion

//#region > Ohrwurm Actions
const fetchPACSAction = (
  searchQuery?: string
): ThunkAction<void, RootState, ohrwurmArguments, OhrwurmAction> => {
  return async (
    dispatch: ThunkDispatch<RootState, ohrwurmArguments, OhrwurmAction>,
    getState,
    { getClientSnek }
  ) => {
    let query;
    let variables;
    console.log("HTDASJDKASFASF", getClientSnek);

    if (searchQuery) {
      query = gql`
        query allPACS($token: String!, $searchQuery: String!) {
          projectAudioChannels(token: $token, searchQuery: $searchQuery, perPage: 1000, ) {
            ${paginationQueryFragment}
            items{
              ${pacQueryFragment}
            }
          }
        }
      `;
      variables = { searchQuery };
    } else {
      query = gql`
        query allPACS($token: String!) {
          projectAudioChannels(token: $token, perPage: 1000) {
            ${paginationQueryFragment}
            items{
              ${pacQueryFragment}
            }
          }
        }
      `;

      variables = {};
    }

    dispatch({ type: "OHRWURM_FETCH_PACS_REQUEST" });
    console.log(getClientSnek);
    const { data, errors } = await getClientSnek().session.runner<{
      projectAudioChannels: {
        pagination: Pagination;
        items: PAC[];
      };
    }>("query", query, variables);

    if (data) {
      dispatch({
        type: "OHRWURM_FETCH_PACS_SUCCESS",
        payload: {
          pacs: {
            pagination: {
              nextPage: data.projectAudioChannels.pagination.nextPage,
              total: data.projectAudioChannels.pagination.total,
            },
            items: data.projectAudioChannels.items,
          },
        },
      });
    }

    if (errors) {
      dispatch({
        type: "OHRWURM_FETCH_PACS_FAILURE",
        payload: {
          error: {
            message: "GraphQL Error",
          },
          errorDetails: serializeError(errors),
        },
      });
    }
  };
};

const fetchPACTracksAction = (
  pacId: number,
  searchQuery?: string
): ThunkAction<void, RootState, ohrwurmArguments, OhrwurmAction> => {
  return async (
    dispatch: ThunkDispatch<RootState, ohrwurmArguments, OhrwurmAction>,
    getState,
    { getClientSnek }
  ) => {
    try {
      let query;
      let variables;

      if (searchQuery) {
        query = gql`
          query allPACTracks($token: String!, $searchQuery: String!, $pac: Int!) {
            tracks(token: $token, searchQuery: $searchQuery, perPage: 1000, pac: $pac) {
              ${paginationQueryFragment}
              items{
                ${trackQueryFragment}
              }
            }
          }
        `;

        variables = { pac: pacId, searchQuery };
      } else {
        query = gql`
          query allPACTracks($token: String!, $pac: Int!) {
            tracks(token: $token, perPage: 1000, pac: $pac) {
              ${paginationQueryFragment}
              items{
                ${trackQueryFragment}
              }
            }
          }  
        `;

        variables = { pac: pacId };
      }
      dispatch({ type: "OHRWURM_FETCH_TRACKS_REQUEST" });

      const { data, errors } = await getClientSnek().session.runner<{
        tracks: {
          pagination: Pagination;
          items: Track[];
        };
      }>("query", query, variables);

      if (data) {
        dispatch({
          type: "OHRWURM_FETCH_TRACKS_SUCCESS",
          payload: {
            tracks: {
              pagination: {
                nextPage: data.tracks.pagination.nextPage,
                total: data.tracks.pagination.total,
              },
              pacId: pacId,
              items: data.tracks.items,
            },
          },
        });
      }

      if (errors) {
        dispatch({
          type: "OHRWURM_FETCH_TRACKS_FAILURE",
          payload: {
            error: {
              message: "GraphQL Error",
            },
            errorDetails: serializeError(errors),
          },
        });
      }
    } catch (ex) {
      dispatch({
        type: "OHRWURM_FETCH_TRACKS_FAILURE",
        payload: {
          errorDetails: serializeError(ex),
        },
      });
    }
  };
};
//#endregion

//#region > Exports
export { fetchPACSAction, fetchPACTracksAction };
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Nico Schett
 */
