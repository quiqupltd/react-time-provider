import React, { Component, createContext } from 'react'
import renderer from 'react-test-renderer'
import { mount, unmount, shallow } from 'enzyme'
import TimeProvider, { Context } from './index.js'

describe('TimeProvider', () => {
  const now = new Date(Date.UTC('2018', '04', '10', '12', '00')).getTime()
  const uiProviderDefaultProps = Object.freeze({
    isTimerRunning: false,
    timerInterval: 1000,
    children: null,
    now,
  })
  beforeEach(jest.useFakeTimers)
  afterEach(jest.clearAllTimers)

  it('should contain default props', () => {
    const expectedDefaultProps = { children: null, timerInterval: 1000, isTimerRunning: false, value: { now } }
    const wrapper = shallow(<TimeProvider value={{ now }} />)
    expect(wrapper.props()).toEqual(expectedDefaultProps)
  })

  it('should create the timer in initialization', () => {
    expect(TimeProvider.prototype.timer).toBeUndefined()
    const instance = shallow(<TimeProvider isTimerRunning={true} />).instance()
    expect(instance.timer).toBeDefined()
    expect(setInterval).toHaveBeenCalledTimes(1)
    expect(setInterval).toHaveBeenCalledWith(instance.tick, 1000)
  })

  it('should call setInterval on initialization if isTimerRunning is true', () => {
    shallow(<TimeProvider {...uiProviderDefaultProps} isTimerRunning={true} />)
    expect(setInterval).toHaveBeenCalledTimes(1)
  })

  it('should call setState once a second', done => {
    const wrapper = shallow(<TimeProvider {...uiProviderDefaultProps} isTimerRunning={true} />)
    const instance = wrapper.instance()
    const setStateSpy = jest.spyOn(instance, 'setState')
    jest.advanceTimersByTime(1000)
    expect(instance.tick).toBeDefined()
    expect(setStateSpy).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(2000)
    expect(setStateSpy).toHaveBeenCalledTimes(3)
    done()
  })

  it('should clear the timer if one is set on unmount', () => {
    const mockTimerValue = 12345
    setInterval.mockReturnValue(mockTimerValue)
    const wrapper = shallow(<TimeProvider {...uiProviderDefaultProps} isTimerRunning={true} />)
    const instance = wrapper.instance()
    const stopTimerSpy = jest.spyOn(instance, 'stopTimer')
    expect(instance.timer).toBeDefined()
    wrapper.unmount()
    expect(stopTimerSpy).toHaveBeenCalledTimes(1)
    expect(clearInterval).toHaveBeenCalledTimes(1)
    expect(clearInterval).toHaveBeenCalledWith(mockTimerValue)
  })

  it('should call clearInterval from stopTimer', () => {
    const wrapper = shallow(<TimeProvider {...uiProviderDefaultProps} isTimerRunning={true} />)
    const instance = wrapper.instance()
    expect(instance.timer).toBeDefined()
    instance.stopTimer()
    expect(instance.timer).toBeUndefined()
    expect(clearInterval).toHaveBeenCalledTimes(1)
  })

  it('should call startTimer if isTimerRunning is set to true', () => {
    const wrapper = shallow(<TimeProvider {...uiProviderDefaultProps} />)
    const instance = wrapper.instance()
    const startTimerSpy = jest.spyOn(instance, 'startTimer')

    wrapper.setProps({ isTimerRunning: true })
    expect(startTimerSpy).toBeCalled()
  })

  it('should call stopTimer if isTimerRunning is set to false', () => {
    const wrapper = shallow(<TimeProvider {...uiProviderDefaultProps} isTimerRunning={true} />)
    const instance = wrapper.instance()
    const stopTimerSpy = jest.spyOn(instance, 'stopTimer')

    wrapper.setProps({ isTimerRunning: false })
    expect(stopTimerSpy).toBeCalled()
  })

  it('should check if timer is set in componentWillUnmount', () => {
    const wrapper = shallow(<TimeProvider {...uiProviderDefaultProps} />)
    const instance = wrapper.instance()
    wrapper.unmount()
    expect(instance.timer).toBeUndefined()
  })

  it('should detect change in componentDidUpdate and start timer', () => {
    const wrapper = shallow(<TimeProvider {...uiProviderDefaultProps} isTimerRunning={true} />)
    const instance = wrapper.instance()
    instance.componentDidUpdate({ isTimerRunning: true })
    wrapper.update()
    expect(wrapper.prop('isTimerRunning')).toBe(true)
    expect(instance.timer).toBeDefined()
  })

  it('should stop the timer if isTimerRunning is set to false', () => {
    const mockTimerValue = 12345
    setInterval.mockReturnValue(mockTimerValue)
    const wrapper = shallow(<TimeProvider {...uiProviderDefaultProps} isTimerRunning={true} />)
    const instance = wrapper.instance()
    expect(instance.timer).toBeDefined()
    wrapper.setProps({ isTimerRunning: false })
    expect(clearInterval).toHaveBeenCalledTimes(1)
    expect(clearInterval).toHaveBeenCalledWith(mockTimerValue)
  })
})
