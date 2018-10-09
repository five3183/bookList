// Book Constructor
function Book(title, author, isbn) {
   this.title = title
   this.author = author
   this.isbn = isbn
}

// UI Constructor

function UI() {

}

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

// CLEAR FIELDS method
UI.prototype.clearFields = function() {
   title.value = ''
   author.value = ''
   isbn.value = ''
}

// EVENT LISTENERS
document.getElementById('book-form').addEventListener('submit', (e)=> {
   // Get from values
   const title = document.getElementById('title').value
   const author = document.getElementById('author').value
   const isbn = document.getElementById('isbn').value

   // INSTANTIATE book
   const book = new Book(title, author, isbn)

   // INSTANTIATE UI
   const ui = new UI()

   // ADD A BOOK TO THE LIST 
   ui.addBookToList(book)

   // CLEAR THE FIELDS after submit 
   ui.clearFields()

   e.preventDefault()
})