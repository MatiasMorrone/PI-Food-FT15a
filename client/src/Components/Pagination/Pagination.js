import { Link } from "react-router-dom";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className="pagination">
        {pageNumbers.map((number, idx) => (
          <Link
            className="paginationlink"
            key={idx}
            onClick={() => paginate(number)}
          >
            <div className="numeropaginado">
              <p className="numeropaginado"> {number}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
