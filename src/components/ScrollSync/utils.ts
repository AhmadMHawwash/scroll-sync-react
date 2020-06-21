import { LockAxis } from "./ScrollSyncNode";

export const toArray = (groups: string | string[]) => ([] as string[]).concat(groups);

export const getMovingAxis: (e: WheelEvent) => LockAxis = (e: WheelEvent) => {
  if (e.deltaX > 0 || e.deltaX < 0) return "X";
  if (e.deltaY > 0 || e.deltaY < 0) return "Y";
  if ((e.deltaY > 0 || e.deltaY < 0) && (e.deltaX > 0 || e.deltaX < 0)) return "XY";
  return null;
};
