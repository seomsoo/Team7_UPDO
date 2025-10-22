import Service from '../service';
<<<<<<< HEAD
import { IGathering, IParticipant, IJoinedGathering } from '@/types/gatherings';
=======
import { IGathering, IParticipant } from '@/types/gatherings';
import 'client-only'; // Next.js의 클라이언트 컴포넌트에서만 사용됨을 명시 - SSR import 완전 차단
>>>>>>> fba4ffb ([FEAT] #124 complete signin and signup page UI work)

class AnonGatheringService extends Service {
  getGatheringList(params?: Record<string, string | number | boolean>) {
    const qs = params ? '?' + new URLSearchParams(stringifyParams(params)).toString() : '';
    return this.http.get<IGathering[]>(`/gatherings${qs}`);
  }

  getGatheringInfiniteList(pageParam = 1, params?: Record<string, string | number | boolean>) {
    const ITEMS_PER_PAGE = 10;
    const offset = (pageParam - 1) * ITEMS_PER_PAGE;
    const limitParams = `limit=${ITEMS_PER_PAGE}&offset=${offset}`;
    const qs =
      params && Object.keys(params).length
        ? `${new URLSearchParams(stringifyParams(params)).toString()}&${limitParams}`
        : limitParams;

    return this.http.get<IGathering[]>(`/gatherings?${qs}`).then(res => ({
      data: res,
      nextPage: res.length === ITEMS_PER_PAGE ? pageParam + 1 : undefined,
    }));
  }

  getJoinedGatherings(pageParam = 1, params?: Record<string, string | number | boolean>) {
    const ITEMS_PER_PAGE = 10;
    const offset = (pageParam - 1) * ITEMS_PER_PAGE;
    const limitParams = `limit=${ITEMS_PER_PAGE}&offset=${offset}`;
    const qs =
      params && Object.keys(params).length
        ? `${new URLSearchParams(stringifyParams(params)).toString()}&${limitParams}`
        : limitParams;

    return this.http.get<IJoinedGathering[]>(`/gatherings/joined?${qs}`).then(res => ({
      data: res,
      nextPage: res.length === ITEMS_PER_PAGE ? pageParam + 1 : undefined,
    }));
  }

  getFavoriteList(params: { id?: number[] }) {
    const ids = params?.id?.length ? params.id.join(',') : '';
    if (!ids) return Promise.resolve([] as IGathering[]);
    return this.http.get<IGathering[]>(`/gatherings?limit=50&id=${ids}`);
  }

  getGatheringDetail(id: string) {
    return this.http.get<IGathering>(`/gatherings/${id}`);
  }

  getGatheringParticipants(id: string) {
    return this.http.get<IParticipant[]>(`/gatherings/${id}/participants`);
  }
}

function stringifyParams(obj: Record<string, string | number | boolean>) {
  const out: Record<string, string> = {};
  Object.entries(obj).forEach(([k, v]) => {
    if (v == null) return;
    if (k === 'limit' || k === 'offset') return;
    out[k] = Array.isArray(v) ? v.join(',') : String(v);
  });
  return out;
}

const anonGatheringService = new AnonGatheringService();
export default anonGatheringService;

export const getGatheringList = anonGatheringService.getGatheringList.bind(anonGatheringService);
export const getGatheringInfiniteList =
  anonGatheringService.getGatheringInfiniteList.bind(anonGatheringService);
export const getFavoriteList = anonGatheringService.getFavoriteList.bind(anonGatheringService);
export const getGatheringDetail =
  anonGatheringService.getGatheringDetail.bind(anonGatheringService);
export const getGatheringParticipants =
  anonGatheringService.getGatheringParticipants.bind(anonGatheringService);
export const getJoinedGatherings =
  anonGatheringService.getJoinedGatherings.bind(anonGatheringService);
