import { useReducer, useRef } from "react";

interface Todos {
    id: number,
    text: string,
    completed?: boolean
}
type ActionType = { type: "ADD", text: string } | { type: "REMOVE", id: number }

export default function App() {
    function reducer(state: Todos[], action: ActionType) {
        switch (action.type) {
            case "ADD":
                return [...state, { id: state.length + 1, text: action.text, completed: false }];
            case "REMOVE":
                return state.filter(todo => todo.id !== action.id);
            default:
                return state;
        }
    }
    const [todos, dispatch] = useReducer(reducer, [])
    const newTodoRef = useRef<HTMLInputElement>(null);
    const addToList = () => {
        if (newTodoRef.current?.value) {
            dispatch({ type: "ADD", text: newTodoRef.current.value })
            newTodoRef.current.value = "";
        }
    }
    const removeFromList = (id: number) => {
        console.log(id);
        dispatch({ type: "REMOVE", id })
    }



    return (
        <div>
            <h1>Thi is a TypeScript App</h1>
            <input type="text" ref={newTodoRef} placeholder="Add to list..." />
            <button onClick={addToList}>Add</button>
            {
                todos.map((todo) => (
                    <div key={todo.id}
                        style={{
                            marginTop: "10px",
                        }}
                    >
                        <span style={{
                            color: 'red',
                            marginRight: '10px',
                        }}> {todo.text}</span>
                        <button onClick={() => removeFromList(todo.id)}>remove </button>
                    </div>
                ))
            }
            {/* <Lists /> */}
        </div>
    );
}
