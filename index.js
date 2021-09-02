const loadData = () => {
    const inputField = document.getElementById('input-field');
    const inputFieldText = inputField.value ;
    // clearing the input field
    inputField.value = '';
    // generated the url 
    const url =`https://openlibrary.org/search.json?q=${inputFieldText}`;
    fetch(url)
    .then(res => res.json())
        .then(data => displayData(data));
};

// showing errors
const displayError = () => {
    document.getElementById('error-msg').innerText = 'No result found';
    document.getElementById('book-numbers').style.display = 'none';
}

// displaying the search results
const displayData = data =>{
    const books = data.docs;
    // how many books will be showed in the UI
    const first30books =books.slice(0,30);
    // show total search result 
    document.getElementById('book-numbers').innerText = `Total Books: ${data.numFound}`;
    const searchContainer = document.getElementById('search-container');
    searchContainer.textContent ='';

    // error checking
    if (first30books.indexOf(first30books.length)=== -1){
        displayError();
    }
        first30books.forEach(book => {
            
            //clearing the error field
            document.getElementById('book-numbers').style.display = 'block';
            document.getElementById('error-msg').innerText = '';
            

            // generated the image url
            const bookImage = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
            // creating a div for each results
            const div = document.createElement('div');
            div.classList.add('col');
            // setting the innerhtml of each div
            div.innerHTML = `
            <div class="card">
            <img src="${bookImage ? bookImage : 'No image found'}" class="card-img-top" width="200px" height="400px" alt="...">
            <div class="card-body">
                <h5 class="card-title">Title: ${book.title ? book.title : 'N/a'}</h5>
                <h5 class="card-title">Author Name: ${book.author_name ? book.author_name[0] : 'N/a'}</h5>
                <h5 class="card-title">Publish Year: ${book.first_publish_year ? book.first_publish_year : 'N/a'}</h5>
                <h5 class="card-title">Publisher Name: ${book.publisher ? book.publisher[0] : 'No publisher found'}</h5>
            </div>
        </div>
        `;
            searchContainer.appendChild(div);
        });
    
    };

       
