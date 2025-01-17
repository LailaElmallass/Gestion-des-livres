import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:3000/Books';

export const fetchBooks = createAsyncThunk('Books/fetchBooks', async () => {
  const response = await axios.get(API);
  return response.data;
});

export const addBook = createAsyncThunk('Books/addBook', async (newBook) => {
  const response = await axios.post(API, newBook);
  return response.data;
});

export const editBook = createAsyncThunk('Books/editBook', async ({ id, book }) => {
  const response = await axios.put(`${API}/${id}`, book);
  return response.data;
});

export const deleteBook = createAsyncThunk('Books/deleteBook', async (id) => {
  await axios.delete(`${API}/${id}`);
  return id;
});

const initialState = {
  Books: [],
  status: 'idle',  
};

export const BookSlice = createSlice({
  name: 'Books',
  initialState,
  reducers: {
    addBook(state, action) {
        state.Books.push(action.payload);
      },
      editBook(state, action) {
        const UpdatedBooks = state.Books.map((book) => book.id === action.payload.id ? action.payload : book);
        state.Books = UpdatedBooks;
      },
      deleteBook(state, action) {
        state.Books = state.Books.filter((book) => book.id !== action.payload);
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.Books = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchBooks.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.Books.push(action.payload); 
      })
      .addCase(editBook.fulfilled, (state, action) => {
        state.Books = state.Books.map((book) =>
          book.id === action.payload.id ? action.payload : book
        );
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.Books = state.Books.filter((book) => book.id !== action.payload);
      });
  },
});

export default BookSlice.reducer;
