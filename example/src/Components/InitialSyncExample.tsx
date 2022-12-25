import React, { useState } from 'react';
import { ScrollSync, ScrollSyncNode } from '../build';
import { Banner } from './Banner';

export const InitialSyncExample = () => {
  const [elements, setElements] = useState(1);

  return (
    <>
      <Banner title="Sync New Elements Examples" />
      <ScrollSync>
        <div style={{ display: 'flex', position: 'relative', height: 300 }}>
          {[...new Array(elements)].map((_, idx) => (
            <ScrollSyncNode key={idx} group="Synced">
              <div style={{ overflow: 'auto' }}>
                <section style={{ height: 1000 }}>
                  <h1>This is group `Synced`</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam doloribus dolorum est eum
                    eveniet exercitationem iste labore minus, neque nobis odit officiis omnis possimus quasi rerum sed
                    soluta veritatis.
                  </p>
                </section>
              </div>
            </ScrollSyncNode>
          ))}
        </div>
      </ScrollSync>
      <button onClick={() => setElements(elements + 2)}>Add two more boxes</button>
    </>
  );
};

export default InitialSyncExample;
