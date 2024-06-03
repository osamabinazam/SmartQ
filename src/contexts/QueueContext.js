import { createContext, useEffect, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from '../utils/axios';

// Initial state
const initialState = {
  queues: [],
  loading: true,
  error: null
};

// Handlers
const handlers = {
  SET_QUEUES: (state, action) => {
    return {
      ...state,
      queues: action.payload,
      loading: false
    };
  },
  SET_QUEUE_ERROR: (state, action) => {
    return {
      ...state,
      error: action.payload,
      loading: false
    };
  }
};

// Reducer
const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

// Create context
const QueueContext = createContext({
  ...initialState,
  fetchQueues: () => Promise.resolve()
});

QueueProvider.propTypes = {
  children: PropTypes.node
};

function QueueProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchQueues = async () => {
    try {
      const response = await axios.get('/api/queue', {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('accessToken')}` }
      });
      console.log('Queues  Data:', response.data)
      dispatch({
        type: 'SET_QUEUES',
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: 'SET_QUEUE_ERROR',
        payload: error.message
      });
    }
  };

  useEffect(() => {
    fetchQueues();
  }, []);

  return (
    <QueueContext.Provider
      value={{
        ...state,
        fetchQueues
      }}
    >
      {children}
    </QueueContext.Provider>
  );
}

export { QueueContext, QueueProvider };


