/* eslint react/no-find-dom-node: 0 */

import React, { FC, useContext, useEffect, useRef } from "react";
import { ScrollingSyncerContext } from "./ScrollSync";

/**
 * ScrollSyncNode Component
 *
 * Wrap your content in it to keep its scroll position in sync with other panes
 */
export type ScrollConfig = "synced-only" | "syncer-only" | "two-way";

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
}

const toArray = (groups: string | string[]) => ([] as string[]).concat(groups);

const ScrollSyncNode: FC<ScrollSyncNodeProps> = ({ children, group = "default", scroll = "two-way" }) => {
  const { registerNode, unregisterNode, onScroll } = useContext(ScrollingSyncerContext);

  const ref = useRef(null);

  useEffect(() => {
    const syncableElement = { node: ref.current as any, scroll };
    registerNode(syncableElement, toArray(group));
    return () => unregisterNode(syncableElement, toArray(group));
  }, []);

  useEffect(() => {
    const syncableElement = { node: ref.current as any, scroll };

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
};

export default ScrollSyncNode;
