const getPagination = (limit, page, totalRecords) => {
  const totalPages = Math.ceil(totalRecords/limit)
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)
  const currentPage = page < 1 ? 1 : page > totalPages ? totalPages : page
  const nextPage = currentPage + 1 > totalPages ? totalPages : currentPage + 1
  const previousPage = currentPage - 1 < 1 ? 1 : currentPage - 1

  return {
    totalPages,
    pages,
    currentPage,
    nextPage,
    previousPage
  }
}

export default getPagination