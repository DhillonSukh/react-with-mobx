import React, { useState } from "react";
import { useLocalStore, useObserver } from "mobx-react";
import GroceryHeader from './GroceryHeader';

export const StoreContext = React.createContext();

const StoreProvider = ({children}) =>{
  const store = useLocalStore(() => ({
    gorceryItems: [],
    addItem : (item) =>{
      store.gorceryItems.push(item);
    },
    get itemCount() {
      return store.gorceryItems.length;
    }
  }))

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}


const GorceryList = () => {
  const store = React.useContext(StoreContext);
  return useObserver(() => (<ul>
    {store.gorceryItems.map((itm) => <li>{itm}</li>)}
  </ul>));
}

const GroceryForm = () =>{
  const [name,setName] = useState("");
  const store = React.useContext(StoreContext);
  return(  <div>
    <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
    <button onClick={(e) => {store.addItem(name);setName("")} }>Add</button>
  </div>    
  )
}

export default function App() {
  return (
    <StoreProvider>
      <main>
        <GroceryHeader/>
        <GorceryList/>
        <GroceryForm/>
      </main>
    </StoreProvider>
  );
}