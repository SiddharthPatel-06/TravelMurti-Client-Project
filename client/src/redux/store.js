import { configureStore } from '@reduxjs/toolkit';
import packagesReducer from './packagesSlice';
import subPackagesReducer from './subPackagesSlice';
import dealReducer from './dealSlice';
import userReducer from './userSlice'; 

export const store = configureStore({
  reducer: {
    packages: packagesReducer,
    subPackages: subPackagesReducer,
    deal: dealReducer,
    user: userReducer, 
  },
});
