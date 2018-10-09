// Book Constructor
function Book(title, author, isbn) {
   this.title = title
   this.author = author
   this.isbn = isbn
}

// UI Constructor

function UI() {}

// ADD BOOK TO LIST method
UI.prototype.addBookToList = function(book) {
   const list = document.getElementById('book-list')

   // CREATE A TR element
   const row = document.createElement('tr')
   
   // INSERT DATA
   row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
   `
   list.appendChild(row)
}
// DELETE BOOK
UI.prototype.deleteBook = function(target) {
   if(target.className === 'delete') {
      target.parentElement.parentElement.remove()
   }
}
// CLEAR FIELDS method
UI.prototype.clearFields = function() {
   title.value = ''
   author.value = ''
   isbn.value = ''
}

// SHOW ERROR method
UI.prototype.showAlert = function(msg, className) {
   // CREATE A DIV
   const div = document.createElement('div')

   // ADD CLASS TO DIV
   div.className = `alert ${className}`

   // ADD TEXT TO DIV
   div.appendChild(document.createTextNode(msg))

   //GET PARENT ELEMENT TO INSERT MESSAGE
   const container = document.querySelector('.container')

   // GET ELEMENT THAT WE WANT TO INSERT THE MESSAGE BEFORE
   const form = document.getElementById('book-form')

   // INSERT BEFORE TAKES IN 2 ARGUMENTS(INSERT THIS, BEFORE THIS)
   container.insertBefore(div, form)
   
   // TIMEOUT after 3 seconds remove the alert
   setTimeout(function() {
      document.querySelector('.alert').remove()
   }, 3 * 1000)
}

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
   ui.showAlert('Book Removed!', 'success')
   e.preventDefault()
})