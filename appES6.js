// Some of this code has been copied from app.js.  The notes were not retyped. 
class Book {
   constructor(title, author, isbn) {
      this.title = title
      this. author = author
      this.isbn = isbn
   }
}

class UI {
   addBookToList(book) {
      const list = document.getElementById('book-list')
      const row = document.createElement('tr')
      row.innerHTML = `
         <td>${book.title}</td>
         <td>${book.author}</td>
         <td>${book.isbn}</td>
         <td><a href="#" class="delete">X</a></td>
      `
      list.appendChild(row)
   }
   
   showAlert(msg, className){
      const div = document.createElement('div')
      div.className = `alert ${className}`
      div.appendChild(document.createTextNode(msg))
      const container = document.querySelector('.container')
      const form = document.getElementById('book-form')
      container.insertBefore(div, form)
      setTimeout(() => {
         document.querySelector('.alert').remove()
      }, 3 * 1000)
   }
   deleteBook(target){
      if(target.className === 'delete') {
         target.parentElement.parentElement.remove()
      }
   }
   clearFields() {
      title.value=''
      author.value=''
      isbn.value=''
   }
}
// LOCAL STORAGE CLASS
class Store {
   static displayBooks() {
      // Create a variable for the books
      let books = Store.getBooks()
      
      // Loop through the books array and add them to the book list
      books.forEach(book => {
         const ui = new UI
         ui.addBookToList(book)
      });
   }
   static addBook(book) {
      let books = Store.getBooks()

      books.push(book)

      localStorage.setItem('books', JSON.stringify(books))
   }
   static getBooks() {
      let books
      // Check local storage to see if there are any books stored.  If not set books equal to an empty array. 
      if(localStorage.getItem('books') === null) {
         books =[]
      }
      else {
         books = JSON.parse(localStorage.getItem('books'))
      }
      return books
   }
   static removeBook(isbn) {
      let books = Store.getBooks()

      // loop through the books array to find the isbn, once found remove it at the index. 
      books.forEach((book, index) => {
         if(book.isbn === isbn) {
            books.splice(index, 1)
         }
      })
      // Update local storage for the new book array. 
      localStorage.setItem('books', JSON.stringify(books))
   }
}

document.addEventListener('DOMContentLoaded', Store.displayBooks())
// EVENT LISTENER for add book
document.getElementById('book-form').addEventListener('submit', (e)=> {
   // Get  values from form
   const title = document.getElementById('title').value
   const author = document.getElementById('author').value
   const isbn = document.getElementById('isbn').value

   // INSTANTIATE book
   const book = new Book(title, author, isbn)

   // INSTANTIATE UI
   const ui = new UI()

   // VALIDATE 
   if(title === '' || author === '' || isbn === '') {
      // ERROR ALERT 
      ui.showAlert('Please fill in all fields', 'error')
   }
   else {
      // ADD A BOOK TO THE LIST 
      ui.addBookToList(book)

      // Add to local storage
      Store.addBook(book)

      // CLEAR THE FIELDS after submit 
      ui.clearFields()

      // SHOW ALERT for added book
      ui.showAlert('Book Added!', 'success')
   }
   e.preventDefault()
})

// EVENT LISTENER for delete
document.getElementById('book-list').addEventListener('click', (e) => {
   // INSTANTIATE UI
   const ui = new UI()

   ui.deleteBook(e.target)

   // REMOVE FROM LS:  Here we call the removeBook method. Since there is no real unique identifiers, we are going to target the parentElement, previousSibling which in the case is the td that contains the isbn number.  
   Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
   ui.showAlert('Book Removed!', 'success')
   e.preventDefault()
})