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

const displayData = books =>{
    const first20books =books.slice(0,30);
    // show total search result 
    document.getElementById('book-numbers').innerText= `Total Books: ${first20books.length}`;
    const searchContainer = document.getElementById('search-container');
    searchContainer.textContent ='';
    first20books.forEach(book =>{
           console.log(book);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML =`
            <div class="card">
            <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Title: ${book.title ? book.title: 'N/a'}</h5>
                <h5 class="card-title">Author Name: ${ book.author_name ? book.author_name[0]: 'N/a'}</h5>
                <h5 class="card-title">Publish Year: ${book.first_publish_year ? book.first_publish_year: 'N/a'}</h5>
            </div>
        </div>
            
        `;
        searchContainer.appendChild(div);
    })
}