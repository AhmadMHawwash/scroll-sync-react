import React, { useRef, useContext, useEffect } from 'react';

/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * ScrollingSyncerContext is the context to be handling scrolled nodes
 */
var ScrollingSyncerContext = React.createContext({
    registerNode: function (_node, _group) { },
    unregisterNode: function (_node, _group) { },
    onScroll: function (_e, _groups) { },
});
/**
 * ScrollSync component is a context based component,
 * that wrappes children to be .Provided with context utils and eventsHandlers
 * @param props ScrollSyncProps
 */
var ScrollSync = function (props) {
    /**
     * a map of group: and it's nodes
     * {
     *  groupA: [node1, node2, node3],
     *  groupB: [node4, node5],
     *  groupC: [node1, node4],
     * }
     */
    var nodesRef = useRef({});
    var nodes = nodesRef.current;
    /**
     * A simple trick to avoid calling `requestAnimationFrame` before the frame is painted, to enhance performance!
     */
    var shouldPaintFrameRef = useRef(true);
    var shouldPaintFrame = shouldPaintFrameRef.current;
    /**
     * return boolean if the group exists
     * @param group to be found
     */
    var findGroup = function (group) {
        return !!nodes[group];
    };
    /**
     * returns found node or undefined
     * @param node to be found
     * @param group to be searched in
     */
    var findNode = function (node, group) {
        var groupExists = findGroup(group);
        if (!groupExists)
            return false;
        var foundNode = nodes[group].find(function (n) { return n === node; });
        if (!foundNode)
            return false;
        return foundNode;
    };
    /**
     * this function will delightly register your node (that uses ScrollSyncNode)
     * to be scroll-synced with it's cool other registerd nodes
     *
     * @param node to be registred
     * @param groups to wich groups the node should be registered
     */
    var registerNode = function (node, groups) {
        groups.forEach(function (group) {
            var groupExists = findGroup(group);
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
    var unregisterNode = function (node, groups) {
        groups.forEach(function (group) {
            var foundNode = findNode(node, group);
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
    var syncScrollPosition = function (scrolledNode, node) {
        var scrollTop = scrolledNode.scrollTop, scrollHeight = scrolledNode.scrollHeight, offsetHeight = scrolledNode.offsetHeight;
        //calculate percentage of scrolling of the scrolledNode
        var percentage = scrollTop / (scrollHeight - offsetHeight);
        //Apply calculated scrolling
        node.scrollTop = Math.round(percentage * (node.scrollHeight - node.offsetHeight));
    };
    /**
     * We sync all other nodes in the registered groups
     * @param scrolledNode !!
     * @param groups groups to be scroll-synced
     */
    var syncScrollPositions = function (scrolledNode, groups) {
        groups.forEach(function (group) {
            nodes[group].forEach(function (node) {
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
    var handleNodeScroll = function (node, groups) {
        if (shouldPaintFrame) {
            window.requestAnimationFrame(function () {
                syncScrollPositions(node, groups);
                shouldPaintFrame = true;
            });
            shouldPaintFrame = false;
        }
    };
    return (React.createElement(ScrollingSyncerContext.Provider, { value: {
            registerNode: registerNode,
            unregisterNode: unregisterNode,
            onScroll: function (e, groups) { return handleNodeScroll(e.currentTarget, groups); },
        } }, React.Children.only(props.children)));
};
ScrollSync.defaultProps = {
    enabled: true,
};

/* eslint react/no-find-dom-node: 0 */
var toArray = function (groups) { return [].concat(groups); };
var ScrollSyncNode = function (_a) {
    var children = _a.children, _b = _a.group, group = _b === void 0 ? "default" : _b;
    var _c = useContext(ScrollingSyncerContext), registerNode = _c.registerNode, unregisterNode = _c.unregisterNode, onScroll = _c.onScroll;
    var ref = useRef(null);
    useEffect(function () {
        registerNode(ref.current, toArray(group));
        return function () { return unregisterNode(ref.current, toArray(group)); };
    }, []);
    return React.cloneElement(children, {
        ref: ref,
        onScroll: function (e) { return onScroll(e, toArray(group)); },
    });
};
ScrollSyncNode.defaultProps = {
    group: "default",
    enabled: true,
};

export { ScrollSync, ScrollSyncNode };
