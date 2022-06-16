import booksDatabase from "../../database/books/BooksDatabase.js";

const detailBookService = (request, response) => {
    const books = booksDatabase;

    const book = books.filter((result) => result.id === request.params.bookId)[0];
    if (book === undefined) {
        return response
            .response({
                status: "fail",
                message: "Buku tidak ditemukan",
            })
            .code(404);
    }

    return response
        .response({
            status: "success",
            data: {
                book,
            },
        })
        .code(200);
};

export default detailBookService;