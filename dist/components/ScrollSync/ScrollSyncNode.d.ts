import React, { FC } from "react";
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
declare const ScrollSyncNode: FC<ScrollSyncNodeProps>;
export default ScrollSyncNode;
