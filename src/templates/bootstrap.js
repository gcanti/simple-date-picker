import React from 'react'
import DayPicker, { DateUtils } from 'react-day-picker'

function defaultFormat(value) {
  return value ? value.toISOString().substring(0, 10) : ''
}

function create(overrides = {}) {
  function bootstrap(locals) {
    return bootstrap.renderContainer(locals)
  }

  bootstrap.getFormat = overrides.getFormat || function getFormat(locals) {
    return locals.format || defaultFormat
  }

  bootstrap.renderContainer = overrides.renderContainer || function renderContainer(locals) {
    return (
      <div style={{maxWidth: '300px'}}>
        {bootstrap.renderDate(locals)}
        {locals.isOpen && bootstrap.renderDayPicker(locals)}
      </div>
    )
  }

  bootstrap.renderResetButtonLabel = overrides.renderResetButtonLabel || function renderResetButtonLabel() {
    return <span>✘</span>
  }

  bootstrap.renderResetButton = overrides.renderResetButton || function renderResetButton(locals) {
    return (
      <div className="input-group-addon" style={{cursor: 'pointer'}} onClick={locals.onReset}>
        {bootstrap.renderResetButtonLabel(locals)}
      </div>
    )
  }

  bootstrap.renderDate = overrides.renderDate || function renderStatic(locals) {
    return locals.disabled ?
      bootstrap.renderDisabledDate(locals) :
      bootstrap.renderEnabledDate(locals)
  }

  bootstrap.renderEnabledDate = overrides.renderEnabledDate || function renderEnabledDate(locals) {
    const format = bootstrap.getFormat(locals)
    return (
      <div className="input-group">
        <input
          className="form-control"
          onClick={() => locals.toggle()}
          onChange={() => {}}
          value={format(locals.value)}
        />
        {bootstrap.renderResetButton(locals)}
      </div>
    )
  }

  bootstrap.renderDisabledDate = overrides.renderDisabledDate || function renderDisabledDate(locals) {
    const format = bootstrap.getFormat(locals)
    return (
      <input
        className="form-control"
        disabled
        onChange={() => {}}
        value={format(locals.value)}
      />
    )
  }

  bootstrap.renderDayPicker = overrides.renderDayPicker || function renderDayPicker(locals) {
    const value = locals.value
    const props = {
      initialMonth: value || undefined, // DayPicker wants undefined, not null
      modifiers: { selected: date => DateUtils.isSameDay(value, date) },
      onDayClick: locals.onSelect,
      value,
      localeUtils: locals.localeUtils,
      locale: locals.locale,
      renderDay: locals.renderDay
    }
    return <DayPicker {...props} />
  }

  bootstrap.clone = function clone(newOverrides = {}) {
    return create({...overrides, ...newOverrides})
  }

  return bootstrap
}

export default create()
