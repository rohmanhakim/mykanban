import Uuid from 'node-uuid';
import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';

class NoteStore {
  constructor() {
      this.bindActions(NoteActions);
      this.notes = [];
  }
  create(note){
    const notes = this.notes;
    note.id = Uuid.v4();
    this.setState({
      notes: notes.concat(note)
    });
  }
  update(updateNote){
    const notes = this.notes.map(note => {
      if(note.id === updateNote.id){
        // Object.assign is used to patch the note data here. It
        // mutates target (first parameter). in order to avoid that,
        // I use {} asits target and apply data on it.
        //
        // Example: {}, {a: 5, b: 3}, {a: 17} -> {a: 17, b: 3}
        //
        // You can pass as many objects to the method as you want.
        return Object.assign({}, note, updateNote);
      }
      return note;
    });
    // This is same as `this.setState({notes: notes})`
    this.setState({notes});
  }
  delete(id){
    this.setState({
      notes: this.notes.filter(note => note.id !== id)
    });
  }
}

export default alt.createStore(NoteStore,'NoteStore');
