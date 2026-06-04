/**
 * ProjectSection — theme markup from index.html lines 997-1082. Editable
 * content lives in src/data/home/project.json. Hover on .project-image
 * swaps the .thumb-img on the right (wired by main.js).
 */
import data from "@/data/home/project.json";

type Project = {
  thumb: string;
  title: string;
  href: string;
};

export default function ProjectSection() {
  const projects = data.projects as Project[];

  return (
    <section className="project-section-2 section-padding fix">
      <div className="container">
        <div className="section-title text-center">
          <span className="sub-title-2">
            <img src={data.eyebrow.icon} alt="img" /> {data.eyebrow.text}
            <img src={data.eyebrow.icon} alt="img" className="ms-2" />
          </span>
          <h2 className="text-anim">
            {data.headline.split("\n").map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </h2>
        </div>
        <div className="project-wrapper-2">
          <div className="row g-4">
            <div className="col-xl-4 col-lg-5">
              <div className="project-left-item">
                {projects.map((p) => (
                  <div key={p.title} className="project-image" data-thumb={p.thumb}>
                    <img src={p.thumb} alt="img" />
                    <div className="project-content">
                      <span></span>
                      <h3>
                        <a href={p.href}>{p.title}</a>
                      </h3>
                      <div className="tag">
                        {data.tags.map((tag) => (
                          <h4 key={tag}>{tag}</h4>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-xl-8 col-lg-7">
              <div className="project-thumb-item">
                <div className="project-thumb">
                  {data.thumbnails.map((src, i) => (
                    <img
                      key={src}
                      src={src}
                      className={`thumb-img${i === 0 ? " active" : ""}`}
                      alt="img"
                    />
                  ))}
                  <h2>{data.counterLabel}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
