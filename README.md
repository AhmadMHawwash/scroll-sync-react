# scroll-sync-react

## Overview

We provide you with a React.Context.Provider (`<ScrollSync/>`) Component that you wrap your "context" with, and then wrap each of your scrollable elements with a scroll listner (`<ScrollSyncNode/>`)
And see the magic happen

## Note

I needed this type of functionality on a side project, so I researched and found this library https://github.com/okonet/react-scroll-sync

_I have so much similarity with this library, but it's not maintained anymore, and uses the legacy context api, which introduced unexpected bugs, so I re-implemented it with the new context API and using react-hooks_

## codesandbox

A codesandbox that utilizes the latest of this package
https://codesandbox.io/s/gallant-sky-joiou

## Installation

```
npm i scroll-sync-react
```

## Usage

```
import { ScrollSync, ScrollSyncNode } from './build';

const App = () =>
  <ScrollSync>
    <div style={{ display: 'flex', position: 'relative', height: 300 }}>
      <ScrollSyncNode group="a">
        <div style={{ overflow: 'auto' }}>
          <section style={{ height: 1000 }}>
            <h1>This is group `a`</h1>
            Scrollable things
          </section>
        </div>
      </ScrollSyncNode>
      <ScrollSyncNode group="a">
        <div style={{ overflow: 'auto' }}>
          <section style={{ height: 1000 }}>
            <h1>This is group `a`</h1>
            Scrollable things
          </section>
        </div>
      </ScrollSyncNode>
    </div>
  </ScrollSync>
```

## API

### ScrollSyncNode

| prop     | type    | required | default   | description                                                   |
| -------- | ------- | -------- | --------- | ------------------------------------------------------------- |
| group    | string  | false    | "default" | the group of scollable elements this node will be synced with |
| syncable | boolean | false    | true      | to determine if scroll synced with other `ScrollSyncNode`s    |

## gify example!

A photo equals a thousand word, how about a GIF!
![example of syncing](example.gif)

## Todo:

- [x] Vertical scrolling sync
- [x] Providing a codesandbox
- [x] Enable/Disable scroll via a `syncable` prop
- [ ] Horizontal scrolling sync
- [ ] Providing tests
