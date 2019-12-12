/* eslint react/no-find-dom-node: 0 */

import React, { FC, useContext, useEffect, useRef } from "react";
import { ScrollingSyncerContext } from "./ScrollSync";

/**
 * ScrollSyncNode Component
 *
 * Wrap your content in it to keep its scroll position in sync with other panes
 */

interface ScrollSyncNodeProps {
  children: React.ReactElement;
  /**
   * groups to make the children attached to
   */
  group?: string | string[];
  /**
   * if the scrolling is enabled or not
   */
  enabled?: boolean;
}

const toArray = (groups: string | string[]) => ([] as string[]).concat(groups);

const ScrollSyncNode: FC<ScrollSyncNodeProps> = ({ children, group = "default" }) => {
  const { registerNode, unregisterNode, onScroll } = useContext(ScrollingSyncerContext);

  const ref = useRef(null);

  useEffect(() => {
    registerNode(ref.current as any, toArray(group));
    return () => unregisterNode(ref.current as any, toArray(group));
  }, []);

  return React.cloneElement(children, {
    ref,
    onScroll: (e: React.UIEvent<HTMLElement>) => onScroll(e, toArray(group)),
  });
};

ScrollSyncNode.defaultProps = {
  group: "default",
  enabled: true,
};

export default ScrollSyncNode;
