import React from 'react';
import { ScrollSync, ScrollSyncNode } from '../build';
import DummyBox from './DummyBox';
import { Banner } from './Banner';

export const VerticalHorizontalExample = () => (
  <ScrollSync>
    <>
      <Banner title="Vertical Horizontal Example" />
      <div>
        <ScrollSyncNode selfLockAxis="XY">
          <div style={{ display: 'flex', overflowX: 'auto', flexWrap: 'nowrap', width: 300, height: 50 }}>
            <DummyBox text="default" />
            <DummyBox text="default" />
            <DummyBox text="default" />
            <DummyBox text="default" />
            <DummyBox text="default" />
            <DummyBox text="default" />
            <DummyBox text="default" />
            <DummyBox text="default" />
            <DummyBox text="default" />
            <DummyBox text="default" />
          </div>
        </ScrollSyncNode>
        <Banner title="Vertical Horizontal Example" />
        <ScrollSyncNode>
          <div style={{ display: 'flex', overflowX: 'auto', flexWrap: 'nowrap', width: 300, height: 50 }}>
            <DummyBox text="default" />
            <DummyBox text="default" />
            <DummyBox text="default" />
            <DummyBox text="default" />
            <DummyBox text="default" />
            <DummyBox text="default" />
            <DummyBox text="default" />
            <DummyBox text="default" />
            <DummyBox text="default" />
            <DummyBox text="default" />
          </div>
        </ScrollSyncNode>
        <ScrollSyncNode>
          <div style={{ display: 'flex', overflowX: 'auto', flexWrap: 'nowrap', width: 300, height: 50 }}>
            <DummyBox text="default" />
            <DummyBox text="default" />
            <DummyBox text="default" />
            <DummyBox text="default" />
            <DummyBox text="default" />
            <DummyBox text="default" />
            <DummyBox text="default" />
            <DummyBox text="default" />
            <DummyBox text="default" />
            <DummyBox text="default" />
          </div>
        </ScrollSyncNode>
      </div>
      <Banner title="Vertical Horizontal Examples" />
      <ScrollSyncNode group="Horizontal_A">
        <div style={{ display: 'flex', overflowX: 'auto', flexWrap: 'nowrap', width: 300, height: 50 }}>
          <DummyBox text="Horizontal_A" width={150} />
          <DummyBox text="Horizontal_A" width={150} />
          <DummyBox text="Horizontal_A" width={150} />
          <DummyBox text="Horizontal_A" width={150} />
          <DummyBox text="Horizontal_A" width={150} />
          <DummyBox text="Horizontal_A" width={150} />
          <DummyBox text="Horizontal_A" width={150} />
          <DummyBox text="Horizontal_A" width={150} />
          <DummyBox text="Horizontal_A" width={150} />
          <DummyBox text="Horizontal_A" width={150} />
        </div>
      </ScrollSyncNode>
      <ScrollSyncNode group="Horizontal_A">
        <div style={{ display: 'flex', overflowX: 'auto', flexWrap: 'nowrap', width: 300, height: 50 }}>
          <DummyBox text="Horizontal_A" width={150} />
          <DummyBox text="Horizontal_A" width={150} />
          <DummyBox text="Horizontal_A" width={150} />
          <DummyBox text="Horizontal_A" width={150} />
          <DummyBox text="Horizontal_A" width={150} />
          <DummyBox text="Horizontal_A" width={150} />
          <DummyBox text="Horizontal_A" width={150} />
          <DummyBox text="Horizontal_A" width={150} />
          <DummyBox text="Horizontal_A" width={150} />
          <DummyBox text="Horizontal_A" width={150} />
        </div>
      </ScrollSyncNode>
    </>
  </ScrollSync>
);

export default VerticalHorizontalExample;
