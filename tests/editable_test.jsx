import React from 'react'
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedDOMComponentWithTag,
  Simulate
} from 'react-addons-test-utils';
import assert from 'assert';
import Editable from '../app/components/Editable'

describe('Editable', () => {

  // 1. Does it render the given value correctly?
  it('renders value', () => {
    const value = 'value';
    const component = renderIntoDocument(
      <Editable value={value} />
    );

    const valueComponent = findRenderedDOMComponentWithClass(component,'value');
    assert.equal(valueComponent.textContent,value);
  });

  // 2. Does it trigger onVlaueClick if not in edit mode?
  it('triggers onValueClick', () => {
    let triggered = false;
    const value = 'value';
    const onValueClick = () => triggered = true;
    const component = renderIntoDocument(
      <Editable value={value} onValueClick={onValueClick} />
    );

    const valueComponent = findRenderedDOMComponentWithClass(component,'value');
    Simulate.click(valueComponent);
    assert.equal(triggered, true);
  });

  // 3. Does it trigger onEdit callback on edit?
  it('triggers onEdit', () => {
    let triggered = false;
    const newValue = 'value';
    const onEdit = (val) => {
      triggered = true;
      assert.equal(val, newValue);
    };
    const component = renderIntoDocument(
      <Editable editing={true} value={'value'} onEdit={onEdit} />
    );

    const input = findRenderedDOMComponentWithTag(component,'input');
    input.value = newValue;
    Simulate.blur(input);
    assert.equal(triggered, true);
  });

  // 4. Does it trigger onDelete callback on delete?
  it('allows deletion', () => {
    let deleted = false;
    const onDelete = () => {
      deleted = true;
    };
    const component = renderIntoDocument(
      <Editable value={'value'} onDelete={onDelete} />
    );

    let deleteComponent = findRenderedDOMComponentWithClass(component,'delete');
    Simulate.click(deleteComponent);
    assert.equal(deleted, true);
  });
});
