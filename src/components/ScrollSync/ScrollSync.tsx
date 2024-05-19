/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useRef } from "react";
import { ScrollConfig } from "./ScrollSyncNode";

export interface ScrollSyncProps {
  children: React.ReactNode;
  /**syncing enable control */
  disabled?: boolean;
  /** In case we want scroll to be proportionally applied regardless of the width and/or height*/
  proportional?: boolean;
}

interface RecordMap<T> {
  [key: string]: T;
}

/**
 * node should be scrollable
 */
type Node = (EventTarget & HTMLElement) | null;

/**
 * node should be scrollable
 */
interface SyncableElement {
  node: Node;
  scroll: ScrollConfig;
}

interface ScrollingSyncerContextValues {
  /**
   * register node to be synced with other scrolled nodes
   */
  registerNode: (node: SyncableElement, groups: string[]) => void;
  /**
   * unregister node to stop syncing with other scrolled nodes
   */
  unregisterNode: (node: SyncableElement, group: string[]) => void;
  /**
   * scroll handler for each node.onScroll
   */
  onScroll: (e: React.UIEvent<HTMLElement>, groups: string[]) => void;
}

/**
 * ScrollingSyncerContext is the context to be handling scrolled nodes
 */
export const ScrollingSyncerContext: React.Context<ScrollingSyncerContextValues> = React.createContext({
  registerNode: (_node: SyncableElement, _group: string[]) => {},
  unregisterNode: (_node: SyncableElement, _group: string[]) => {},
  onScroll: (_e, _groups: string[]) => {},
});

/**
 * Default properties.
 */
const DEFAULT_PROPS = {
  disabled: false,
  proportional: true,
};

/**
 * ScrollSync component is a context based component,
 * that wrappes children to be .Provided with context utils and eventsHandlers
 * @param propsIn ScrollSyncProps
 */
export const ScrollSync: FC<ScrollSyncProps> = propsIn => {
  /**
   * a map of group: and it's nodes
   * {
   *  groupA: [node1, node2, node3],
   *  groupB: [node4, node5],
   *  groupC: [node1, node4],
   * }
   */
  const props = { ...DEFAULT_PROPS, ...propsIn };
  const nodesRef = useRef<RecordMap<SyncableElement[]>>({});
  const elements = nodesRef.current;
  /**
   * A simple trick to avoid calling `requestAnimationFrame` before the frame is painted, to enhance performance!
   */
  const shouldPaintFrameRef = useRef<boolean>(true);
  let shouldPaintFrame = shouldPaintFrameRef.current;

  /**
   * return boolean if the group exists
   * @param group to be found
   */
  const findGroup = (group: string): boolean => {
    return !!elements[group];
  };

  /**
   * returns found node or undefined
   * @param node to be found
   * @param group to be searched in
   */
  const doesNodeExists = (node: Node, group: string): boolean => {
    const groupExists = findGroup(group);
    if (!groupExists) return false;

    const foundNode = elements[group].find(element => element.node === node);
    if (!foundNode) return false;

    return !!foundNode;
  };

  /**
   * this function will delightly register your node (that uses ScrollSyncNode)
   * to be scroll-synced with it's cool other registerd nodes
   *
   * @param node to be registred
   * @param groups to wich groups the node should be registered
   */
  const registerNode = (element: SyncableElement, groups: string[]) => {
    groups.forEach(group => {
      const groupExists = findGroup(group);
      if (!groupExists) {
        elements[group] = [];
      }

      elements[group].push({ ...element });
    });
  };

  /**
   * this function will delightly UNregister your node (that uses ScrollSyncNode)
   * to stop it's scroll-sync with other cool registerd nodes
   *
   * used now when unmounting nodes
   *
   * @param element to be registred
   * @param groups to wich groups the node should be registered
   */
  const unregisterNode = (element: SyncableElement, groups: string[]) => {
    groups.forEach(group => {
      const doesNodeExist = doesNodeExists(element.node, group);
      if (doesNodeExist) {
        elements[group].splice(
          elements[group].findIndex(e => element.node === e.node),
          1,
        );
      }
    });
  };

  /**
   * calculate scrolling percentage of the scrolledNode to be synced with other nodes
   * @param scrolledNode !!
   * @param node other node to be scroll-synced
   */
  const syncScrollPosition = (scrolledNode: Node, node: Node) => {
    if (!scrolledNode || !node) return;

    const { scrollTop, scrollHeight, offsetHeight, scrollLeft, scrollWidth, offsetLeft, offsetWidth } = scrolledNode;

    if (!props.proportional) {
      node.scrollLeft = scrollLeft;
      node.scrollTop = scrollTop;
      return;
    }

    //calculate percentage of scrolling of the scrolledNode
    const percentagePerHeight = scrollTop / (scrollHeight - offsetHeight);
    //calculate percentage of scrolling of the scrolledNode
    const percentagePerWidth = scrollLeft / (scrollWidth - offsetWidth);

    //Apply calculated scrolling
    node.scrollTop = Math.round(percentagePerHeight * (node.scrollHeight - node.offsetHeight));
    node.scrollLeft = Math.round(percentagePerWidth * (node.scrollWidth - node.offsetWidth));
  };

  /**
   * We sync all other nodes in the registered groups
   * @param scrolledNode !!
   * @param groups groups to be scroll-synced
   */
  const syncScrollPositions = (scrolledNode: Node, groups: string[]) => {
    groups.forEach(group => {
      elements[group].forEach(element => {
        /* For all nodes other than the currently scrolled one */
        if (scrolledNode !== element.node) {
          const isEnabled = element.scroll === "two-way";
          const isSynced = element.scroll === "synced-only";
          (isEnabled || isSynced) && syncScrollPosition(scrolledNode, element.node);
        }
      });
    });
  };

  /**
   * check if previous frame was painted and we should paint next
   * if we should, then we call `requestAnimationFrame` again
   * and then clear the shouldPaintFrame flag till next animation frame
   *
   * @param node node to be scrolled
   * @param groups groups to be scroll-synced
   */
  const handleNodeScroll = (node: Node, groups: string[]) => {
    if (shouldPaintFrame) {
      window.requestAnimationFrame(() => {
        syncScrollPositions(node, groups);
        shouldPaintFrame = true;
      });
      shouldPaintFrame = false;
    }
  };

  return (
    <ScrollingSyncerContext.Provider
      value={{
        registerNode,
        unregisterNode,
        onScroll: (e, groups) => !props.disabled && handleNodeScroll(e.currentTarget, groups),
      }}
    >
      {React.Children.only(props.children)}
    </ScrollingSyncerContext.Provider>
  );
};

export default ScrollSync;
