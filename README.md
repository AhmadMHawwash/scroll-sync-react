# scroll-sync-react

## Overview

We provide you with a React.Context.Provider (`<ScrollSync/>`) Component that you wrap your "context" with, and then wrap each of your scrollable elements with a scroll listner (`<ScrollSyncNode/>`)
And see the magic happen

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

| prop  | type   | required | default   | description                                                   |
| ----- | ------ | -------- | --------- | ------------------------------------------------------------- |
| group | string | false    | "default" | the group of scollable elements this node will be synced with |

## gify example!

A photo equals a thousand word, how about a GIF!
![example of syncing](example.gif)

## Todo:

- [x] Vertical scrolling sync
- [x] Providing a codesandbox
- [ ] Horizontal scrolling sync
- [ ] Enable disable scroll via a prop
- [ ] Providing tests
