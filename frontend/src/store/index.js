import userReducer from './slices/userSlice';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session'; 
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';



const persistConfig = {
    key: 'root',
    storage: sessionStorage,
    stateReconciler: autoMergeLevel2
}

const persistedUserReducer = persistReducer(persistConfig, userReducer);


export const store = configureStore({
    reducer: {
        user: persistedUserReducer
    },
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
    }),
   
});


export const persistor = persistStore(store, { manualPersist: true });