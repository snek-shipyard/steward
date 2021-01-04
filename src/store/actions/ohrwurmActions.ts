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
  channelId
  members {
    username
    isOhrwurmSupervisor
  }
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
  attendees {
    ... on AttendeeBlock {
      name
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

//#region > Ohrwurm PAC Actions
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

const addPACAction = (
  title: string,
  description?: string,
  channelId?: string,
  members?: string[]
): ThunkAction<void, RootState, ohrwurmArguments, OhrwurmAction> => {
  return async (
    dispatch: ThunkDispatch<RootState, ohrwurmArguments, OhrwurmAction>,
    getState,
    { getClientSnek }
  ) => {
    try {
      const dataSheet = gql`
        mutation addPAC(
          $token: String!
          $title: String!
          $description: String
          $channelId: String
          $members: [String]
        ) {
          addPac(
            token: $token
            title: $title
            description: $description
            channelId: $channelId
            members: $members
          ) {
            pac {
              id
            }
          }
        }
      `;
      dispatch({ type: "OHRWURM_ADD_PAC_REQUEST" });

      const { data, errors } = await getClientSnek().session.runner<{
        addPac: {
          pac: {
            id: string;
          };
        };
      }>("mutation", dataSheet, { title, description, channelId, members });

      if (errors) {
        throw new Error(errors[0].message);
      }
      // add new pac to current pac items
      let pacs = getState().ohrwurm.pacs;

      if (!pacs) {
        pacs = { pagination: { total: 0, nextPage: 0 }, items: [] };
      }

      pacs?.items.push({
        id: data?.addPac.pac.id ? parseInt(data?.addPac.pac.id) : -1,
        title,
        description,
        channelId,
        members: members?.map((elem) => {
          return { username: elem };
        }),
      });

      dispatch({
        type: "OHRWURM_ADD_PAC_SUCCESS",
        payload: {
          pacs,
        },
      });
    } catch (ex) {
      dispatch({
        type: "OHRWURM_ADD_PAC_FAILURE",
        payload: {
          error: {
            errorCode: 999,
            message: `Adding PAC failed (${ex.message})`,
          },
          errorDetails: ex,
        },
      });
    }
  };
};

const deletePACAction = (
  id: number
): ThunkAction<void, RootState, ohrwurmArguments, OhrwurmAction> => {
  return async (
    dispatch: ThunkDispatch<RootState, ohrwurmArguments, OhrwurmAction>,
    getState,
    { getClientSnek }
  ) => {
    try {
      const dataSheet = gql`
        mutation deletePAC($token: String!, $id: ID!) {
          deletePac(token: $token, id: $id) {
            success
          }
        }
      `;
      dispatch({ type: "OHRWURM_DELETE_PAC_REQUEST" });

      const { data, errors } = await getClientSnek().session.runner<{
        deletePAC: { success: string };
      }>("mutation", dataSheet, { id });

      if (errors) {
        throw new Error(errors[0].message);
      }

      // add new pac to current pac items
      let pacs = getState().ohrwurm.pacs;

      if (!pacs) {
        pacs = { pagination: { total: 0, nextPage: 0 }, items: [] };
      }

      pacs.items = pacs.items.filter((elem) => elem.id !== id);

      dispatch({
        type: "OHRWURM_DELETE_PAC_SUCCESS",
        payload: {
          pacs,
        },
      });
    } catch (ex) {
      dispatch({
        type: "OHRWURM_DELETE_PAC_FAILURE",
        payload: {
          error: {
            errorCode: 999,
            message: `Deleting PAC failed (${ex.message})`,
          },
          errorDetails: ex,
        },
      });
    }
  };
};

const updatePACAction = (
  id: string,
  title?: string,
  description?: string,
  channelId?: string,
  members?: string[]
): ThunkAction<void, RootState, ohrwurmArguments, OhrwurmAction> => {
  return async (
    dispatch: ThunkDispatch<RootState, ohrwurmArguments, OhrwurmAction>,
    getState,
    { getClientSnek }
  ) => {
    try {
      const dataSheet = gql`
        mutation updatePAC(
          $token: String!
          $id: ID!
          $title: String
          $description: String
          $channelId: String
          $members: [String]
        ) {
          updatePac(
            token: $token
            id: $id
            title: $title
            description: $description
            channelId: $channelId
            members: $members
          ) {
            pac {
              id
              title
            }
          }
        }
      `;
      dispatch({ type: "OHRWURM_UPDATE_PAC_REQUEST" });

      const { data, errors } = await getClientSnek().session.runner<{
        updatePac: {
          pac: {
            id: string;
            title: string;
          };
        };
      }>("mutation", dataSheet, { id, title, description, channelId, members });

      if (errors) {
        throw new Error(errors[0].message);
      }

      // add new pac to current pac items
      let pacs = getState().ohrwurm.pacs;
      if (pacs && data) {
        const index = pacs.items.findIndex((item) => item.id.toString() === id);
        const updated: PAC = {
          id: parseInt(id),
          title: data.updatePac.pac.title,
          description,
          channelId,
          members: members?.map((elem) => {
            return { username: elem };
          }),
        };

        const items = [
          ...pacs.items.slice(0, index),
          updated,
          ...pacs.items.slice(index + 1),
        ];
        pacs.items = [...items];
      }

      dispatch({
        type: "OHRWURM_UPDATE_PAC_SUCCESS",
        payload: {
          pacs,
        },
      });
    } catch (ex) {
      dispatch({
        type: "OHRWURM_UPDATE_PAC_FAILURE",
        payload: {
          error: {
            errorCode: 999,
            message: `Updating PAC failed (${ex.message})`,
          },
          errorDetails: ex,
        },
      });
    }
  };
};
//#endregion

//#region > Ohrwurm Track Actions
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
export {
  fetchPACSAction,
  fetchPACTracksAction,
  addPACAction,
  deletePACAction,
  updatePACAction,
};
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Nico Schett
 */
