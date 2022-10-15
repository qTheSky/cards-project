import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {UserDataType} from 'api/authApi';
import {login, logout} from 'features/Auth/auth-reducer';
import {initializeApp} from 'app/app-reducer';
import {appActions} from "../CommonActions/App";
import {profileApi} from 'api/profileApi';
import {handleErrors} from 'utils/error-utils';


export const updateProfile = createAsyncThunk('profile/updateProfile',
    async (param: { name?: string, avatar?: string }, thunkAPI) => {
        thunkAPI.dispatch(appActions.setIsLoading(true))
        try {
            const {data} = await profileApi.updateProfile(param.name, param.avatar)
            thunkAPI.dispatch(appActions.setIsLoading(false))
            return data.updatedUser
        } catch (e) {
            return handleErrors(e, thunkAPI)
        }
    })

export const slice = createSlice({
    name: 'profile',
    initialState: {
        profile: {} as UserDataType,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.profile = action.payload
            })
            .addCase(logout.fulfilled, (state) => {
                state.profile = slice.getInitialState().profile
            })
            .addCase(initializeApp.fulfilled, (state, action) => {
                state.profile = action.payload
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.profile = action.payload
            })
    }
})

export const profileReducer = slice.reducer


