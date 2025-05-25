// tenant-team.slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'api/base.query';
import toast from 'react-hot-toast';
import { handleApiError } from 'api/api.error';
import { TenantTeamRequestDTO } from '@dto/request/tenant-team-request.dto';
import { TenantTeamResponseDTO } from '@dto/response/tenent-team-response.dto';
import { TenantTeamUserRequestDTO } from '@dto/request/tenant-team-user-request.dto';
import { TenantTeamUserResponseDTO } from '@dto/response/tenant-team-user-response.dto';
import { UserResponseDTO } from '@dto/response';

// Initial State
interface TenantTeamState {
    selectedTeam: TenantTeamResponseDTO | null;
    teamUsers: UserResponseDTO[];
    teams: TenantTeamResponseDTO[];
}

const initialState: TenantTeamState = {
    selectedTeam: null,
    teamUsers: [],
    teams: [],
};

// Slice
const tenantTeamSlice = createSlice({
    name: 'tenantTeam',
    initialState,
    reducers: {
        setSelectedTeam: (state, action: PayloadAction<TenantTeamResponseDTO>) => {
            state.selectedTeam = action.payload;
        },
        clearSelectedTeam: (state) => {
            state.selectedTeam = null;
        },
        setTeamUsers: (state, action: PayloadAction<UserResponseDTO[]>) => {
            state.teamUsers = action.payload;
        },
        setTeams: (state, action: PayloadAction<TenantTeamResponseDTO[]>) => {
            state.teams = action.payload;
        },
    },
});

// Selectors
export const selectSelectedTeam = (state: RootState) => state.tenantTeam.selectedTeam;
export const selectTeamUsers = (state: RootState) => state.tenantTeam.teamUsers;
export const selectTeams = (state: RootState) => state.tenantTeam.teams;

// Actions
export const {
    setSelectedTeam,
    clearSelectedTeam,
    setTeamUsers,
    setTeams
} = tenantTeamSlice.actions;

// API
export const tenantTeamApi = createApi({
    reducerPath: 'tenant-team-api',
    baseQuery: axiosBaseQuery,
    endpoints: (builder) => ({
        // Team endpoints
        fetchTenantTeams: builder.query<TenantTeamResponseDTO[], string>({
            query: (tenantId) => ({
                url: `/tenants/${tenantId}/teams`,
                method: 'GET',
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setTeams(data));
                } catch (err) {
                    toast.error(handleApiError(err));
                    throw err;
                }
            },
        }),

        createTenantTeam: builder.mutation<TenantTeamResponseDTO, { tenantId: string; payload: TenantTeamRequestDTO }>({
            query: ({ tenantId, payload }) => ({
                url: `/tenants/${tenantId}/teams`,
                method: 'POST',
                body: payload,
            }),
            onQueryStarted: async (_, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    toast.success('Team created successfully');
                } catch (err) {
                    toast.error(handleApiError(err));
                    throw err;
                }
            },
        }),

        updateTenantTeam: builder.mutation<TenantTeamResponseDTO, { tenantId: string; teamId: string; payload: TenantTeamRequestDTO }>({
            query: ({ tenantId, teamId, payload }) => ({
                url: `/tenants/${tenantId}/teams/${teamId}`,
                method: 'PUT',
                body: payload,
            }),
            onQueryStarted: async (_, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    toast.success('Team updated successfully');
                } catch (err) {
                    toast.error(handleApiError(err));
                    throw err;
                }
            },
        }),

        deleteTenantTeam: builder.mutation<void, { tenantId: string; teamId: string }>({
            query: ({ tenantId, teamId }) => ({
                url: `/tenants/${tenantId}/teams/${teamId}`,
                method: 'DELETE',
            }),
            onQueryStarted: async (_, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    toast.success('Team deleted successfully');
                } catch (err) {
                    toast.error(handleApiError(err));
                    throw err;
                }
            },
        }),

        // Team Users endpoints
        fetchTeamUsers: builder.query<UserResponseDTO[], { tenantId: string; teamId: string }>({
            query: ({ tenantId, teamId }) => ({
                url: `/tenants/${tenantId}/teams/${teamId}/users`,
                method: 'GET',
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setTeamUsers(data));
                } catch (err) {
                    toast.error(handleApiError(err));
                    throw err;
                }
            },
        }),

        addTeamUser: builder.mutation<TenantTeamUserResponseDTO, { tenantId: string; teamId: string; payload: TenantTeamUserRequestDTO }>({
            query: ({ tenantId, teamId, payload }) => ({
                url: `/tenants/${tenantId}/teams/${teamId}/users`,
                method: 'POST',
                body: payload,
            }),
            onQueryStarted: async (_, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    toast.success('User added to team successfully');
                } catch (err) {
                    toast.error(handleApiError(err));
                    throw err;
                }
            },
        }),

        removeTeamUser: builder.mutation<void, { tenantId: string; teamId: string; userId: string }>({
            query: ({ tenantId, teamId, userId }) => ({
                url: `/tenants/${tenantId}/teams/${teamId}/users/${userId}`,
                method: 'DELETE',
            }),
            onQueryStarted: async (_, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    toast.success('User removed from team successfully');
                } catch (err) {
                    toast.error(handleApiError(err));
                    throw err;
                }
            },
        }),
    }),
});

// Export hooks
export const {
    useFetchTenantTeamsQuery,
    useCreateTenantTeamMutation,
    useUpdateTenantTeamMutation,
    useDeleteTenantTeamMutation,
    useFetchTeamUsersQuery,
    useAddTeamUserMutation,
    useRemoveTeamUserMutation,
} = tenantTeamApi;

export default tenantTeamSlice.reducer;