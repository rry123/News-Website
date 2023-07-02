import React from "react";

const Newsitem = (props)=> {
  
    let { title, description, imageurl, newsurl, author, date, source } = props;
    return (
      <div className="my-3">
      
        <div className="card" style={{ width: "18rem" }}>
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
               {source}
               
              </span>
          <img
            src={
              imageurl
                ? imageurl
                : "https://bsmedia.business-standard.com/_media/bs/img/article/2022-02/02/full/1643789775-3091.jpg"
            }
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">
              {title}...
              
            </h5>
            <p class="card-text">{description}...</p>
            <p class="card-text">
              <small class="text-muted">
                By {author ? author : "unknown"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsurl}
              target="_blank"
              class="btn btn-dark btn-sm"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  
}

export default Newsitem;
