import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';





const initialState = {
  isAuthenticated: false,   
  isInitialized: false,     
  user: null                
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;
    // console.log(user);
    return {
      ...state,
      isAuthenticated: true,
      user
    };


  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false
    // user: null
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  }
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
});

AuthProvider.propTypes = {
  children: PropTypes.node
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        const user = JSON.parse(window.localStorage.getItem('user'));

        if (accessToken && isValidToken(accessToken) && user) {
          setSession(accessToken);
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user
            }
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    // console.log(email, password);
    const response = await axios.post('/api/auth/login', {
      email,
      password
    });
    const data= response.data;

    setSession(data.tokens.accessToken);
    window.localStorage.setItem('user', JSON.stringify(data.user));
    dispatch({
      type: 'LOGIN',
      payload: {
        user: data.user
      }
    });
  };

  const register = async (username, email, gender, password) => {
    const response = await axios.post('/api/auth/register', {
      username,
      email,
      password,
      gender,
      usertype: 'vendor'
      
    });
    const { tokens, user } = await response.data;
    console.log("Responnse Is : ", response.data)

    setSession(tokens.accessToken);
    window.localStorage.setItem('user', JSON.stringify(user));
    dispatch({
      type: 'REGISTER',
      payload: {
        user
      }
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  const resetPassword = async (email, password) => {
   
    const response = await axios.post('/api/auth/new-password', {
      email,
      password
    });

    const data= response.data;

    setSession(data.tokens.accessToken);
    window.localStorage.setItem('user', JSON.stringify(data.user));
    dispatch({
      type: 'LOGIN',
      payload: {
        user: data.user
      }
    });
    


  };

  const updateProfile = () => {};

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        resetPassword,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };