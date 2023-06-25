import { AxiosResponse } from 'axios';
import { delay, from, map } from 'rxjs';
import http from "@/utils/request";

function wrapAxiosResToDataObservable<T>(res: Promise<AxiosResponse<T>>) {
  return from(res).pipe(map((res) => res.data));
}

export function login(username: string, password: string, imageCode: number | string, imageDeviceId: string) {
  return wrapAxiosResToDataObservable(
    http({
      method: 'post',
      url: '/auth/form',
      responseType: 'json',
      headers: { imageDeviceId },
      data: {username, password, imageCode}
    })
  ).pipe(
    delay(200), // simulate loading
    map((res: any) => {
      if (res) {
        return res;
      } else {
        throw new Error('Wrong username or password');
      }
    })
  );
}

/**
 * Request my projects
 * @returns rxjs observable
 */
export function getMyProjects(search: string, sortBy: string) {
  return wrapAxiosResToDataObservable(
    http.get('/mock-data/my-projects.json', {
      params: {
        search,
        sortBy,
      },
    })
  ).pipe(
    delay(2000), // simulate loading
    map((res) => JSON.parse(res))
  );
}

/**
 * Request search quota
 * @returns rxjs observable
 */
export function getSearchQuota() {
  return wrapAxiosResToDataObservable(
    http.get('/mock-data/search-quota.json')
  ).pipe(
    delay(2000), // simulate loading
    map((res) => JSON.parse(res))
  );
}

export const getVerifyCode = (width: number, height: number, headers: any) => {
  const params = {
    width: width || 120,
    height: height || 40,
  };
  return http({
    url: "/code/image",
    method: "get",
    responseType: "blob",
    headers: headers ? headers : {},
    params,
  });
};

export const logOut = () => {
  return http.post("/logOut");
};
