import React, { PureComponent } from 'react'
import { TimeProvider, TimeConsumer } from './ui-store'

export const Component = props => (
  <TimeProvider {...props} isTimerRunning={true}>
    <TimeConsumer>{({ now }) => new Date(now).toString()}</TimeConsumer>
  </TimeProvider>
)

export class Provider extends PureComponent {
  render() {
    return Component(this.props)
  }
}
