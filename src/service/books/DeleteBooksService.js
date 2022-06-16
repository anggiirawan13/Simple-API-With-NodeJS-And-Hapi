import booksDatabase from "../../database/books/BooksDatabase.js";

const deleteBookService = (request, response) => {
    const books = booksDatabase;

    const index = books.findIndex((res) => res.id === request.params.bookId);
    if (index !== -1) {
        books.splice(index, 1);

        return response
            .response({
                status: "success",
                message: "Buku berhasil dihapus",
            })
            .code(200);
    }

    return response
        .response({
            status: "fail",
            message: "Buku gagal dihapus. Id tidak ditemukan",
        })
        .code(404);
};

export default deleteBookService;