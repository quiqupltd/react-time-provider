import React, { Component, createContext } from 'react'
import PropTypes from 'prop-types'

const { Provider, Consumer } = createContext()

export class TimeProvider extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    now: PropTypes.number,
    timerInterval: PropTypes.number,
    isTimerRunning: PropTypes.bool,
    value: PropTypes.any,
  }

  static defaultProps = {
    children: null,
    now: Date.now(),
    timerInterval: 1000,
    isTimerRunning: false,
    value: null,
  }

  constructor(props, context) {
    super(props, context)
    const { now, timerInterval, isTimerRunning, value } = props
    this.state = { now, timerInterval, isTimerRunning, ...value }
    if (isTimerRunning) {
      this.startTimer(timerInterval)
    }
  }

  componentDidUpdate(prevProps) {
    const { isTimerRunning: prevIsTimerRunning } = prevProps
    const { isTimerRunning: currIsTimerRunning, timerInterval } = this.props
    if (prevIsTimerRunning !== currIsTimerRunning) {
      if (prevIsTimerRunning && this.timer) {
        this.stopTimer()
      } else {
        this.startTimer(timerInterval)
      }
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      this.stopTimer()
    }
  }

  startTimer = timerInterval => {
    const { isTimerRunning } = this.state
    if (!isTimerRunning) {
      this.setState({ isTimerRunning })
    }
    this.timer = setInterval(this.tick, timerInterval)
  }

  stopTimer = () => {
    this.setState({ isTimerRunning: false })
    this.timer = clearInterval(this.timer)
  }

  tick = () => this.setState({ now: Date.now() })

  render() {
    const { children } = this.props
    const { isTimerRunning, timerInterval, ...state } = this.state
    return (
      <Provider value={state} isTimerRunning={isTimerRunning} timerInterval={timerInterval}>
        {children}
      </Provider>
    )
  }
}

export const TimeConsumer = Consumer
export default TimeProvider
