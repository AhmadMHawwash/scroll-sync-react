import React from 'react';
import { ScrollSync, ScrollSyncNode } from '../build';
import DummyBox from './DummyBox';

export const HorizontalExample = () => {
  return (
    <ScrollSync>
      <>
        <div>
          <ScrollSyncNode>
            <div style={{ display: 'flex', overflowX: 'auto', flexWrap: 'nowrap', width: 300 }}>
              <DummyBox text="group default" />
              <DummyBox text="group default" />
              <DummyBox text="group default" />
              <DummyBox text="group default" />
              <DummyBox text="group default" />
              <DummyBox text="group default" />
              <DummyBox text="group default" />
              <DummyBox text="group default" />
              <DummyBox text="group default" />
              <DummyBox text="group default" />
            </div>
          </ScrollSyncNode>
          <ScrollSyncNode>
            <div style={{ display: 'flex', overflowX: 'auto', flexWrap: 'nowrap', width: 300 }}>
              <DummyBox text="group default" />
              <DummyBox text="group default" />
              <DummyBox text="group default" />
              <DummyBox text="group default" />
              <DummyBox text="group default" />
              <DummyBox text="group default" />
              <DummyBox text="group default" />
              <DummyBox text="group default" />
              <DummyBox text="group default" />
              <DummyBox text="group default" />
            </div>
          </ScrollSyncNode>
        </div>
        <ScrollSyncNode group="Horizontal_A">
          <div style={{ display: 'flex', overflowX: 'auto', flexWrap: 'nowrap', width: 300 }}>
            <DummyBox text="group Horizontal_A" width={150} />
            <DummyBox text="group Horizontal_A" width={150} />
            <DummyBox text="group Horizontal_A" width={150} />
            <DummyBox text="group Horizontal_A" width={150} />
            <DummyBox text="group Horizontal_A" width={150} />
            <DummyBox text="group Horizontal_A" width={150} />
            <DummyBox text="group Horizontal_A" width={150} />
            <DummyBox text="group Horizontal_A" width={150} />
            <DummyBox text="group Horizontal_A" width={150} />
            <DummyBox text="group Horizontal_A" width={150} />
          </div>
        </ScrollSyncNode>
        <ScrollSyncNode>
          <div style={{ display: 'flex', overflowX: 'auto', flexWrap: 'nowrap', width: 300 }}>
            <DummyBox text="group default" />
            <DummyBox text="group default" />
            <DummyBox text="group default" />
            <DummyBox text="group default" />
            <DummyBox text="group default" />
            <DummyBox text="group default" />
            <DummyBox text="group default" />
            <DummyBox text="group default" />
            <DummyBox text="group default" />
            <DummyBox text="group default" />
          </div>
        </ScrollSyncNode>
        <ScrollSyncNode group="Horizontal_A">
          <div style={{ display: 'flex', overflowX: 'auto', flexWrap: 'nowrap', width: 300 }}>
            <DummyBox text="group Horizontal_A" width={150} />
            <DummyBox text="group Horizontal_A" width={150} />
            <DummyBox text="group Horizontal_A" width={150} />
            <DummyBox text="group Horizontal_A" width={150} />
            <DummyBox text="group Horizontal_A" width={150} />
            <DummyBox text="group Horizontal_A" width={150} />
            <DummyBox text="group Horizontal_A" width={150} />
            <DummyBox text="group Horizontal_A" width={150} />
            <DummyBox text="group Horizontal_A" width={150} />
            <DummyBox text="group Horizontal_A" width={150} />
          </div>
        </ScrollSyncNode>
      </>
    </ScrollSync>
  );
};

export default HorizontalExample;
