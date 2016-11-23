/* @flow */
import React, { PropTypes } from 'react'
import {DragSource,DropTarget} from 'react-dnd'
import ItemTypes from '../constants/itemTypes'

type Props = {
  id: string,
  editing?: boolean,
  connectDragSource: (Object) => Object,
  connectDropTarget: (Object) => Object,
  isDragging?: boolean,
  onMove: (Object) => void
};

type Monitor = {
  getItem: () => Props,
  isDragging: () => boolean
};

type Connect = {
  dragSource: () => void,
  dropTarget: () => void
}

const noteSource: Object = {
  beginDrag(props: Props) {
    return {
      id: props.id
    };
  },
  isDragging(props: Props, monitor: Monitor) {
    return props.id === monitor.getItem().id;
  }
}

const noteTarget: Object = {
  hover(targetProps: Props, monitor: Monitor) {
    const targetId: string = targetProps.id;
    const sourceProps: Props = monitor.getItem();
    const sourceId: string = sourceProps.id;

    if(sourceId !== targetId) {
      targetProps.onMove({sourceId, targetId});
    }
  }
}

class Note extends React.Component {
  props: {
    id: string,
    editing?: boolean,
    connectDragSource: (Object)=>Object,
    connectDropTarget: (Object)=>Object,
    isDragging?: boolean,
    onMove?: Function,
    children?: Object
  };
  opacity: number;
  static defaultProps: {
    onMove: () => {}
  };
  render () : Object {
    const {connectDragSource, connectDropTarget, isDragging, id, editing, onMove, ...props} = this.props;

    // Pass trough if we are editing
    const dragSource = editing ? (a:Object) => a : connectDragSource;

    return dragSource(
      connectDropTarget(<li style={{opacity: isDragging ? 0 : 1}} {...props}>{props.children}</li>)
    );
  }
}

export default DragSource(ItemTypes.NOTE, noteSource, (connect: Connect,monitor: Monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(
  DropTarget(ItemTypes.NOTE, noteTarget, (connect: Connect) => ({
    connectDropTarget: connect.dropTarget()
  }))
  (Note)
);
