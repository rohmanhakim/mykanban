import React, { PropTypes } from 'react'
import Notes from './Notes'
import NoteActions from '../actions/NoteActions'
import NoteStore from '../stores/NoteStore'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = NoteStore.getState();
  }
  componentDidMount() {
    NoteStore.listen(this.storeChanged);
  }
  componentWillUnmount() {
    NoteStore.unlisten(this.storeChanged);
  }
  storeChanged = (state) => {
    // Without a property initializer `this` wouldn't
    // Point at the right context because it defaults to
    // `undefined` in strict mode.
    this.setState(state);
  };
  render () {
    return(
      <div>
        <button className="add-note" onClick={this.addNote}>+</button>
        <Notes  notes={this.state.notes} onEdit={this.editNote} onDelete={this.deleteNote}/>
      </div>
    );
  }

  // We are  using an experimental feature known as property
  // Initializer here. It allows us to bind the method 'this'
  // to point at our *App* instance
  //
  // Alternatively we could `bind` at `constructor` using a line,
  // such as this.addNote = this.addNote.bind(this);
  addNote = () => {
    // It would be possible to write this in an imperative style.
    // I.e., through `this.state.notes.push` and then
    // `this.setState({notes: this.state.notes})` to commit.
    //
    // I tend to favor functional style whenever that makes sense.
    // Even though it might take more code sometimes, I feel
    // the benefits (easy to reason about, no side effects)
    // more than make up for it.
    // Libraries, such as Immutable.js, go a notch further.
    NoteActions.create({task: 'New task'});
  };
  editNote = (id,task) => {
    // Don't modify if trying set an empty value
    if(!task.trim()) {
      return;
    }

    NoteActions.update({id,task});
  };
  deleteNote = (id,e) => {
    // Avoid bubbling to edit
    e.stopPropagation();

    NoteActions.delete(id);
  };
}

export default App;
