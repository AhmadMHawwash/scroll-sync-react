import React from 'react';
import { ScrollSync, ScrollSyncNode } from '../build';
import { Banner } from './Banner';

export const VerticalExample = () => {
  let ref: (EventTarget & HTMLElement) | null;

  const handleRef = (el: (EventTarget & HTMLElement) | null) => (ref = el);

  return (
    <ScrollSync proportional={false}>
      <div onClick={() => ref?.scrollBy(10, 10)} style={{ display: 'flex', position: 'relative', height: 300 }}>
        <Banner title="Vertical Example" />
        <ScrollSyncNode group="a" ref={handleRef} onScroll={console.log} selfLockAxis="XY">
          <div style={{ overflow: 'auto' }} id="some+id">
            <section style={{ height: 1500 }}>
              <h1>This is group `a`</h1>
              <p>
                Ahmad Hawwash Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam doloribus dolorum est
                eum eveniet exercitationem iste labore minus, neque nobis odit officiis omnis possimus quasi rerum sed
                soluta veritatis.
              </p>
            </section>
          </div>
        </ScrollSyncNode>

        <ScrollSyncNode group="a" onScroll={console.log}>
          <div style={{ overflow: 'auto' }}>
            <section style={{ height: 1000 }}>
              <h1>This is group `a`</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam doloribus dolorum est eum eveniet
                exercitationem iste labore minus, neque nobis odit officiis omnis possimus quasi rerum sed soluta
                veritatis.
              </p>
            </section>
          </div>
        </ScrollSyncNode>

        <ScrollSyncNode group="a">
          <div style={{ overflow: 'auto' }}>
            <section style={{ height: 1000 }}>
              <h1>This is group `a`</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam doloribus dolorum est eum eveniet
                exercitationem iste labore minus, neque nobis odit officiis omnis possimus quasi rerum sed soluta
                veritatis.
              </p>
            </section>
          </div>
        </ScrollSyncNode>
        <ScrollSyncNode group="b">
          <div style={{ overflow: 'auto' }}>
            <section style={{ height: 1000 }}>
              <h1>This is group `b`</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam doloribus dolorum est eum eveniet
                exercitationem iste labore minus, neque nobis odit officiis omnis possimus quasi rerum sed soluta
                veritatis.
              </p>
            </section>
          </div>
        </ScrollSyncNode>
        <ScrollSyncNode group="b">
          <div style={{ overflow: 'auto' }}>
            <section style={{ height: 1000 }}>
              <h1>This is group `b`</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam doloribus dolorum est eum eveniet
                exercitationem iste labore minus, neque nobis odit officiis omnis possimus quasi rerum sed soluta
                veritatis.
              </p>
            </section>
          </div>
        </ScrollSyncNode>
        <ScrollSyncNode>
          <div style={{ overflow: 'auto' }}>
            <section style={{ height: 1000 }}>
              <h1>This is no group</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam doloribus dolorum est eum eveniet
                exercitationem iste labore minus, neque nobis odit officiis omnis possimus quasi rerum sed soluta
                veritatis.
              </p>
            </section>
          </div>
        </ScrollSyncNode>
        <ScrollSyncNode>
          <div style={{ overflow: 'auto' }}>
            <section style={{ height: 1000 }}>
              <h1>This is no group</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam doloribus dolorum est eum eveniet
                exercitationem iste labore minus, neque nobis odit officiis omnis possimus quasi rerum sed soluta
                veritatis.
              </p>
            </section>
          </div>
        </ScrollSyncNode>
        <ScrollSyncNode>
          <div style={{ overflow: 'auto' }}>
            <section style={{ height: 1000 }}>
              <h1>This is no group</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam doloribus dolorum est eum eveniet
                exercitationem iste labore minus, neque nobis odit officiis omnis possimus quasi rerum sed soluta
                veritatis.
              </p>
            </section>
          </div>
        </ScrollSyncNode>
        <ScrollSyncNode>
          <div style={{ overflow: 'auto' }}>
            <section style={{ height: 1000 }}>
              <h1>This is no group</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam doloribus dolorum est eum eveniet
                exercitationem iste labore minus, neque nobis odit officiis omnis possimus quasi rerum sed soluta
                veritatis.
              </p>
            </section>
          </div>
        </ScrollSyncNode>
        <ScrollSyncNode group="b">
          <div style={{ overflow: 'auto' }}>
            <section style={{ height: 1000 }}>
              <h1>This is group `b`</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam doloribus dolorum est eum eveniet
                exercitationem iste labore minus, neque nobis odit officiis omnis possimus quasi rerum sed soluta
                veritatis.
              </p>
            </section>
          </div>
        </ScrollSyncNode>
        <ScrollSyncNode group="b">
          <div style={{ overflow: 'auto' }}>
            <section style={{ height: 1000 }}>
              <h1>This is group `b`</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam doloribus dolorum est eum eveniet
                exercitationem iste labore minus, neque nobis odit officiis omnis possimus quasi rerum sed soluta
                veritatis.
              </p>
            </section>
          </div>
        </ScrollSyncNode>
        <ScrollSyncNode group="a">
          <div style={{ overflow: 'auto' }}>
            <section style={{ height: 1000 }}>
              <h1>This is group `a`</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam doloribus dolorum est eum eveniet
                exercitationem iste labore minus, neque nobis odit officiis omnis possimus quasi rerum sed soluta
                veritatis.
              </p>
            </section>
          </div>
        </ScrollSyncNode>
        <ScrollSyncNode group="a">
          <div style={{ overflow: 'auto' }}>
            <section style={{ height: 1000 }}>
              <h1>This is group `a`</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam doloribus dolorum est eum eveniet
                exercitationem iste labore minus, neque nobis odit officiis omnis possimus quasi rerum sed soluta
                veritatis.
              </p>
            </section>
          </div>
        </ScrollSyncNode>
        <ScrollSyncNode group="a">
          <div style={{ overflow: 'auto' }}>
            <section style={{ height: 1000 }}>
              <h1>This is group `a`</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam doloribus dolorum est eum eveniet
                exercitationem iste labore minus, neque nobis odit officiis omnis possimus quasi rerum sed soluta
                veritatis.
              </p>
            </section>
          </div>
        </ScrollSyncNode>
      </div>
    </ScrollSync>
  );
};

export default VerticalExample;
