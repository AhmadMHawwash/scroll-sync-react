/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint react/no-find-dom-node: 0 */

import React, { forwardRef, useContext, useEffect, useRef } from "react";
import { ScrollingSyncerContext } from "./ScrollSync";

/**
 * ScrollSyncNode Component
 *
 * Wrap your content in it to keep its scroll position in sync with other panes
 */
export type ScrollConfig = "synced-only" | "syncer-only" | "two-way";
export type LockAxis = "X" | "Y" | "XY" | null;

interface ScrollSyncNodeProps {
  children: React.ReactElement;
  /**
   * groups to make the children attached to
   */
  group?: string | string[];
  /**
   * if the scrolling is enabled or not
   */
  scroll?: ScrollConfig;
  /**
   * prevent scroll on current node if axis is locked
   */
  selfLockAxis?: LockAxis;
}

const toArray = (groups: string | string[]) => ([] as string[]).concat(groups);

const getMovingAxis: (e: WheelEvent) => LockAxis = (e: WheelEvent) => {
  if (e.deltaX > 0 || e.deltaX < 0) return "X";
  if (e.deltaY > 0 || e.deltaY < 0) return "Y";
  if ((e.deltaY > 0 || e.deltaY < 0) && (e.deltaX > 0 || e.deltaX < 0)) return "XY";
  return null;
};

// eslint-disable-next-line react/display-name
const ScrollSyncNode: React.ForwardRefExoticComponent<ScrollSyncNodeProps &
  React.RefAttributes<EventTarget & HTMLElement>> = forwardRef<EventTarget & HTMLElement, ScrollSyncNodeProps>(
  ({ children, group = "default", scroll = "two-way", selfLockAxis = null }, forwardedRef) => {
    const { registerNode, unregisterNode, onScroll } = useContext(ScrollingSyncerContext);

    const ref = useRef<EventTarget & HTMLElement>(null);

    useEffect(() => {
      if (typeof forwardedRef === "function") {
        forwardedRef(ref.current);
      }
    }, []);

    const applySelfLockAxis = (event: WheelEvent) => {
      const movingAxis = getMovingAxis(event);
      if (selfLockAxis === "X" && movingAxis === "X") {
        event.preventDefault();
      } else if (selfLockAxis === "Y" && movingAxis === "Y") {
        event.preventDefault();
      } else if (selfLockAxis === "XY" && (movingAxis === "XY" || movingAxis === "X" || movingAxis === "Y")) {
        event.preventDefault();
      }
    };

    useEffect(() => {
      const syncableElement = { node: ref.current, scroll };
      if (syncableElement) registerNode(syncableElement, toArray(group));

      ref.current?.addEventListener("wheel", applySelfLockAxis, { passive: false });

      return () => {
        unregisterNode(syncableElement, toArray(group));
        ref.current?.removeEventListener("wheel", applySelfLockAxis);
      };
    }, []);

    useEffect(() => {
      //@ts-ignore ref.current will difintly exist
      const syncableElement = { node: ref.current, scroll };

      unregisterNode(syncableElement, toArray(group));
      registerNode(syncableElement, toArray(group));
      return () => unregisterNode(syncableElement, toArray(group));
    }, [scroll, group]);

    const isSyncer = scroll === "syncer-only";
    const isEnabled = scroll === "two-way";

    return React.cloneElement(children, {
      ref,
      onScroll: (e: React.UIEvent<HTMLElement>) => {
        return (isSyncer || isEnabled) && onScroll(e, toArray(group));
      },
      onWheel: (e: React.UIEvent<HTMLElement>) => {
        return (isSyncer || isEnabled) && onScroll(e, toArray(group));
      },
    });
  },
);

ScrollSyncNode.displayName = "ScrollSyncNode";

export default ScrollSyncNode;
