import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';

// ----------------------------------------------------------------------


// Write meanning full message
// 1. INITIALIZE
// 2. LOGIN
// 3. LOGOUT
// 4. REGISTER
// 5. RESET_PASSWORD
// 6. UPDATE_PROFILE
// 7. UPDATE_PASSWORD
// 8. UPDATE_EMAIL
// 9. VERIFY_EMAIL
// 10. FORGOT_PASSWORD
// 11. DELETE_ACCOUNT
// 12. GET_ACCOUNT
// 13. GET_ACCOUNTS
// 14. GET_ACCOUNTS_BY_ROLE
// 15. GET_ACCOUNTS_BY_STATUS
// 16. GET_ACCOUNTS_BY_ROLE_AND_STATUS
// 17. GET_ACCOUNTS_BY_ROLE_AND_STATUS_AND_NAME
// 18. GET_ACCOUNTS_BY_ROLE_AND_STATUS_AND_NAME_AND_EMAIL
// 19. GET_ACCOUNTS_BY_ROLE_AND_STATUS_AND_NAME_AND_EMAIL_AND_PHONE_NUMBER
// 20. GET_ACCOUNTS_BY_ROLE_AND_STATUS_AND_NAME_AND_EMAIL_AND_PHONE_NUMBER_AND_ADDRESS
// 21. GET_ACCOUNTS_BY_ROLE_AND_STATUS_AND_NAME_AND_EMAIL_AND_PHONE_NUMBER_AND_ADDRESS_AND_CITY
// 22. GET_ACCOUNTS_BY_ROLE_AND_STATUS_AND_NAME_AND_EMAIL_AND_PHONE_NUMBER_AND_ADDRESS_AND_CITY_AND_STATE


// Initial state that represent the state of the application 
//when the app starts for the first time or when the user refreshes 
//the page in the browser.
const initialState = {
  isAuthenticated: false,   // This is a boolean that will be used to know if the user is authenticated or not. It will be set to true when the user is authenticated. it wil help to redirect the user to the login page if he is not authenticated.
  isInitialized: false,     // This is a boolean that will be used to know if the app has been initialized or not. It will be set to true when the app is initialized.
  user: null                // This is the user object that we will get from the server. it will contain all the information about the user though we will only use the id, email, firstName, lastName, role, and avatar. It's a global state that will be used in the entire application.
};



// This is object that will contain all the handlers that will be used to update the state of the application.
// The handlers are functions that will be called when an action is dispatched.
// The action is an object that contains the type of the action and the payload.
// The type is a string that represents the name of the action.
// The payload is an object that contains the data that will be used to update the state of the application.
const handlers = {
  // This handler will be called when the app is initialized.
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },

  // This handler will be called when the user is logged in.
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },

  // This handler will be called when the user is logged out.
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  }),

  // This handler will be called when the user is registered.
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  }

  // This handler will be called when the user reset his password.
  // RESET_PASSWORD: (state, action) => {
  //   const { user } = action.payload;

  //   return {
  //     ...state,
  //     isAuthenticated: true,
  //     user
  //   };
  // },

  // This handler will be called when the user update his profile.
  // UPDATE_PROFILE: (state, action) => {
  //   const { user } = action.payload;

  //   return {
  //     ...state,
  //     isAuthenticated: true,
  //     user
  //   };
  // },

  // This handler will be called when the user update his password.
  // UPDATE_PASSWORD: (state, action) => {
  //   const { user } = action.payload;

  //   return {
  //     ...state,
  //     isAuthenticated: true,
  //     user
  //   };
  // },

  // This handler will be called when the user update his email.
  // UPDATE_EMAIL: (state, action) => {
  //   const { user } = action.payload;

  //   return {
  //     ...state,
  //     isAuthenticated: true,
  //     user
  //   };
  // },

  // This handler will be called when the user verify his email.
  // VERIFY_EMAIL: (state, action) => {
  //   const { user } = action.payload;

  //   return {
  //     ...state,
  //     isAuthenticated: true,
  //     user
  //   };
  // },

  // This handler will be called when the user forgot his password.
  // FORGOT_PASSWORD: (state, action) => {
  //   const { user } = action.payload;

  //   return {
  //     ...state,
  //     isAuthenticated: true,
  //     user
  //   };
  // },


};

// This is the reducer that will be used to update the state of the application.
// The reducer is a function that takes the current state and the action as arguments and returns the new state.
// The action is an object that contains the type of the action and the payload.
// The type is a string that represents the name of the action.
// The payload is an object that contains the data that will be used to update the state of the application.
const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);


// This is the context that will be used to provide the state and the actions to the components.
// The context is an object that contains the state and the actions.
// The state is an object that contains the isAuthenticated, isInitialized, and user.
// The actions are functions that will be used to update the state of the application.
const AuthContext = createContext(
  {
    ...initialState,                      // This is the initial state of the application.
    method: 'jwt',                        // This is the method that will be used to authenticate the user. It will be set to jwt because we will use JWT to authenticate the user.
    login: () => Promise.resolve(),       // This is the function that will be used to login the user. It will be set to a function that returns a promise that resolves to undefined.
    logout: () => Promise.resolve(),      // This is the function that will be used to logout the user. It will be set to a function that returns a promise that resolves to undefined.
    register: () => Promise.resolve()     // This is the function that will be used to register the user. It will be set to a function that returns a promise that resolves to undefined.
  }
);

// This is the provider that will be used to provide the state and the actions to the components.
AuthProvider.propTypes = {
  children: PropTypes.node    // This is the children that will be rendered.
};

// This is the provider that will be used to provide the state and the actions to the components.
// The provider is a component that takes the children as an argument and returns the children wrapped in the context.

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);  // This is the state and the dispatch function that will be used to update the state of the application.

  // This is the effect that will be used to initialize the app.
  // The effect is a function that will be called when the component is mounted.
  // The function will be called only once because the dependencies array is empty.
  // The function will check if the user is authenticated or not.
  // If the user is authenticated, it will get the user from the server and update the state of the application.
  // If the user is not authenticated, it will update the state of the application.
  useEffect(() => {
    const initialize = async () => {
      try {

        // Get the access token from the local storage.
        const accessToken = window.localStorage.getItem('accessToken');

        // Check if the access token is valid. If it is valid, get the user from the server and update the state of the application.
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          // Get the user from the server.
          const response = await axios.get('/api/account/my-account');
          // 
          const { user } = response.data;

          // Update the state of the application.
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



  // Login User
  const login = async (email, password) => {
    await axios.post('/api/auth/login', {
      email,
      password
    }).then((response) => {
      console.log(response)
      const { tokens, user } = response.data;
      setSession(tokens.accessToken);
      dispatch({
        type: 'LOGIN',
        payload: {
          user
        }
      });

    }
    ).catch((error) => {
      console.log(error);

    })
  };


  // Register user
  const register = async (firstName, lastName, username, email,phone,gender, password, userType) => {
    
    console.log("User Type is : ", userType)
    const response = await axios.post('/api/user', {

      firstName,
      lastName,
      username,
      email,
      phone,
      gender,
      password,
      userType
    });
    const { tokens, user } = response.data;

    window.localStorage.setItem('accessToken', tokens.accessToken);
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

  const resetPassword = () => { };

  const updateProfile = () => { };

  return (
    // This is the context that will be used to provide the state and the actions to the components.
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
