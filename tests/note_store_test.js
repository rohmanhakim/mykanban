import assert from 'assert'
import NoteActions from 'app/actions/NoteActions'
import NoteStore from 'app/stores/NoteStore'
import alt from 'app/libs/alt'

describe('NoteStore', () => {
  it('create notes', () => {
    const task = 'test';
    NoteActions.create({task});
    const state = NoteStore.getState();
    assert.equal(state.notes.length,1);
    assert.equal(state.notes[0].task,task);
  });
});
