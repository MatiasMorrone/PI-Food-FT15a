import { Link } from "react-router-dom";
import "./Pagination.css";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className="pagination container">
        {pageNumbers.map((number, idx) => (
          <Link
            className="pagination__link"
            key={idx}
            onClick={() => paginate(number)}
          >
            <div>
              <p> {number}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
