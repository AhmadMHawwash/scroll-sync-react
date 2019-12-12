/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useRef } from "react";

export interface ScrollSyncProps {
  children: React.ReactNode;
  /**syncing enable control */
  enabled?: boolean;
}

interface RecordMap<T> {
  [key: string]: T;
}

interface ScrollingSyncerContextValues {
  /**
   * register node to be synced with other scrolled nodes
   */
  registerNode: (node: Node, groups: string[]) => void;
  /**
   * unregister node to stop syncing with other scrolled nodes
   */
  unregisterNode: (node: Node, group: string[]) => void;
  /**
   * scroll handler for each node.onScroll
   */
  onScroll: (e: React.UIEvent<HTMLElement>, groups: string[]) => void;
}

/**
 * node should be scrollable
 */
type Node = EventTarget & HTMLElement;

/**
 * ScrollingSyncerContext is the context to be handling scrolled nodes
 */
export const ScrollingSyncerContext: React.Context<ScrollingSyncerContextValues> = React.createContext({
  registerNode: (_node: Node, _group: string[]) => {},
  unregisterNode: (_node: Node, _group: string[]) => {},
  onScroll: (_e, _groups: string[]) => {},
});

/**
 * ScrollSync component is a context based component,
 * that wrappes children to be .Provided with context utils and eventsHandlers
 * @param props ScrollSyncProps
 */
export const ScrollSync: FC<ScrollSyncProps> = props => {
  /**
   * a map of group: and it's nodes
   * {
   *  groupA: [node1, node2, node3],
   *  groupB: [node4, node5],
   *  groupC: [node1, node4],
   * }
   */
  const nodesRef = useRef<RecordMap<any[]>>({});
  const nodes = nodesRef.current;
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
    return !!nodes[group];
  };

  /**
   * returns found node or undefined
   * @param node to be found
   * @param group to be searched in
   */
  const findNode = (node: Node, group: string): boolean => {
    const groupExists = findGroup(group);
    if (!groupExists) return false;

    const foundNode = nodes[group].find(n => n === node);
    if (!foundNode) return false;

    return foundNode;
  };

  /**
   * this function will delightly register your node (that uses ScrollSyncNode)
   * to be scroll-synced with it's cool other registerd nodes
   *
   * @param node to be registred
   * @param groups to wich groups the node should be registered
   */
  const registerNode = (node: Node, groups: string[]) => {
    groups.forEach(group => {
      const groupExists = findGroup(group);
      if (!groupExists) {
        nodes[group] = [];
      }

      nodes[group].push(node);
    });
  };

  /**
   * this function will delightly UNregister your node (that uses ScrollSyncNode)
   * to stop it's scroll-sync with other cool registerd nodes
   *
   * used now when unmounting nodes
   *
   * @param node to be registred
   * @param groups to wich groups the node should be registered
   */
  const unregisterNode = (node: Node, groups: string[]) => {
    groups.forEach(group => {
      const foundNode = findNode(node, group);
      if (foundNode) {
        nodes[group].splice(nodes[group].indexOf(node), 1);
      }
    });
  };

  /**
   * calculate scrolling percentage of the scrolledNode to be synced with other nodes
   * @param scrolledNode !!
   * @param node other node to be scroll-synced
   */
  const syncScrollPosition = (scrolledNode: Node, node: Node) => {
    const { scrollTop, scrollHeight, offsetHeight } = scrolledNode;

    //calculate percentage of scrolling of the scrolledNode
    const percentage = scrollTop / (scrollHeight - offsetHeight);

    //Apply calculated scrolling
    node.scrollTop = Math.round(percentage * (node.scrollHeight - node.offsetHeight));
  };

  /**
   * We sync all other nodes in the registered groups
   * @param scrolledNode !!
   * @param groups groups to be scroll-synced
   */
  const syncScrollPositions = (scrolledNode: Node, groups: string[]) => {
    groups.forEach(group => {
      nodes[group].forEach(node => {
        /* For all nodes other than the currently scrolled one */
        if (scrolledNode !== node) {
          syncScrollPosition(scrolledNode, node);
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
        onScroll: (e, groups) => handleNodeScroll(e.currentTarget, groups),
      }}
    >
      {React.Children.only(props.children)}
    </ScrollingSyncerContext.Provider>
  );
};

ScrollSync.defaultProps = {
  enabled: true,
};

export default ScrollSync;
