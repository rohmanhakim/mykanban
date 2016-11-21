import React, { PropTypes } from 'react'
import Editable from './Editable'
import Note from './Note'
import LaneActions from '../actions/LaneActions'

const Notes = ({notes, onValueClick, onEdit, onDelete}) => {
  return(
    <ul className="notes">
      {notes.map(note =>
      <Note
        className="note"
        id={note.id}
        key={note.id}
        editing={note.editing}
        onMove={LaneActions.move}>
        <Editable
          editing={note.editing}
          value={note.task}
          onValueClick={onValueClick.bind(null,note.id)}
          onEdit={onEdit.bind(null, note.id)}
          onDelete={onDelete.bind(null,note.id)}/>
      </Note>)}
    </ul>
  );
}

Notes.propTypes = {
  notes: PropTypes.array,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onValueClick: PropTypes.func
};

Notes.defaultProps = {
  notes: [],
  onEdit: () => {}
};

export default Notes;
