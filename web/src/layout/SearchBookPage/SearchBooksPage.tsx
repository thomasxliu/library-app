import React, { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { Pagination } from "../Utils/Pagination";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { SearchBook } from "./components/SearchBook";

export const SearchBooksPage = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [search, setSearch] = useState("");
  const [searchUrl, setSearchUrl] = useState("");

  const [categorySelection, setCategorySelection] = useState("Book Category");

  const[searched, setSearched] = useState(false);

  useEffect(
    () => {
      const fetchBooks = async () => {
        const baseUrl: string = "http://localhost:8080/api/books";

        let url: string = "";

        if (searchUrl === "") {
          setSearched(false);
          url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
        } else {
          setSearched(true);
          url = baseUrl + searchUrl;
        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const responseJson = await response.json();

        const responseData = responseJson._embedded.books;

        setTotalAmountOfBooks(responseJson.page.totalElements);
        setTotalPages(responseJson.page.totalPages);

        const loadedBooks: BookModel[] = [];

        for (const key in responseData) {
          loadedBooks.push({
            id: responseData[key].id,
            title: responseData[key].title,
            author: responseData[key].author,
            description: responseData[key].description,
            copies: responseData[key].copies,
            copiesAvailable: responseData[key].copiesAvailable,
            category: responseData[key].category,
            img: responseData[key].img
          });
        }

        setBooks(loadedBooks);
        setIsLoading(false);
      };
      fetchBooks().catch((error: any) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
      window.scrollTo(0, 0);
    },
    [currentPage, searchUrl]
  );

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>
          {httpError}
        </p>
      </div>
    );
  }

  const searchHandleChange = () => {
    if (search === "") {
      setSearchUrl("");
    } else {
      setSearchUrl(
        `/search/findByTitleContaining?title=${search}`
      );
      // console.log(`/search/findByTitleContaining?title=${search}&page=${currentPage - 1}&size=${booksPerPage}`)
    }
  };

  const categoryField = (value: string) => {

    const newValue: string = value.toLowerCase();

    if(newValue === 'fe' || newValue === 'be' || newValue === 'data' || newValue === 'devops'){
      setCategorySelection(value);
      setSearchUrl(`/search/findByCategory?category=${value}`);
    }
    else{
      setCategorySelection("All");
      setSearchUrl("")
    }
  }

  const indexOfLastBook: number = currentPage * booksPerPage;
  const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
  let lastItem =
    booksPerPage * currentPage <= totalAmountOfBooks
      ? booksPerPage * currentPage
      : totalAmountOfBooks;

  const paginate = (pageNumber: number) => {setCurrentPage(pageNumber); console.log(pageNumber)};

  return (
    <div>
      <div className="container">
        <div>
          <div className="row mt-5">
            <div className="col-6">
              <div className="d-flex">
                <input
                  type="search"
                  className="form-control me-2"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={e => setSearch(e.target.value)}
                />
                <button
                  className="btn btn-outline-success"
                  onClick={() => searchHandleChange()}
                >
                  Search
                </button>
              </div>
            </div>
            <div className="col-4">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {categorySelection}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li onClick={() => categoryField("All")}>
                    <a href="#" className="dropdown-item">
                      All
                    </a>
                  </li>
                  <li onClick={() => categoryField("FE")}>
                    <a href="#" className="dropdown-item">
                      Front end
                    </a>
                  </li>
                  <li onClick={() => categoryField("BE")}>
                    <a href="#" className="dropdown-item">
                      Back end
                    </a>
                  </li>
                  <li onClick={() => categoryField("Data")}>
                    <a href="#" className="dropdown-item">
                      Data
                    </a>
                  </li>
                  <li onClick={() => categoryField("DevOps")}>
                    <a href="#" className="dropdown-item">
                      DevOps
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {totalAmountOfBooks > 0 ? 
          <>
            <div className="mt-3">
            <h5>
              Number of results: ({totalAmountOfBooks})
            </h5>
          </div>
          {!searched && <p>
            {indexOfFirstBook + 1} to {lastItem} of {totalAmountOfBooks} items:
          </p>}
          {books.map(book => <SearchBook book={book} key={book.id} />)}
          {totalPages > 1 &&
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
            />}
          </> : 
          <div className="m-5">
            <h3>
              Can't find what you are looking for?
            </h3>
            <a href="#" type="button" className="btn main-color btn-md px-4 me-md-2 fw-bold text-white">
              Library Services
            </a>
          </div>
          }
          
        </div>
      </div>
    </div>
  );
};
