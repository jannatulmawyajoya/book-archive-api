const loadData = () => {

    const inputField = document.getElementById('input-field');
    const inputFieldText = inputField.value ;
    // clearing the input field
    inputField.value = '';
    // generated the url 
    const url =`http://openlibrary.org/search.json?q=${inputFieldText}`;
    fetch(url)
    .then(res => res.json())
        .then(data => displayData(data.docs));
};

const displayError = () => {
    document.getElementById('error-msg').innerText = 'No result found';
    document.getElementById('book-numbers').style.display = 'none';
}

const displayData = books =>{
    
    const first30books =books.slice(0,30);
    // show total search result 
    document.getElementById('book-numbers').innerText= `Total Books: ${first30books.length}`;
    const searchContainer = document.getElementById('search-container');
    searchContainer.textContent ='';

    if (first30books.indexOf(first30books.length)=== -1){
        displayError();
        
    }
        first30books.forEach(book => {
            document.getElementById('book-numbers').style.display = 'block';
            document.getElementById('error-msg').innerText = '';
            console.log(book);
            const bookImage = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
            const div = document.createElement('div');
            div.classList.add('col');
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
        })
    
    };

       
