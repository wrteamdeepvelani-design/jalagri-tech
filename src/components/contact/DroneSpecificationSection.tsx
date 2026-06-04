/**
 * DroneSpecificationSection — theme markup from contact.html lines 532-556.
 * Horizontal drag gallery at bottom of contact page. .gallery-wrapper
 * + .drag-circle drag interaction wired by main.js.
 */
import data from "@/data/contact/contact.json";

export default function DroneSpecificationSection() {
  const gallery = data.gallery;

  return (
    <div className="drone-specification-section section-padding fix">
      <div className="gallery-wrapper mt-0">
        <div className="gallery-track">
          {gallery.images.map((src) => (
            <div key={src} className="gallery-item">
              <img src={src} alt="img" />
            </div>
          ))}
        </div>
        {/* Floating Circle */}
        <div className="drag-circle">
          <span className="arrow left">
            <i className="fa-solid fa-chevron-left"></i>
          </span>
          <span className="text">{gallery.dragLabel}</span>
          <span className="arrow right">
            <i className="fa-solid fa-chevron-right"></i>
          </span>
        </div>
      </div>
    </div>
  );
}
