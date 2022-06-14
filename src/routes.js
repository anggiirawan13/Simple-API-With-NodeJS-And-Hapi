import { addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler } from "./handler.js";

const baseURI = "/books";

const routes = [{
        method: "POST",
        path: baseURI,
        handler: addBookHandler,
    },
    {
        method: "GET",
        path: baseURI,
        handler: getAllBooksHandler,
    },
    {
        method: "GET",
        path: `${baseURI}/{bookId}`,
        handler: getBookByIdHandler,
    },
    {
        method: "PUT",
        path: `${baseURI}/{bookId}`,
        handler: editBookByIdHandler,
    },
    {
        method: "DELETE",
        path: `${baseURI}/{bookId}`,
        handler: deleteBookByIdHandler,
    },
];

export default routes;