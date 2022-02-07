import React from "react";

const Pagination = ({ recipesPerPage, allRecipes, paginado }) => {
  const pageNumbers = [];
  for (let i = 0; i < Math.ceil(allRecipes / recipesPerPage); i++)
    pageNumbers.push(i + 1);

  return (
    <nav>
      <ul>
        {pageNumbers &&
          pageNumbers.map((num) => (
            <li key={num}>
              <button onClick={() => paginado(num)}>{num}</button>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Pagination;
