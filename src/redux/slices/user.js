import { createSlice } from '@reduxjs/toolkit';
// import axios from '../../utils/axios';
// import { Category } from '@mui/icons-material';
// import { get } from 'lodash';
import axiosInstance from '../../utils/axios';

const initialState = {
  isLoading: false,
  error: false,
  myProfile: null,
  operatinghours: [],
  services: [],
  locations: [],
  educations: [],
  socialmedialinks: [],
  categories : null
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getProfileSuccess(state, action) {
      state.isLoading = false;
      const profile = action.payload;
      state.myProfile = profile;
      state.services = profile.services;
      state.locations = profile.business_locations;
      state.educations = profile.educations;
      state.operatinghours = profile.operating_hours;
      state.socialmedialinks = profile.social_media;
    },
    updateServicesSuccess(state, action) {
      state.isLoading = false;
      state.services = action.payload;
    },
    updateLocationsSuccess(state, action) {
      state.isLoading = false;
      state.locations = action.payload;
    },
    updateEducationsSuccess(state, action) {
      state.isLoading = false;
      state.educations = action.payload;
    },
    updateOperatingHoursSuccess(state, action) {
      state.isLoading = false;
      state.operatinghours = action.payload;
    },
    updateSocialMediaLinksSuccess(state, action) {
      state.isLoading = false;
      state.socialmedialinks = action.payload;
    },
    getCategoriesSuccess(state, action) {
      state.isLoading = false;
      state.categories = action.payload;
    }
  },
});

export const {
  startLoading,
  hasError,
  getProfileSuccess,
  updateServicesSuccess,
  updateLocationsSuccess,
  updateEducationsSuccess,
  updateOperatingHoursSuccess,
  updateSocialMediaLinksSuccess,
  getCategoriesSuccess
} = slice.actions;

export default slice.reducer;

export function getProfile() {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const response = await axiosInstance.get('/api/profile/vendor/vendor-by-userid');
      console.log("Profile Data is ;\n",response.data)
      dispatch(getProfileSuccess(response.data));
    } catch (error) {
      dispatch(hasError(error));
    }
  };
}

export function getCategories() {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const response = await axiosInstance.get('/api/category');
      dispatch(getCategoriesSuccess(response.data));
    } catch (error) {
      dispatch(hasError(error));
    }
  };
}

export function updateServices(updatedServices) {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      dispatch(updateServicesSuccess(updatedServices));
    } catch (error) {
      dispatch(hasError(error));
    }
  };
}

export function updateLocations(updatedLocations) {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      dispatch(updateLocationsSuccess(updatedLocations));
    } catch (error) {
      dispatch(hasError(error));
    }
  };
}

export function updateEducations(updatedEducations) {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      dispatch(updateEducationsSuccess(updatedEducations));
    } catch (error) {
      dispatch(hasError(error));
    }
  };
}

export function updateOperatingHours(updatedOperatingHours) {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      dispatch(updateOperatingHoursSuccess(updatedOperatingHours));
    } catch (error) {
      dispatch(hasError(error));
    }
  };
}

export function updateSocialMediaLinks(updatedSocialMediaLinks) {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      dispatch(updateSocialMediaLinksSuccess(updatedSocialMediaLinks));
    } catch (error) {
      dispatch(hasError(error));
    }
  };
}



// import { map, filter } from 'lodash';
// import { createSlice } from '@reduxjs/toolkit';
// // utils
// import axios from '../../utils/axios';

// // ----------------------------------------------------------------------

// const initialState = {
//   isLoading: false,
//   error: false,
//   myProfile: null,
//   operatinghours: [],
//   services: [],
//   locations: [],
//   educations: [],
//   socialmedialinks: [],

// };

// const slice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     // START LOADING
//     startLoading(state) {
//       state.isLoading = true;
//     },

//     // HAS ERROR
//     hasError(state, action) {
//       state.isLoading = false;
//       state.error = action.payload;
//     },

//     // GET PROFILE
//     getProfileSuccess(state, action) {
//       state.isLoading = false;
//       const profile = action.payload;
//       state.myProfile = profile;
//       state.services = profile.services;
//       state.locations = profile.business_locations;
//       state.educations = profile.educations;
//       state.operatinghours = profile.operating_hours;
//       state.socialmedialinks = profile.social_media;

//     },

//     // GET LOCATIONS
//     getLocationsSuccess(state, action) {
//       state.isLoading = false;
//       state.posts = action.payload;
//     },

//     // GET EDUCATIONS
//     getEducationsSuccess(state, action) {
//       state.isLoading = false;
//       state.users = action.payload;
//     },

//     // DELETE  USER
//     deleteUser(state, action) {
//       const deleteUser = filter(state.userList, (user) => user.id !== action.payload);
//       state.userList = deleteUser;
//     },

//     // GET Social Media
//     getSocialMediaSuccess(state, action) {
//       state.isLoading = false;
//       state.followers = action.payload;
//     },

//     // ON TOGGLE FOLLOW
//     onToggleFollow(state, action) {
//       const followerId = action.payload;

//       const handleToggle = map(state.followers, (follower) => {
//         if (follower.id === followerId) {
//           return {
//             ...follower,
//             isFollowed: !follower.isFollowed
//           };
//         }
//         return follower;
//       });

//       state.followers = handleToggle;
//     },
//   }
// });

// // Reducer
// export default slice.reducer;

// // Actions
// export const { onToggleFollow, deleteUser } = slice.actions;

// // ----------------------------------------------------------------------

// export function getProfile() {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.get('/api/profile/vendor/vendor-by-userid');
//       dispatch(slice.actions.getProfileSuccess(response.data.profile));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

// // ----------------------------------------------------------------------

// // export function getPosts() {
// //   return async (dispatch) => {
// //     dispatch(slice.actions.startLoading());
// //     try {
// //       const response = await axios.get('/api//posts');
// //       dispatch(slice.actions.getPostsSuccess(response.data.posts));
// //     } catch (error) {
// //       dispatch(slice.actions.hasError(error));
// //     }
// //   };
// // }

// // ----------------------------------------------------------------------

// // export function getFollowers() {
// //   return async (dispatch) => {
// //     dispatch(slice.actions.startLoading());
// //     try {
// //       const response = await axios.get('/api/user/social/followers');
// //       dispatch(slice.actions.getFollowersSuccess(response.data.followers));
// //     } catch (error) {
// //       dispatch(slice.actions.hasError(error));
// //     }
// //   };
// // }

// // ----------------------------------------------------------------------

// // export function getFriends() {
// //   return async (dispatch) => {
// //     dispatch(slice.actions.startLoading());
// //     try {
// //       const response = await axios.get('/api/user/social/friends');
// //       dispatch(slice.actions.getFriendsSuccess(response.data.friends));
// //     } catch (error) {
// //       dispatch(slice.actions.hasError(error));
// //     }
// //   };
// // }

// // ----------------------------------------------------------------------

// // export function getGallery() {
// //   return async (dispatch) => {
// //     dispatch(slice.actions.startLoading());
// //     try {
// //       const response = await axios.get('/api/user/social/gallery');
// //       dispatch(slice.actions.getGallerySuccess(response.data.gallery));
// //     } catch (error) {
// //       dispatch(slice.actions.hasError(error));
// //     }
// //   };
// // }

// // ----------------------------------------------------------------------

// // export function getUserList() {
// //   return async (dispatch) => {
// //     dispatch(slice.actions.startLoading());
// //     try {
// //       const response = await axios.get('/api/user/manage-users');
// //       dispatch(slice.actions.getUserListSuccess(response.data.users));
// //     } catch (error) {
// //       dispatch(slice.actions.hasError(error));
// //     }
// //   };
// // }

// // ----------------------------------------------------------------------

// // export function getCards() {
// //   return async (dispatch) => {
// //     dispatch(slice.actions.startLoading());
// //     try {
// //       const response = await axios.get('/api/user/account/cards');
// //       dispatch(slice.actions.getCardsSuccess(response.data.cards));
// //     } catch (error) {
// //       dispatch(slice.actions.hasError(error));
// //     }
// //   };
// // }

// // ----------------------------------------------------------------------

// // export function getAddressBook() {
// //   return async (dispatch) => {
// //     dispatch(slice.actions.startLoading());
// //     try {
// //       const response = await axios.get('/api/user/account/address-book');
// //       dispatch(slice.actions.getAddressBookSuccess(response.data.addressBook));
// //     } catch (error) {
// //       dispatch(slice.actions.hasError(error));
// //     }
// //   };
// // }

// // ----------------------------------------------------------------------

// // export function getInvoices() {
// //   return async (dispatch) => {
// //     dispatch(slice.actions.startLoading());
// //     try {
// //       const response = await axios.get('/api/user/account/invoices');
// //       dispatch(slice.actions.getInvoicesSuccess(response.data.invoices));
// //     } catch (error) {
// //       dispatch(slice.actions.hasError(error));
// //     }
// //   };
// // }

// // ----------------------------------------------------------------------

// // export function getNotifications() {
// //   return async (dispatch) => {
// //     dispatch(slice.actions.startLoading());
// //     try {
// //       const response = await axios.get('/api/user/account/notifications-settings');
// //       dispatch(slice.actions.getNotificationsSuccess(response.data.notifications));
// //     } catch (error) {
// //       dispatch(slice.actions.hasError(error));
// //     }
// //   };
// // }

// // ----------------------------------------------------------------------

// // export function getUsers() {
// //   return async (dispatch) => {
// //     dispatch(slice.actions.startLoading());
// //     try {
// //       const response = await axios.get('/api/user/all');
// //       dispatch(slice.actions.getUsersSuccess(response.data.users));
// //     } catch (error) {
// //       dispatch(slice.actions.hasError(error));
// //     }
// //   };
// // }

