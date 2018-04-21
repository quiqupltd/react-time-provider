# React `TimeProvider` and `TimeConsumer`

[![NPM](https://img.shields.io/npm/v/@quiqupltd/react-time-provider.svg)](https://www.npmjs.com/package/@quiqupltd/react-time-provider) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> A configurable timer utility to pass time props to your components via Context API at a set interval.

## Install

```bash
yarn add @quiqupltd/react-time-provider
```

## Use
```jsx
import React, { Component } from 'react'
import TimeProvider from '@quiqupltd/react-time-provider'

class App extends Component {
  render() {
    return (
      <TimeProvider isTimerRunning={true}>
        <Routes />
      </TimeProvider>
    )
  }
}
```
Then consume in your app
```jsx
import { TimeConsumer } from '@quiqupltd/react-time-provider'

const RemainingTime = () => {
  return (
    <TimeConsumer>
      { ({now}) => <ComponentThatNeedsTimer now={now}/> }
    </TimeConsumer>
  )
}
```

### `TimeProvider`

| prop  | Type | Description | Default |
| ------------- | ------------- |------------- |------------- |
| now | Number | UNIX timestamp ie. `1523444679818` | `Date.now()` |
| isTimerRunning | Boolean | `true` or `false` starts or stops the timer | `false` |
| timerInterval | Number | interval length in milliseconds | 1000 |

### `TimeConsumer`

Children of `TimeConsumer` will have access to `TimeProvider`'s props via render props


## License

MIT © [![Quiqup](https://avatars3.githubusercontent.com/u/7002399?s=16)Quiqup](https://github.com/QuiqUpLTD)