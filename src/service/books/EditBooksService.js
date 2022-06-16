import booksDatabase from "../../database/books/BooksDatabase.js";
import addOrEditValidator from "../../validator/books/AddOrEditBooksValidator.js";

const editBookService = (request, response) => {
    const books = booksDatabase;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    const responseValidate = addOrEditValidator(name, readPage, pageCount, response, true);
    if (responseValidate !== undefined && responseValidate.source.status === "fail") {
        return response.response(responseValidate.source).code(responseValidate.statusCode);
    }

    const index = books.findIndex((res) => res.id === request.params.bookId);
    if (index !== -1) {
        const updatedAt = new Date().toISOString();

        books[index] = {
            ...books[index],
            updatedAt,
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
        };

        return response
            .response({
                status: "success",
                message: "Buku berhasil diperbarui",
            })
            .code(200);
    }

    return response
        .response({
            status: "fail",
            message: "Gagal memperbarui buku. Id tidak ditemukan",
        })
        .code(404);
};

export default editBookService;