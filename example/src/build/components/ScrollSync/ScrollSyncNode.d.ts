import React from "react";
/**
 * ScrollSyncNode Component
 *
 * Wrap your content in it to keep its scroll position in sync with other panes
 */
export declare type ScrollConfig = "synced-only" | "syncer-only" | "two-way";
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
declare const ScrollSyncNode: React.ForwardRefExoticComponent<ScrollSyncNodeProps & React.RefAttributes<HTMLElement>>;
export default ScrollSyncNode;
