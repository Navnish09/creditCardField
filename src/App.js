import { useCallback, useState } from 'react';
import Card from './component/Card/Card';
import List from './component/List/List';

import classes from "./App.module.scss";

const App = () => {
  const [listItems, setListItems] = useState([]);

  // Set new item to list
  const setItems = useCallback((value) => {
    setListItems(p => [...p, value]);
  }, [])

  // Delete list itme
  const deleteListItem = useCallback((value) => {
    setListItems(p => [...p.filter(item => item !== value)]);
  }, [])


  const handleSubmit = (cardValue) => {
    setItems(cardValue);
  }

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <Card
          requiredLength={16}
          valueLimit={4}
          blockCount={4}
          onSubmit={handleSubmit}
        />

        {
          listItems.length > 0 &&
          <List items={listItems} onItemDelete={deleteListItem} />
        }
      </div>
    </div>
  )
}


export default App;