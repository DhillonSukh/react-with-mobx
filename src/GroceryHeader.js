import { useObserver } from "mobx-react-lite";
import React  from "react";
import {StoreContext} from './App';


const GroceryHeader = () => {
    const store = React.useContext(StoreContext);
    return useObserver(() => (
        <div>
            <h1>Total Items are {store.itemCount}</h1>
        </div>
    ));
}

export default GroceryHeader;