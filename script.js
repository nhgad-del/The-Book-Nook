
const books = [
    {
        id: 1,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
        description: "A quiet hobbit is swept into an unforgettable adventure.",
        symbol: "✦"
    },
    {
        id: 2,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        genre: "Romance",
        description: "Love, first impressions, and the art of understanding people.",
        symbol: "♡"
    },
    {
        id: 3,
        title: "The Silent Patient",
        author: "Alex Michaelides",
        genre: "Mystery",
        description: "A shocking crime and a patient who refuses to speak.",
        symbol: "?"
    },
    {
        id: 4,
        title: "Little Women",
        author: "Louisa May Alcott",
        genre: "Fiction",
        description: "Four sisters grow up, dream big, and find their own paths.",
        symbol: "❀"
    },
    {
        id: 5,
        title: "A Court of Thorns and Roses",
        author: "Sarah J. Maas",
        genre: "Fantasy",
        description: "A dangerous magical world filled with secrets and romance.",
        symbol: "✧"
    },
    {
        id: 6,
        title: "The Love Hypothesis",
        author: "Ali Hazelwood",
        genre: "Romance",
        description: "A fake relationship turns into something unexpected.",
        symbol: "♡"
    }
];

let favorites = [];

const bookGrid = document.getElementById("book-grid");
const favoritesGrid = document.getElementById("favorites-grid");
const searchInput = document.getElementById("search");
const genreFilter = document.getElementById("genre-filter");
const resultCount = document.getElementById("result-count");
const favoriteCount = document.getElementById("favorite-count");
const favoritesMessage = document.getElementById("favorites-message");

function createBookCard(book) {
    const isFavorite = favorites.includes(book.id);

    return `
        <article class="book-card">
            <div class="book-cover cover-${book.genre.toLowerCase()}">
                <span class="cover-symbol">${book.symbol}</span>
                <h3 class="cover-title">${book.title}</h3>
            </div>

            <div class="book-info">
                <p class="genre-label">${book.genre}</p>
                <h3>${book.title}</h3>
                <p class="author">by ${book.author}</p>
                <p class="book-description">${book.description}</p>

                <button
                    class="favorite-button ${isFavorite ? "is-favorite" : ""}"
                    data-book-id="${book.id}"
                    aria-pressed="${isFavorite}">
                    ${isFavorite ? "♥ Saved to favorites" : "♡ Add to favorites"}
                </button>
            </div>
        </article>
    `;
}

function displayBooks(bookList, container) {
    if (bookList.length === 0) {
        container.innerHTML = "<p>No books found. Try another search!</p>";
        return;
    }

    container.innerHTML = bookList.map(createBookCard).join("");
}

function filterBooks() {
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedGenre = genreFilter.value;

    const filteredBooks = books.filter(function(book) {
        const matchesSearch =
            book.title.toLowerCase().includes(searchText) ||
            book.author.toLowerCase().includes(searchText);

        const matchesGenre =
            selectedGenre === "All" || book.genre === selectedGenre;

        return matchesSearch && matchesGenre;
    });

    displayBooks(filteredBooks, bookGrid);
    resultCount.textContent = `${filteredBooks.length} book(s) found`;
}

function updateFavorites() {
    const favoriteBooks = books.filter(function(book) {
        return favorites.includes(book.id);
    });

    favoriteCount.textContent = favorites.length;

    favoritesMessage.textContent = favorites.length === 0
        ? "Tap the heart on any book to save it here."
        : `You have saved ${favorites.length} book(s).`;

    displayBooks(favoriteBooks, favoritesGrid);
}

function handleFavoriteClick(event) {
    const button = event.target.closest(".favorite-button");

    if (!button) {
        return;
    }

    const bookId = Number(button.dataset.bookId);

    if (favorites.includes(bookId)) {
        favorites = favorites.filter(function(id) {
            return id !== bookId;
        });
    } else {
        favorites.push(bookId);
    }

    filterBooks();
    updateFavorites();
}

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", function() {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );
});

navLinks.addEventListener("click", function(event) {
    if (event.target.tagName === "A") {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
    }
});

searchInput.addEventListener("input", filterBooks);
genreFilter.addEventListener("change", filterBooks);

bookGrid.addEventListener("click", handleFavoriteClick);
favoritesGrid.addEventListener("click", handleFavoriteClick);

filterBooks();
updateFavorites();