import { memo, useCallback, useRef, useState } from 'react';

class ToDoItem {
  id = Math.random(); //+ '_' + Date.now();
  checked = false;
  text = '-default-';

  constructor(text) {
    Object.assign(this, { text });  // this.text = text;
  }

  toggleCheck() {
    const
      clone = Object.assign(new ToDoItem, this, { checked: !this.checked });
    return clone;
  }
}


const Button = memo(function ({ onClick, children }) {
  console.log('Button render', children);
  return <button onClick={onClick}>
    {children}
  </button>
});

function Form0({ addItem }) { // управляемый input

  const
    [value, setValue] = useState('-start-'),
    ref = useRef(null),
    onClick = useCallback(() => addItem(ref.current), []);
  ref.current = value;
  console.log('Form 0 render', value);
  return <fieldset>
    <legend>Form 0</legend>
    <input value={value} onInput={event => setValue(event.currentTarget.value)} />
    <Button onClick={onClick}>➕</Button>
  </fieldset>
}

function Form1({ addItem }) { // ref
  console.log('Form 1 render');
  const
    ref = useRef(null);
  return <fieldset>
    <legend>Form 1</legend>
    <input ref={ref} />
    <Button onClick={() => addItem(ref.current.value)}>➕</Button>
  </fieldset>
}

function Form2({ addItem }) { // form
  console.log('Form 2 render');
  return <fieldset>
    <legend>Form 2</legend>
    <form onSubmit={event => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      addItem(formData.get('input-name'));
    }} >
      <input name='input-name' />
      <button type="submit">➕</button>
    </form>
  </fieldset>
}

const Form = [memo(Form0), memo(Form1), memo(Form2)][0];


export function ToDo() {
  const
    // [temp, setTemp] = useState(true),
    [list, setList] = useState([new ToDoItem('дело №1'), new ToDoItem('дело №2')]),
    addItem = useCallback(text => setList(prev => [...prev, new ToDoItem(text)]), []),
    delItem = useCallback(id => setList(prev => prev.filter(item => id !== item.id)), []),
    toggleCheck = useCallback(id => setList(prev => {

      const
        index = prev.findIndex(item => id === item.id),
        elem = prev[index];
      return prev.with(index, elem.toggleCheck());
    }), []);
  toggleCheck

  return <>
    <Form addItem={addItem} />
    <List list={list} delItem={delItem} toggleCheck={toggleCheck} />
    {/* <button onClick={() => setTemp(a => !a)}>forse updete{temp && '😏'}</button> */}
  </>
}


/**
 * 
 * @param {object} props
 * @param {ToDoItem} props.item 
 * @param {function} props.delItem 
 * @param {function} props.toggleCheck 
 * @returns {JSX.Element}
 */
function Item({ item, delItem, toggleCheck }) {
  const
    onClick = useCallback(() => delItem(item.id), [item.id]);
  console.log('Item render', item);
  return <li>
    <label>
      <input checked={item.checked} type="checkbox" onChange={() => toggleCheck(item.id)} />
      {item.text}
      <Button onClick={onClick}>❌</Button>
      {item.checked && '✔'}
    </label>
  </li >;
}

const PureItem = memo(Item);

/**
 * 
 * @param {object} props
 * @param {ToDoItem[]} props.list
 * @param {function} props.delItem 
 * @param {function} props.toggleCheck 
 * @returns {JSX.Element}
 */
function List({ list, delItem, toggleCheck }) {
  console.log('List render');
  return <fieldset>
    <legend>List</legend>
    <ol>
      {list.map(item => <PureItem key={item.id} item={item} delItem={delItem} toggleCheck={toggleCheck} />)}
    </ol>
  </fieldset>
}





