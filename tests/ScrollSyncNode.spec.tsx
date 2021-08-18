import React from "react";
import { mount } from "enzyme";
import { ScrollSync, ScrollSyncNode } from "../src";

describe("ScrollSyncNode", () => {
  it("should support using ref on ScrollSyncNode", () => {
    const ref = jest.fn();
    mount(
      <ScrollSync>
        <ScrollSyncNode ref={ref}>
          <div />
        </ScrollSyncNode>
      </ScrollSync>,
    );
    expect(ref).toHaveBeenCalledTimes(1);
    expect(ref.mock.calls[0][0].toString()).toEqual("[object HTMLDivElement]");
  });

  it("should support using ref on the direct child node", () => {
    const ref = jest.fn();
    mount(
      <ScrollSync>
        <ScrollSyncNode>
          <div ref={ref} />
        </ScrollSyncNode>
      </ScrollSync>,
    );
    expect(ref).toHaveBeenCalledTimes(1);
    expect(ref.mock.calls[0][0].toString()).toEqual("[object HTMLDivElement]");
  });

  it("should only call ref on ScrollSyncNode when having duplicate refs", () => {
    const ref1 = jest.fn();
    const ref2 = jest.fn();
    mount(
      <ScrollSync>
        <ScrollSyncNode ref={ref1}>
          <div ref={ref2} />
        </ScrollSyncNode>
      </ScrollSync>,
    );
    expect(ref1).toHaveBeenCalledTimes(1);
    expect(ref1.mock.calls[0][0].toString()).toEqual("[object HTMLDivElement]");
    expect(ref2).toHaveBeenCalledTimes(0);
  });

  it("should support using onScroll on ScrollSyncNode", () => {
    const onScroll = jest.fn();
    const persist = jest.fn();
    const fakeScrollEvent = {
      currentTarget: {
        scrollLeft: 300,
      },
      persist: () => {
        persist();
      },
    } as React.UIEvent<HTMLElement>;
    const wrapper = mount(
      <ScrollSync>
        <ScrollSyncNode data-sync-node onScroll={onScroll}>
          <div />
        </ScrollSyncNode>
      </ScrollSync>,
    );
    const onScrollHandler = wrapper.find("[data-sync-node]").prop("onScroll");
    if (onScrollHandler) {
      onScrollHandler(fakeScrollEvent);
    }
    expect(onScroll).toHaveBeenCalledTimes(1);
    expect(onScroll).toHaveBeenCalledWith(fakeScrollEvent);
    expect(persist).toHaveBeenCalledTimes(0);
  });

  it("should support using onScroll on the direct child node", () => {
    const onScroll = jest.fn();
    const persist = jest.fn();
    const fakeScrollEvent = {
      currentTarget: {
        scrollLeft: 300,
      },
      persist: () => {
        persist();
      },
    } as React.UIEvent<HTMLElement>;
    const wrapper = mount(
      <ScrollSync>
        <ScrollSyncNode>
          <div data-child onScroll={onScroll} />
        </ScrollSyncNode>
      </ScrollSync>,
    );
    const onScrollHandler = wrapper.find("[data-child]").prop("onScroll");
    if (onScrollHandler) {
      onScrollHandler(fakeScrollEvent);
    }
    expect(onScroll).toHaveBeenCalledTimes(1);
    expect(onScroll).toHaveBeenCalledWith(fakeScrollEvent);
    expect(persist).toHaveBeenCalledTimes(1);
  });

  it("should support using onWheel on the direct child node", () => {
    const onWheel = jest.fn();
    const persist = jest.fn();
    const fakeWheelEvent = {
      currentTarget: {
        scrollTop: 300,
      },
      persist: () => {
        persist();
      },
    } as React.WheelEvent<HTMLElement>;
    const wrapper = mount(
      <ScrollSync>
        <ScrollSyncNode>
          <div data-child onWheel={onWheel} />
        </ScrollSyncNode>
      </ScrollSync>,
    );
    const onWheelHandler = wrapper.find("[data-child]").prop("onWheel");
    if (onWheelHandler) {
      onWheelHandler(fakeWheelEvent);
    }
    expect(onWheel).toHaveBeenCalledTimes(1);
    expect(onWheel).toHaveBeenCalledWith(fakeWheelEvent);
    expect(persist).toHaveBeenCalledTimes(1);
  });
});
