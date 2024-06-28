import axiosInstance from "src/utils/axios";
import { startLoading } from "./user";

const { createSlice } = require("@reduxjs/toolkit");
// const { default: CompleteQueue } = require("src/components/general-app/CompleteQueue");

const initialState = {
    activeQueues: [],
    completeQueue: [],
    futureQueues: [],
    loading: false,
    error: null,
}

const queueSlice = createSlice({
    name: 'queue',
    initialState,
    reducers: {
        getStartLoading(state) {
            state.loading = true;
        },

        hasError(state, action) {
            state.error = action.payload;
            state.loading = false;
        },
        getActiveQueuesSuccess(state, action) {
            state.activeQueues = action.payload;
            state.loading = false;
        },
        
      
        getCompleteQueueSuccess(state, action) {
            state.completeQueue = action.payload;
            state.loading = false;
        },
        
        getFutureQueuesSuccess(state, action) {
            state.futureQueues = action.payload;
            state.loading = false;
        },
        
    }
});

export const {
    getStartLoading,
    hasError,
    getActiveQueuesSuccess,
    getCompleteQueueSuccess,
    getFutureQueuesSuccess,

} = queueSlice.actions;

export default queueSlice.reducer;


export const fetchActiveQueues = () => async (dispatch) => {
    dispatch(startLoading());
    try {
        const response = await axiosInstance.get('/api/queue/status?queueStatus=active');
        console.log("Active Queues\n",response.data)
        dispatch(getActiveQueuesSuccess(response.data));
    } catch (error) {
        dispatch(hasError(error));
    }
}

export const fetchCompleteQueue = () => async (dispatch) => {
    dispatch(startLoading());
    try {
        const response = await axiosInstance.get('/api/queue/status?queueStatus=completed');
        console.log("Completed Queues\n",response.data)
        dispatch(getCompleteQueueSuccess(response.data));
    } catch (error) {
        dispatch(hasError(error));
    }
}

export const fetchFutureQueues = () => async (dispatch) => {
    dispatch(startLoading());
    try {
        const response = await axiosInstance.get('/api/queue/status?queueStatus=inactive');
        console.log("Future Queues\n",response.data)
        dispatch(getFutureQueuesSuccess(response.data));
    } catch (error) {
        dispatch(hasError(error));
    }
}


