import React, { JSXElementConstructor, ReactElement } from "react";
/**
 * ScrollSyncNode Component
 *
 * Wrap your content in it to keep its scroll position in sync with other panes
 */
export declare type ScrollConfig = "synced-only" | "syncer-only" | "two-way";
export declare type LockAxis = "X" | "Y" | "XY" | null;
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
declare const ScrollSyncNode: React.ForwardRefExoticComponent<ScrollSyncNodeProps & React.RefAttributes<EventTarget & HTMLElement>>;
export default ScrollSyncNode;
