import React, { useCallback, useEffect, useState } from 'react';
import Card from './component/Card/Card';
import List from './component/List/List';
import ListItem from './component/ListItem/ListItem';
import DeleteIcon from './component/DeleteIcon/DeleteIcon';
import  "./App.css";

/**
 * I'm doing prop drilling in this project we can avoid it using redux.
 */

const App = () => {   
    const [listItems, setListItems] = useState([]);

    // Set new item to list
    const setItems = useCallback((value)=> {
        setListItems(p => [...p, value]);
    }, [])

    // Delete list itme
    const deleteListItem = useCallback((value) => {
      setListItems(p => [...p.filter(item=> item !== value)]);
    }, [])

    return (
        <> 
            <div className="container">
                <div className="main">
                    <Card setList={setItems} />
                    <div>
                    <List>
                        {
                            listItems.map((item, index) => (
                                <ListItem key={index}>
                                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                        <div>{item}</div>
                                        <DeleteIcon style={{cursor:'pointer'}} deleteItem={deleteListItem} item={item} />
                                    </div>
                                </ListItem>
                            ))
                        }
                    </List>
                    </div>
                </div>
            </div>
        </>
    )
}


export default App;