import React from 'react';

export default class SimpleDatePicker extends React.Component {

  static propTypes = {
    value: React.PropTypes.any,
    onChange: React.PropTypes.func.isRequired,
    template: React.PropTypes.func,
    format: React.PropTypes.func,
    disabled: React.PropTypes.bool
  }

  constructor(...args) {
    super(...args);
    throw new Error();
    this.state = { isOpen: false };
  }

  open = () => {
    this.setState({ isOpen: true });
  }

  close = () => {
    this.setState({ isOpen: false });
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  onReset = () => {
    this.setState({ isOpen: false }, () => {
      this.props.onChange(null);
    });
  }

  onSelect = (e, value) => {
    this.setState({ isOpen: false }, () => {
      this.props.onChange(value);
    });
  };

  getLocals() {
    return {
      isOpen: this.state.isOpen,
      open: this.open,
      close: this.close,
      toggle: this.toggle,
      onReset: this.onReset,
      onSelect: this.onSelect,
      value: this.props.value,
      format: this.props.format,
      disabled: this.props.disabled,
      localeUtils: this.props.localeUtils,
      locale: this.props.locale
    };
  }

  getTemplate() {
    return this.props.template || this.constructor.template;
  }

  render() {
    const template = this.getTemplate();
    return template(this.getLocals());
  }

}
