import Link from "next/link";
import { API } from "../../config";
import moment from "moment";
import renderHTML from "react-render-html";

const Card = ({ blog }) => {
  const showCategories = (blog) =>
    blog.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
      </Link>
    ));

  const showTags = (blog) =>
    blog.tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
      </Link>
    ));

  return (
    <div className="lead">
      <header>
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <h3 className="display-7 mt-5 font-weight-bold">{blog.title}</h3>
          </a>
        </Link>
      </header>

      <section>
        <p className="mark ml-1 pt-2 pb-2">
        <span>Published By</span>

          <Link href={`/profile/${blog.postedBy.username}`}>
           <a> {blog.postedBy.name}</a>
          </Link> | Published {moment(blog.updatedAt).fromNow()}
        </p>
      </section>

      <section>
        {showCategories(blog)}
        {showTags(blog)}
      </section>

      <div className="row">
        <div className="col-md-4 mb-4 mt-2">
          <section>
            <img
              className="img img-fluid"
              style={{ maxHeight: "auto", width: "100%" }}
              src={`${API}/api/blog/photo/${blog.slug}`}
              alt={blog.title}
            />
          </section>
        </div>
        <div className="col-md-8">
          <section>
            <div className="pb-3">{renderHTML(blog.excerpt)}</div>
            <Link href={`/blogs/${blog.slug}`}>
              <a className="btn btn-primary pt-2">Read more</a>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Card;
