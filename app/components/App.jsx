import React, { PropTypes } from 'react'
import Notes from './Notes'
import Uuid from 'node-uuid'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      notes : [
        {
          id: Uuid.v4(),
          task: 'Learn Webpack'
        },
        {
          id: Uuid.v4(),
          task: 'Learn React'
        },
        {
          id: Uuid.v4(),
          task: 'Do Laundry'
        }
      ]
    }
  }
  render () {
    return(
      <div>
        <button onClick={this.addNote}>+</button>
        <Notes  notes={this.state.notes} onEdit={this.editNote}/>
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
    this.setState(
      {
        notes: [
          ...this.state.notes,
          {
            id: Uuid.v4(),
            task: 'Wow, New Task!'
          }
        ]
      }
    );
  };
  editNote = (id,task) => {
    // Don't modify if trying set an empty value
    if(!task.trim()) {
      return;
    }

    const notes = this.state.notes.map(note => {
      if(note.id === id && task) {
        note.task = task;
      }

      return note;
    });

    this.setState({notes});
  };
}

export default App;
