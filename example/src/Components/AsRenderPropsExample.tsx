import React from 'react';
import { ScrollSync, ScrollSyncNode } from '../build';
import { Banner } from './Banner';

export const AsRenderPropsExample = () => {
  return (
    <ScrollSync proportional={false}>
      <div style={{ display: 'flex', position: 'relative', height: 300 }}>
        <Banner title="Render Props Example" />
        <ScrollSyncNode
          group="a"
          render={props => {
            return (
              <div style={{ overflow: 'auto' }} id="some+id" {...props}>
                <section style={{ height: 1500 }}>
                  <h1>This is group `a`</h1>
                  <p>
                    Ahmad Hawwash Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam doloribus dolorum
                    est eum eveniet exercitationem iste labore minus, neque nobis odit officiis omnis possimus quasi
                    rerum sed soluta veritatis.
                  </p>
                </section>
              </div>
            );
          }}
        />

        <ScrollSyncNode
          group="a"
          render={props => {
            return (
              <div style={{ overflow: 'auto' }} {...props}>
                <section style={{ height: 1000 }}>
                  <h1>This is group `a`</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam doloribus dolorum est eum
                    eveniet exercitationem iste labore minus, neque nobis odit officiis omnis possimus quasi rerum sed
                    soluta veritatis.
                  </p>
                </section>
              </div>
            );
          }}
        />
      </div>
    </ScrollSync>
  );
};

export default AsRenderPropsExample;
