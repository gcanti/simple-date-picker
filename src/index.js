import React from 'react'
import PropTypes from 'prop-types';

export default class SimpleDatePicker extends React.Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    template: PropTypes.func
  }

  constructor(...args) {
    super(...args)
    this.state = { isOpen: false }
  }

  open = () => {
    this.setState({ isOpen: true })
  }

  close = () => {
    this.setState({ isOpen: false })
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  onReset = () => {
    this.setState({ isOpen: false }, () => {
      this.props.onChange(null)
    })
  }

  onSelect = (e, value) => {
    this.setState({ isOpen: false }, () => {
      this.props.onChange(value)
    })
  }

  getLocals() {
    return {
      isOpen: this.state.isOpen,
      open: this.open,
      close: this.close,
      toggle: this.toggle,
      onReset: this.onReset,
      onSelect: this.onSelect,
      ...this.props
    }
  }

  getTemplate() {
    return this.props.template || this.constructor.template
  }

  render() {
    const template = this.getTemplate()
    return template(this.getLocals())
  }

}
