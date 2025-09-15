import { useEffect, useState } from 'react'

export function HorizontalExampleParent() {
  const
    [count, setCount] = useState(1);
  return <fieldset>
    <legend>Parent</legend>
    <Child count={count} op="+" action={() => setCount(prev => ++prev)}> child 1</Child>
    <Child count={2 * count} op="-" action={() => setCount(prev => --prev)} > child 2</Child>
  </fieldset>
}

function Child({ count, children, op, action }) {
  return <fieldset>
    <legend>{children}</legend>
    count = {count}
    <button onClick={action}>{op}</button>
  </fieldset>
}