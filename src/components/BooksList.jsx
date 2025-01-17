import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks, deleteBook } from '../features/BookSlice';
import {Trash, Pencil, Plus} from 'lucide-react';
import {useNavigate} from 'react-router-dom';

function BooksList() {
  const { Books, status } = useSelector((state) => state.Books);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'idle') { 
      dispatch(fetchBooks());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error fetching books!</div>;
  }

  const removeBook = (id) => {
    dispatch(deleteBook(id))
  }

  const updateBook  = (id) => {
    navigate(`/AddEditForm/:${id}`);
  }

  return (
    <div>
     <div className='m-3 p-2 d-flex justify-content-between'>
        <h1>Books List</h1>
        <button className='btn btn-primary' onClick={() =>navigate('/AddEditForm')}><Plus/> Add book</button>
     </div>
      <table className='table table-striped '>
        <thead>
            <tr>
                <th>id Book</th>
                <th>Title</th>
                <th>Author</th>
                <th>Description</th>
                <th>Image</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {Array.isArray(Books) && Books.length > 0 ? (
                Books.map((book) => (
                    <tr key={book.id}>
                        <td>{book.id}</td>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.description.slice(0,30)}</td>
                        <td><img src={book.image} alt="not found" width={100}/></td>
                        <td>
                            <Pencil onClick={() => updateBook(book.id)} size={16} color='green' className='mx-2'/>
                            <Trash onClick={() => removeBook(book.id) } size={16} color='red'/>
                        </td>
                    </tr>
                ))
                ) : (
                <li>No books available</li>
            )}
        </tbody>
      </table>
     
    </div>
  );
}

export default BooksList;
