import { nanoid } from "nanoid";
import books from "./books.js";

const addBookHandler = (request, response) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

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

    const responseValidate = validateAddOrEdit(name, readPage, pageCount, response);

    if (responseValidate !== undefined && responseValidate.source.status === "fail") {
        return response.response(responseValidate.source).code(responseValidate.statusCode);
    }

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

const getAllBooksHandler = (_, response) => {
    response.response().code(200);

    if (books === undefined) {
        return response.response({
            status: "success",
            data: {
                books: [],
            },
        });
    }

    return {
        status: "success",
        data: {
            books: books.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            })),
        },
    };
};

const getBookByIdHandler = (request, response) => {
    const { bookId } = request.params;

    const book = books.filter((result) => result.id === bookId)[0];

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

const editBookByIdHandler = (request, response) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    const responseValidate = validateAddOrEdit(name, readPage, pageCount, response);

    if (responseValidate !== undefined && responseValidate.source.status === "fail") {
        return response.response(responseValidate.source).code(responseValidate.statusCode);
    }

    const { bookId } = request.params;

    const index = books.findIndex((res) => res.id === bookId);

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

const deleteBookByIdHandler = (request, response) => {
    const { bookId } = request.params;

    const index = books.findIndex((res) => res.id === bookId);

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
        .code(400);
};

function validateAddOrEdit(name, readPage, pageCount, response) {
    if (name === null || name === "") {
        return response
            .response({
                status: "fail",
                message: "Gagal menambahkan buku. Mohon isi nama buku",
            })
            .code(400);
    }

    if (readPage > pageCount) {
        return response
            .response({
                status: "fail",
                message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
            })
            .code(400);
    }
}

export { addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler };