# Usage

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
