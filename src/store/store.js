import { createStore } from "redux";
import reducers from "../reducers/usersReducers";

const saveState = (state) =>{
    localStorage.setItem('reduxState', JSON.stringify(state));
  }

  const loadState = () =>{
    try{
      const state = localStorage.getItem('reduxState');
      
  
      if(state !== null){
          return JSON.parse(state);
          
      }        
  } catch(e){
      // ignore errors
  }
  return {
    idUser:"",
    loggedIn:false
  };
}


export const store = createStore(reducers, loadState(), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => {
    saveState(store.getState());
  });
  
