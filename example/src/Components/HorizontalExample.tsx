import React from 'react';
import { ScrollSync, ScrollSyncNode } from '../build';
import DummyBox from './DummyBox';

export const HorizontalExample = () => (
  <ScrollSync>
    <>
      <ScrollSyncNode>
        <div style={{ display: 'flex', overflowX: 'auto', flexWrap: 'nowrap', width: 150 }}>
          <DummyBox />
          <DummyBox />
          <DummyBox />
          <DummyBox />
          <DummyBox />
          <DummyBox />
          <DummyBox />
          <DummyBox />
          <DummyBox />
          <DummyBox />
        </div>
      </ScrollSyncNode>
      <ScrollSyncNode>
        <div style={{ display: 'flex', overflowX: 'auto', flexWrap: 'nowrap', width: 200 }}>
          <DummyBox />
          <DummyBox />
          <DummyBox />
          <DummyBox />
          <DummyBox />
          <DummyBox />
          <DummyBox />
          <DummyBox />
          <DummyBox />
          <DummyBox />
        </div>
      </ScrollSyncNode>
      <ScrollSyncNode>
        <div style={{ display: 'flex', overflowX: 'auto', flexWrap: 'nowrap', width: 250 }}>
          <DummyBox />
          <DummyBox />
          <DummyBox />
          <DummyBox />
          <DummyBox />
          <DummyBox />
          <DummyBox />
          <DummyBox />
          <DummyBox />
          <DummyBox />
        </div>
      </ScrollSyncNode>
    </>
  </ScrollSync>
);

export default HorizontalExample;
