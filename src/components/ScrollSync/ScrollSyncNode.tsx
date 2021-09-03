import React, { forwardRef, JSXElementConstructor, ReactElement, useContext, useEffect, useRef } from "react";
import { ScrollingSyncerContext } from "./ScrollSync";
import { getMovingAxis, toArray } from "./utils";

/**
 * ScrollSyncNode Component
 *
 * Wrap your content in it to keep its scroll position in sync with other panes
 */
export type ScrollConfig = "synced-only" | "syncer-only" | "two-way";
export type LockAxis = "X" | "Y" | "XY" | null;

export interface ScrollSyncNodeRenderProps {
  onScroll: (e: React.UIEvent<any>) => void;
  onWheel: (e: React.UIEvent<any>) => void;
  ref: React.MutableRefObject<any>;
}

export interface ScrollSyncNodeProps {
  /**
   * Children
   */
  children?: React.ReactElement;
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

  render?: (props: ScrollSyncNodeRenderProps) => ReactElement<any, string | JSXElementConstructor<any>> | null;
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
      render,
    } = props;

    const { registerNode, unregisterNode, onScroll } = useContext(ScrollingSyncerContext);

    const childRef = (children as any)?.ref;
    const hasDoubleRef = childRef != null && forwardedRef != null;

    if (hasDoubleRef) {
      console.warn(
        "scroll-sync-react:\nWARNING: ref used on both ScrollSyncNode and its direct child.\nUsing the ref from the ScrollSyncNode component.",
      );
    }

    const ref = childRef && !forwardedRef ? childRef : useRef<EventTarget & HTMLElement>(null);

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

    const _onScroll = (e: React.UIEvent<HTMLElement>) => {
      if (typeof children?.props.onScroll === "function") {
        children.props.onScroll(e);
      }
      e.persist();
      if (isSyncer || isEnabled) {
        onScroll(e, toArray(group));
        onNodeScroll(e);
      }
    };

    const _onWheel = (e: React.UIEvent<HTMLElement>) => {
      if (typeof children?.props.onWheel === "function") {
        children.props.onWheel(e);
      }
      e.persist();
      if (isSyncer || isEnabled) {
        onScroll(e, toArray(group));
        onNodeScroll(e);
      }
    };

    if (render) {
      return render({ ref, onScroll: _onScroll, onWheel: _onWheel });
    }
    if (!children) throw new Error("Children can not be undefined if render prop has not bee passed");
    return React.cloneElement(children, {
      ref,
      onScroll: _onScroll,
      onWheel: _onWheel,
    });
  },
);

ScrollSyncNode.displayName = "ScrollSyncNode";

export default ScrollSyncNode;
