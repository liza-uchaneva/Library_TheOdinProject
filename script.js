const myLibrary = [];
const coverStyles = [
  ["#D11F2F", "#ba0716"], // red
  ["#4B6587", "#34495E"], // steel blue
  ["#27AE60", "#1E8449"], // green
  ["#E67E22", "#BA4A00"], // orange
  ["#B03A2E", "#78281F"],   // crimson / dark maroon
  ["#1F618D", "#154360"],   // ocean blue / navy
  ["#117864", "#0B5345"],   // teal green / forest
  ["#873600", "#641E16"],   // burnt orange / oxblood
  ["#6C3483", "#4A235A"],   // deep violet / plum
  ["#2874A6", "#1B4F72"],   // sky blue / navy steel
  ["#145A32", "#0B3C25"],   // emerald / deep green
  ["#512E5F", "#2C1B37"],   // mulberry / midnight purple
  ["#2C3E50", "#1A252F"],   // dark slate / blackened blue
  ["#5D6D7E", "#2E4053"],   // storm gray / navy
  ["#283747", "#17202A"],   // charcoal / night blue
  ["#922B21", "#641E16"],   // redwood / oxblood
];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  const [newSpineColor, newEdgeColor] = coverStyles[Math.floor(Math.random() * coverStyles.length)];
  this.spineColor = newSpineColor;
  this.edgeColor = newEdgeColor;

  this.info = () => {
    const status = this.read ? "already read" : "not read yet";
    return `${this.title} by ${this.author}, ${this.pages} pages — ${status}.`;
  };
  this.readBook = () => {
    this.read = true;
  };
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  updateLibrary();
}

function updateLibrary() {
  const table = document.getElementById("books-table");
  table.innerHTML = '';

  myLibrary.forEach((book) => {
    const iconClass = book.read ? "fa-book-open" : "fa-book";
    const clueText = book.read ? "unread" : "read";

    const bookCard = document.createElement("div");
    bookCard.classList.add("book");
  
    bookCard.innerHTML = `
      <div>
        <div class="book-icon" style="
          background: ${book.spineColor};
          background-image: linear-gradient(to right, ${book.edgeColor} 28px, ${book.edgeColor} 30px, transparent 30px);
        ">
          <span class="book-title">${book.title}</span>
          <span class="book-author">${book.author}</span>  
        </div>
        <div class="book-card-btns">
          <p>Pages:</strong> ${book.pages}</p>
          <button class="read" data-book-id="${book.id}" aria-label="Toggle Read Status">
            <i class="fa-solid ${iconClass}"></i>
            <div class="clue read-clue">${clueText}</div>
          </button>
          </button>
          <button class="delete" data-book-id="${book.id}" aria-label="Delete">
            <i class="fa-solid fa-trash"></i>
            <div class="clue">delete</div>
          </button>
        </div>
      </div>  
    `;
  
    table.appendChild(bookCard);
  });
  

  document.querySelectorAll(".read").forEach(button => {
    button.addEventListener("click", (e) => {
      const bookId = e.currentTarget.dataset.bookId;
      const book = myLibrary.find(b => b.id === bookId);
      
      if (book) {
        book.read = !book.read;
  
        const icon = e.currentTarget.querySelector("i");
        const clue = e.currentTarget.querySelector(".read-clue");

        icon.classList.toggle("fa-book", !book.read);
        icon.classList.toggle("fa-book-open", book.read);
        clue.textContent = book.read ? "unread" : "read";
      }
    });
  });

  document.querySelectorAll(".delete").forEach(button => {
    button.addEventListener("click", (e) => {
      const bookId = e.target.dataset.bookId;
      const index = myLibrary.findIndex(b => b.id === bookId);
      if (index !== -1) {
        myLibrary.splice(index, 1);
        updateLibrary();
      }
    });
  });
}

// Form & dialog logic
const dialog = document.getElementById("add-book");
const openDialogBtn = document.getElementById("add-btn");
const closeBtn = document.getElementById("close-btn");
const newBookForm = document.getElementById("new-book-form");

openDialogBtn.addEventListener("click", () => dialog.showModal());
closeBtn.addEventListener("click", () => dialog.close());

newBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const pages = parseInt(document.getElementById("pages").value);
  const read = document.getElementById("read").checked;

  if (title && author && pages) {
    addBookToLibrary(title, author, pages, read);
    newBookForm.reset();
    dialog.close();
  }
});

// Initial books
addBookToLibrary("Pride and Prejudice", "Jane Austen", 400, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 300, false);
addBookToLibrary("Alice's Adventures in Wonderland", "Lewis Carroll", 128, false);
addBookToLibrary("The Night Circus", "Erin Morgenstern", 387, true);
addBookToLibrary("Norwegian Wood", "Haruki Murakami", 296, false);
addBookToLibrary("Sapiens: A Brief History of Humankind", "Yuval Noah Harari", 498, true);
addBookToLibrary("The Martian", "Andy Weir", 369, false);
addBookToLibrary("The Book Thief", "Markus Zusak", 552, true);
addBookToLibrary("Piranesi", "Susanna Clarke", 245, false);
addBookToLibrary("Educated", "Tara Westover", 352, true);
addBookToLibrary("Dune", "Frank Herbert", 688, false);
addBookToLibrary("Eleanor Oliphant Is Completely Fine", "Gail Honeyman", 390, true);
addBookToLibrary("The Shadow of the Wind", "Carlos Ruiz Zafón", 487, false);
addBookToLibrary("A Man Called Ove", "Fredrik Backman", 337, true);
addBookToLibrary("Little Fires Everywhere", "Celeste Ng", 338, false);


