import React from "react";
/**
 * ScrollSyncNode Component
 *
 * Wrap your content in it to keep its scroll position in sync with other panes
 */
export declare type ScrollConfig = "synced-only" | "syncer-only" | "two-way";
export declare type LockAxis = "X" | "Y" | "XY" | null;
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
declare const ScrollSyncNode: React.ForwardRefExoticComponent<ScrollSyncNodeProps & React.RefAttributes<HTMLElement>>;
export default ScrollSyncNode;
