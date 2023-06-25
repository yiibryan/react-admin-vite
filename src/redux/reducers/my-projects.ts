import {firstValueFrom} from 'rxjs';

import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {getMyProjects} from '@/api';

import {RootState} from '@/redux/store';

import {ProjectItem} from '@/models/project-item';

// Define a type for the slice state
interface MyProjectsState {
  isLoading: boolean;
  fetchingFilters: { search: string; sortBy: string };
  projects: ProjectItem[];
  selectedProject: ProjectItem | undefined;
}

// Define the initial state using that type
const initialState: MyProjectsState = {
  isLoading: false,
  fetchingFilters: { search: '', sortBy: '' },
  projects: [],
  selectedProject: undefined,
};

export const fetchProjects = createAsyncThunk<
  ProjectItem[],
  { search: string; sortBy: string }
>(
  'MyProjects/fetchProjects',
  async ({ search, sortBy }, { rejectWithValue }) => {
    try {
      return await firstValueFrom(getMyProjects(search, sortBy));
    } catch {
      return rejectWithValue([]);
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as RootState;
      return !state.myProjects.isLoading;
    },
  }
);

export const myProjectsSlice = createSlice({
  name: 'MyProjects',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    renameProject(
      state,
      action: PayloadAction<{ project: ProjectItem; newName: string }>
    ) {
      const index = state.projects.findIndex(
        (item) => item.id === action.payload.project.id
      );
      if (index >= 0) {
        state.projects[index].name = action.payload.newName;
      }
    },
    deleteProject(state, action: PayloadAction<{ project: ProjectItem }>) {
      const index = state.projects.findIndex(
        (item) => item.id === action.payload.project.id
      );
      if (index >= 0) {
        const newProjects = [...state.projects];
        newProjects.splice(index, 1);
        state.projects = newProjects;
      }
      if (action.payload.project.id === state.selectedProject?.id) {
        state.selectedProject = state.projects[0];
      }
    },
    setSelectedProject(state, action: PayloadAction<{ project: ProjectItem }>) {
      state.selectedProject = action.payload.project;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.pending, (state, action) => {
      state.isLoading = true;
      state.fetchingFilters = action.meta.arg;
      state.projects = [];
      state.selectedProject = undefined;
    });
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.isLoading = false;
      state.projects = action.payload;
      state.selectedProject = state.projects[0];
    });
    builder.addCase(fetchProjects.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { renameProject, deleteProject, setSelectedProject } =
  myProjectsSlice.actions;

export default myProjectsSlice.reducer;
