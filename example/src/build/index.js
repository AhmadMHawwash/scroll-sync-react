/* eslint-disable */
import React, { useRef, forwardRef, useContext, useEffect } from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

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
    var elements = nodesRef.current;
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
        return !!elements[group];
    };
    /**
     * returns found node or undefined
     * @param node to be found
     * @param group to be searched in
     */
    var doesNodeExists = function (node, group) {
        var groupExists = findGroup(group);
        if (!groupExists)
            return false;
        var foundNode = elements[group].find(function (element) { return element.node === node; });
        if (!foundNode)
            return false;
        return !!foundNode;
    };
    /**
     * this function will delightly register your node (that uses ScrollSyncNode)
     * to be scroll-synced with it's cool other registerd nodes
     *
     * @param node to be registred
     * @param groups to wich groups the node should be registered
     */
    var registerNode = function (element, groups) {
        groups.forEach(function (group) {
            var groupExists = findGroup(group);
            if (!groupExists) {
                elements[group] = [];
            }
            elements[group].push(__assign({}, element));
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
    var unregisterNode = function (element, groups) {
        groups.forEach(function (group) {
            var doesNodeExist = doesNodeExists(element.node, group);
            if (doesNodeExist) {
                elements[group].splice(elements[group].findIndex(function (e) { return element.node === e.node; }), 1);
            }
        });
    };
    /**
     * calculate scrolling percentage of the scrolledNode to be synced with other nodes
     * @param scrolledNode !!
     * @param node other node to be scroll-synced
     */
    var syncScrollPosition = function (scrolledNode, node) {
        if (!scrolledNode || !node)
            return;
        var scrollTop = scrolledNode.scrollTop, scrollHeight = scrolledNode.scrollHeight, offsetHeight = scrolledNode.offsetHeight, scrollLeft = scrolledNode.scrollLeft, scrollWidth = scrolledNode.scrollWidth, offsetLeft = scrolledNode.offsetLeft, offsetWidth = scrolledNode.offsetWidth;
        if (!props.proportional) {
            node.scrollLeft = scrollLeft;
            node.scrollTop = scrollTop;
            return;
        }
        //calculate percentage of scrolling of the scrolledNode
        var percentagePerHeight = scrollTop / (scrollHeight - offsetHeight);
        //calculate percentage of scrolling of the scrolledNode
        var percentagePerWidth = scrollLeft / (scrollWidth - offsetWidth);
        //Apply calculated scrolling
        node.scrollTop = Math.round(percentagePerHeight * (node.scrollHeight - node.offsetHeight));
        node.scrollLeft = Math.round(percentagePerWidth * (node.scrollWidth - node.offsetWidth));
    };
    /**
     * We sync all other nodes in the registered groups
     * @param scrolledNode !!
     * @param groups groups to be scroll-synced
     */
    var syncScrollPositions = function (scrolledNode, groups) {
        groups.forEach(function (group) {
            elements[group].forEach(function (element) {
                /* For all nodes other than the currently scrolled one */
                if (scrolledNode !== element.node) {
                    var isEnabled = element.scroll === "two-way";
                    var isSynced = element.scroll === "synced-only";
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
            onScroll: function (e, groups) { return !props.disabled && handleNodeScroll(e.currentTarget, groups); },
        } }, React.Children.only(props.children)));
};
ScrollSync.defaultProps = {
    disabled: false,
    proportional: true,
};

var toArray = function (groups) { return [].concat(groups); };
var getMovingAxis = function (e) {
    if (e.deltaX > 0 || e.deltaX < 0)
        return "X";
    if (e.deltaY > 0 || e.deltaY < 0)
        return "Y";
    if ((e.deltaY > 0 || e.deltaY < 0) && (e.deltaX > 0 || e.deltaX < 0))
        return "XY";
    return null;
};

var ScrollSyncNode = forwardRef(function (props, forwardedRef) {
    var _a;
    var children = props.children, _b = props.group, group = _b === void 0 ? "default" : _b, _c = props.scroll, scroll = _c === void 0 ? "two-way" : _c, _d = props.selfLockAxis, selfLockAxis = _d === void 0 ? null : _d, _e = props.onScroll, onNodeScroll = _e === void 0 ? function () { return undefined; } : _e, render = props.render;
    var _f = useContext(ScrollingSyncerContext), registerNode = _f.registerNode, unregisterNode = _f.unregisterNode, onScroll = _f.onScroll;
    var childRef = (_a = children) === null || _a === void 0 ? void 0 : _a.ref;
    var hasDoubleRef = childRef != null && forwardedRef != null;
    if (hasDoubleRef) {
        console.warn("scroll-sync-react:\nWARNING: ref used on both ScrollSyncNode and its direct child.\nUsing the ref from the ScrollSyncNode component.");
    }
    var ref = childRef && !forwardedRef ? childRef : useRef(null);
    useEffect(function () {
        if (typeof forwardedRef === "function") {
            forwardedRef(ref.current);
        }
    }, []);
    var applySelfLockAxis = function (event) {
        var movingAxis = getMovingAxis(event);
        if (selfLockAxis === "X" && movingAxis === "X") {
            event.preventDefault();
        }
        else if (selfLockAxis === "Y" && movingAxis === "Y") {
            event.preventDefault();
        }
        else if (selfLockAxis === "XY" && (movingAxis === "XY" || movingAxis === "X" || movingAxis === "Y")) {
            event.preventDefault();
        }
    };
    useEffect(function () {
        var _a;
        var syncableElement = { node: ref.current, scroll: scroll };
        if (syncableElement)
            registerNode(syncableElement, toArray(group));
        (_a = ref.current) === null || _a === void 0 ? void 0 : _a.addEventListener("wheel", applySelfLockAxis, { passive: false });
        return function () {
            var _a;
            unregisterNode(syncableElement, toArray(group));
            (_a = ref.current) === null || _a === void 0 ? void 0 : _a.removeEventListener("wheel", applySelfLockAxis);
        };
    }, []);
    useEffect(function () {
        var syncableElement = { node: ref.current, scroll: scroll };
        unregisterNode(syncableElement, toArray(group));
        registerNode(syncableElement, toArray(group));
        return function () { return unregisterNode(syncableElement, toArray(group)); };
    }, [scroll, group]);
    var isSyncer = scroll === "syncer-only";
    var isEnabled = scroll === "two-way";
    var _onScroll = function (e) {
        if (typeof (children === null || children === void 0 ? void 0 : children.props.onScroll) === "function") {
            children.props.onScroll(e);
        }
        e.persist();
        if (isSyncer || isEnabled) {
            onScroll(e, toArray(group));
            onNodeScroll(e);
        }
    };
    var _onWheel = function (e) {
        if (typeof (children === null || children === void 0 ? void 0 : children.props.onWheel) === "function") {
            children.props.onWheel(e);
        }
        e.persist();
        if (isSyncer || isEnabled) {
            onScroll(e, toArray(group));
            onNodeScroll(e);
        }
    };
    if (render) {
        return render({ ref: ref, onScroll: _onScroll, onWheel: _onWheel });
    }
    if (!children)
        throw new Error("Children can not be undefined if render prop has not bee passed");
    return React.cloneElement(children, {
        ref: ref,
        onScroll: _onScroll,
        onWheel: _onWheel,
    });
});
ScrollSyncNode.displayName = "ScrollSyncNode";

export { ScrollSync, ScrollSyncNode };
