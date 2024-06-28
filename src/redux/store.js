import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import rootReducer from './rootReducer';

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['user', 'queue'], // whitelist the slices you want to persist
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  }),
});

const persistor = persistStore(store);

const useSelector = useReduxSelector;
const useDispatch = () => useReduxDispatch();

export { store, persistor, useSelector, useDispatch };
