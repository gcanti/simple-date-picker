A thin wrapper of [react-day-picker](https://github.com/gpbl/react-day-picker)

# Usage

```js
import React from 'react';
import ReactDOM from 'react-dom';
import SimpleDatePicker from 'simple-date-picker';

class StatefullDatePicker extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {};
  }

  onChange = (value) => {
    this.setState({value});
  }

  render() {
    return <SimpleDatePicker value={this.state.value} onChange={this.onChange} />;
  }

}

ReactDOM.render(<StatefullDatePicker />, document.getElementById('app'));
```

# Props

- `value`
- `onChange(currentValue) => void`
- `format(date: Date) => string` (optional)
- `template(locals) => ReactElement` (optional)
- `disabled: boolean` (optional)
