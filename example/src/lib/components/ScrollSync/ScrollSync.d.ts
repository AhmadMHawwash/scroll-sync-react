import React, { FC } from "react";
export interface ScrollSyncProps {
    children: React.ReactNode;
    /**syncing enable control */
    enabled?: boolean;
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
declare type Node = EventTarget & HTMLElement;
/**
 * ScrollingSyncerContext is the context to be handling scrolled nodes
 */
export declare const ScrollingSyncerContext: React.Context<ScrollingSyncerContextValues>;
/**
 * ScrollSync component is a context based component,
 * that wrappes children to be .Provided with context utils and eventsHandlers
 * @param props ScrollSyncProps
 */
export declare const ScrollSync: FC<ScrollSyncProps>;
export default ScrollSync;
