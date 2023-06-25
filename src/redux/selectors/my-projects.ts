import { RootState } from '@/redux/store.ts';

export function selectIsLoadingMyProjects(state: RootState) {
  return state.myProjects.isLoading;
}

export function selectMyProjects(state: RootState) {
  return state.myProjects.projects;
}

export function selectFetchFilters(state: RootState) {
  return state.myProjects.fetchingFilters;
}

export function selectSelectedProject(state: RootState) {
  return state.myProjects.selectedProject;
}
