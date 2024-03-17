import { combineReducers, legacy_createStore } from "redux";
const INCREMENT = "INCREMENT";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "./App.css"

const ADD = "ADD";
const UPDATE = "UPDATE";
const DELETE = "DELETE";

const todoreducer = (state = [], { type, payload }) => {
  switch (type) {
    case ADD: {
      return [...state, payload];
    }

    case DELETE:{
      let filterData = state.filter((ele)=>{
        if(ele.id != payload){
          return ele;
        }
      })
      return filterData;
    }

    case UPDATE:{
      let updatedData = state.map((ele)=>{
        if(ele.id == payload){
          ele.status = !ele.status;
          return ele;
        }
        else{
          return ele; 
        }
      })
      return updatedData;
    }
    default: {
      return state;
    }
  }
};
const allreducer = combineReducers({
  todoreducer,
});
export const store = legacy_createStore(allreducer);

function App() {
  const [title, setTitle] = useState("");

  const mapStateToProps = useSelector((store) => {
    return store.todoreducer;
  });


  function handleChange(value) {
    setTitle(value);
  }
  const dispatch = useDispatch();

  function handleAdd(title) {
    dispatch({
      type: ADD,
      payload: { title: title, status: false, id: Math.random() + Date.now() },
    });
    setTitle("")
  }

  function handleDelete(id){
    dispatch({type:DELETE,payload:id})
  }

  function handleUpadte(id){
    dispatch({type:UPDATE,payload:id})
  }

  return (
    <>
      <input
        type="text"
        value={title}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      />
      <button
        onClick={() => {
          handleAdd(title);
        }}
      >
        Add
      </button>

      <div>
        {mapStateToProps.length > 0 &&
          mapStateToProps.map((ele, index) => {
            return (
              <div key={index} className="seperate">
                <h3>{ele.title}</h3>
                <h4>{ele.status?"Completed":"pending"}</h4>
                <button onClick={()=>{handleUpadte(ele.id)}}>Update Status</button>
                <button style={{marginLeft:"20px"}} onClick={()=>{handleDelete(ele.id)}}>Delete</button>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default App;
