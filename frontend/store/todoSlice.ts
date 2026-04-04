import api from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Todo } from "@/types/todo";

export const fetchTodos = createAsyncThunk ('todos/fetchAll' , async () => {
    const res = await api.get('/todos')
    return res.data;
});

export const createTodo = createAsyncThunk ('todos/create' , async (todo:string) => {
    const res = await api.post('/todos' , {todo})
    return res.data;
});

export const updateTodo = createAsyncThunk ('todos/update' , async ({id,data}:{id:string; data: Partial<Todo>})=> {
    const res = await api.put(`/todos/${id}`, data);
    return res.data;
})

export const deleteTodo = createAsyncThunk ('todos/delete',async(id:string)=>{
    await api.delete(`/todos/${id}`);
    return id;
})

/*================================================
Slice 
================================================*/
interface TodoState {
    todos : Todo[];
    loading : boolean;
    error : string | null;
}

const initialState: TodoState = {
    todos : [],
    loading : false,
    error : null,
};

const todoSlice = createSlice({
    name : 'todos',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder 
            //get
            .addCase(fetchTodos.pending, (state) => {state.loading = true;})
            .addCase(fetchTodos.fulfilled, (state,action) => {
                state.loading = false;
                state.todos = action.payload;
            })
            //post
            .addCase(createTodo.fulfilled, (state,action) => {
                state.todos.unshift(action.payload);
            })
            //put
            .addCase(updateTodo.fulfilled, (state,action)=> {
                const index = state.todos.findIndex(t => t.id === action.payload.id);
                if(index !== -1) {
                    state.todos[index] = action.payload;
                }
            })
            //delete
            .addCase(deleteTodo.fulfilled, (state,action)=> {
                state.todos = state.todos.filter(t=>t.id !== action.payload);
            }
            )
    }
})

export default todoSlice.reducer;