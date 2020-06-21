import React, { forwardRef, useContext, useEffect, useRef } from "react";
import { ScrollingSyncerContext } from "./ScrollSync";
import { getMovingAxis, toArray } from "./utils";

/**
 * ScrollSyncNode Component
 *
 * Wrap your content in it to keep its scroll position in sync with other panes
 */
export type ScrollConfig = "synced-only" | "syncer-only" | "two-way";
export type LockAxis = "X" | "Y" | "XY" | null;

interface ScrollSyncNodeProps {
  /**
   * Children
   */
  children: React.ReactElement;
  /**
   * Groups to make the children attached to
   */
  group?: string | string[];
  /**
   * If the scrolling is enabled or not
   */
  scroll?: ScrollConfig;
  /**
   * Prevent scroll on current node if axis is locked
   */
  selfLockAxis?: LockAxis;
  /**
   * Callback for scroll handling
   */
  onScroll?: (e: React.UIEvent<HTMLElement>) => void;
}

const ScrollSyncNode: React.ForwardRefExoticComponent<ScrollSyncNodeProps &
  React.RefAttributes<EventTarget & HTMLElement>> = forwardRef<EventTarget & HTMLElement, ScrollSyncNodeProps>(
  (props, forwardedRef) => {
    const {
      children,
      group = "default",
      scroll = "two-way",
      selfLockAxis = null,
      onScroll: onNodeScroll = () => undefined,
    } = props;

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
        e.persist();
        if (isSyncer || isEnabled) {
          onScroll(e, toArray(group));
          onNodeScroll(e);
        }
      },
      onWheel: (e: React.UIEvent<HTMLElement>) => {
        e.persist();
        if (isSyncer || isEnabled) {
          onScroll(e, toArray(group));
          onNodeScroll(e);
        }
      },
    });
  },
);

ScrollSyncNode.displayName = "ScrollSyncNode";

export default ScrollSyncNode;
