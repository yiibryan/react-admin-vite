import { RootState } from '@/redux/store';

export function selectCurrentUser(state: RootState) {
  return state.user.currentUser;
}

export function selectIsFetchingQuota(state: RootState) {
  return state.user.fetchingSearchQuota;
}

export function selectSearchQuota(state: RootState) {
  return state.user.searchQuota;
}
