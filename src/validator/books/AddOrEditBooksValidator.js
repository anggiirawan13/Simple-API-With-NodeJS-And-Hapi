export default function addOrEditValidator(name, readPage, pageCount, response, isEdit) {
    const customMessage = isEdit ? "memperbarui" : "menambahkan";
    if (name === null || name === "" || name === undefined) {
        return response
            .response({
                status: "fail",
                message: `Gagal ${customMessage} buku. Mohon isi nama buku`,
            })
            .code(400);
    }

    if (readPage > pageCount) {
        return response
            .response({
                status: "fail",
                message: `Gagal ${customMessage} buku. readPage tidak boleh lebih besar dari pageCount`,
            })
            .code(400);
    }
}