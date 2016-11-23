import React from 'react'

class Editable extends React.Component {
  props: {
    value?: string,
    editing?: boolean,
    onEdit?: Function,
    onDelete?: Function,
    onValueClick?: Function
  };
  static defaultProps: {
    value: '',
    editing: false,
    onEdit: () => {}
  };
  constructor(props:Object){
    super(props);
    this.renderEdit = this.renderEdit.bind(this);
    this.renderValue = this.renderValue.bind(this);
    this.renderDelete = this.renderDelete.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
    this.finishEdit = this.finishEdit.bind(this);
  }
  render () : Object {
    const {editing,...props} = this.props;
    return(
      <div {...props}>
        {editing ? this.renderEdit() : this.renderValue()}
      </div>
    );
  }
  renderEdit() : Object {
    return <input type="text" ref={
        (e: Object) => e ? e.selectionStart = this.props.value.length : null
      }
      autoFocus={true}
      defaultValue={this.props.value}
      onBlur={this.finishEdit}
      onKeyPress={this.checkEnter}/>;
  }
  renderValue() : Object {
    const onDelete: Function = this.props.onDelete;
    return (
      <div onClick={this.props.onValueClick}>
        <span className="value">{this.props.value}</span>
        {onDelete ? this.renderDelete() : null}
      </div>
    );
  }
  renderDelete() : Object {
    return <button
      className="delete"
      onClick={this.props.onDelete}>x</button>;
  }
  checkEnter(e: Object) : void{
    // The user hit *enter*, let's finish up.
    if(e.key === 'Enter') {
      this.finishEdit(e);
    }
  }
  finishEdit(e: Object) : void{
    const value: String = e.target.value;

    if(this.props.onEdit) {
      this.props.onEdit(value);
    }
  }
}

export default Editable;
