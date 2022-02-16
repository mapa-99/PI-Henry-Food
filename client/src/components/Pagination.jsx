import React from "react";
import "./styles/styles.css";

const Pagination = ({ recipesPerPage, allRecipes, paginado }) => {
  const pageNumbers = [];
  for (let i = 0; i < Math.ceil(allRecipes / recipesPerPage); i++)
    pageNumbers.push(i + 1);

  return (
    <div className="pagination">
      <ul>
        {pageNumbers &&
          pageNumbers.map((num) => (
            <li key={num}>
              <button className="button-pag" onClick={() => paginado(num)}>
                {num}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Pagination;
