import { useCallback, useReducer, useRef } from "react";

interface Todos {
    id: number,
    text: string,
    completed?: boolean
}
type ActionType = { type: "ADD", text: string } | { type: "REMOVE", id: number }

// function removeSpaces(string: string) {
//     return string.replace(/^\s+/, "").replace(/\s+$/, "").replace(/\s+/g, " ");
// }
const removeSpaces = (string: string) => string.replace(/^\s+/, "").replace(/\s+$/, "").replace(/\s+/g, " ");
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
    // const addToList = () => {
    //     if (newTodoRef.current?.value) {
    //         dispatch({ type: "ADD", text: newTodoRef.current.value })
    //         newTodoRef.current.value = "";
    //     }
    // }
    // const removeFromList = (id: number) => {
    //     console.log(id);
    //     dispatch({ type: "REMOVE", id })
    // }
    const addToList = useCallback(() => {
        const text = newTodoRef.current?.value
        if (text) {
            const newText = removeSpaces(text);
            dispatch({ type: "ADD", text: newText })
            newTodoRef.current.value = "";
        }
        
        // if (newTodoRef.current?.value && newTodoRef.current?.value !== " ") {
        //     dispatch({ type: "ADD", text: newTodoRef.current.value })
        //     newTodoRef.current.value = "";
        // }
    }, [])
    // const removeFromList = useCallback((id: number) => {
    //     dispatch({ type: "REMOVE", id })
    // }, [])




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
                        }}> {todo.text.toUpperCase()} </span>
                        {/* <button onClick={() => removeFromList(todo.id)}>remove </button> */}
                        <button onClick={
                            () => dispatch({ type: "REMOVE", id: todo.id })
                        }>remove </button>
                    </div>
                ))
            }
            {/* <Lists /> */}
        </div>
    );
}
