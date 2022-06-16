import { nanoid } from "nanoid";
import booksDatabase from "../../database/books/BooksDatabase.js";
import addOrEditValidator from "../../validator/books/AddOrEditBooksValidator.js";

const addBookService = (request, response) => {
    const books = booksDatabase;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    const responseValidate = addOrEditValidator(name, readPage, pageCount, response, false);
    if (responseValidate !== undefined && responseValidate.source.status === "fail") {
        return response.response(responseValidate.source).code(responseValidate.statusCode);
    }

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        finished,
        insertedAt,
        updatedAt,
    };

    books.push(newBook);

    if (books.filter((book) => book.id === id).length > 0) {
        return response
            .response({
                status: "success",
                message: "Buku berhasil ditambahkan",
                data: {
                    bookId: id,
                },
            })
            .code(201);
    }

    return response
        .response({
            status: "error",
            message: "Buku gagal ditambahkan",
        })
        .code(500);
};

export default addBookService;