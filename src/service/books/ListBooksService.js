import booksDatabase from "../../database/books/BooksDatabase.js";

const listBookService = (request, response) => {
    const books = booksDatabase;

    response.response().code(200);

    if (books.length === 0) {
        return response.response({
            status: "success",
            data: {
                books: [],
            },
        });
    }

    let result = books;

    const queryParams = request.query;

    if (queryParams.name !== undefined && queryParams.name !== null && queryParams.name !== "") {
        result = books.filter((book) => book.name.toLowerCase().indexOf(queryParams.name.toLowerCase()) > -1);
    }

    if (queryParams.reading !== undefined && queryParams.reading !== null) {
        const convertToBoolean = queryParams.reading === "0" ? false : true;
        result = books.filter((book) => book.reading === convertToBoolean);
    }

    if (queryParams.finished !== undefined && queryParams.finished !== null) {
        const convertToBoolean = queryParams.finished === "0" ? false : true;
        result = books.filter((book) => book.finished === convertToBoolean);
    }

    return {
        status: "success",
        data: {
            books: result.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            })),
        },
    };
};

export default listBookService;