import React, { Component } from "react";

export default class Newsitems extends Component {
  render() {
    let { imageurl, title, description, newsurl, author, date, source } =
      this.props;
    return (
      <div className=" container my-3">
        <div className="card">
          <span
            className="position-absolute top-0  translate-middle badge rounded-pill bg-danger"
            style={{ left: "90%", zIndex: "1" }}
          >
            {source}
          </span>
          {/* here conduititonal operator is used because some items may be null in api */}
          <img
            src={
              !imageurl
                ? "https://www.opindia.com/wp-content/uploads/2023/08/british-museum.jpg"
                : imageurl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-danger ">
                By {!author ? "unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsurl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
