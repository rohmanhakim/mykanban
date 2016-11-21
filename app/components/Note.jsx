import React, { PropTypes } from 'react'
import {DragSource,DropTarget} from 'react-dnd'
import ItemTypes from '../constants/itemTypes'

const noteSource = {
  beginDrag(props) {
    return {
      id: props.id
    };
  },
  isDragging(props,monitor) {
    return props.id === monitor.getItem().id;
  }
}

const noteTarget = {
  hover(targetProps, monitor) {
    const targetId = targetProps.id;
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    if(sourceId !== targetId) {
      targetProps.onMove({sourceId, targetId});
    }
  }
}

@DragSource(ItemTypes.NOTE, noteSource, (connect,monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging() // map isDragging() state to isDragging prop
}))
@DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
  connectDropTarget: connect.dropTarget(),
}))
class Note extends React.Component {
  render () {
    const {connectDragSource, connectDropTarget, isDragging, id, editing, onMove, ...props} = this.props;

    // Pass trough if we are editing
    const dragSource = editing ? a => a : connectDragSource;

    return dragSource(
      connectDropTarget(
        <li style={{opacity: isDragging ? 0 : 1}} {...props}>{props.children}</li>
      )
    );
  }
}

Note.propTypes = {
  id: PropTypes.string.isRequired,
  editing: PropTypes.bool,
  connectDragSource: PropTypes.func,
  connectDropTarget: PropTypes.func,
  isDragging: PropTypes.bool,
  onMove: PropTypes.func
};

Note.defaultProps = {
  onMove: () => {}
};

export default Note;
