import { Link } from "react-router-dom";

export default function NotFoundRoute() {
  return (
    <div className="page page--narrow">
      <div className="not-found glass">
        <span className="eyebrow">404</span>
        <h1 className="page-heading">TRACK NOT FOUND</h1>
        <p className="page-subheading">This route doesn't exist on STRAKD.</p>
        <Link to="/dashboard" className="btn btn-primary">
          BACK TO THE DECK
        </Link>
      </div>
    </div>
  );
}
