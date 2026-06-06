/**
 * DroneSpecificationSection — bottom-of-contact showcase strip.
 * Replaced the theme's manual drag gallery with a continuous auto-scrolling
 * marquee (CSS-only, pauses on hover). Images are rendered twice so the
 * loop is seamless. Uses .agri-marquee classes (not .gallery-wrapper) so
 * main.js's drag init skips it.
 */
import data from "@/data/contact/contact.json";

export default function DroneSpecificationSection() {
  const gallery = data.gallery;
  // Duplicate the set so the -50% scroll loops seamlessly.
  const loop = [...gallery.images, ...gallery.images];

  return (
    <div className="drone-specification-section section-padding fix">
      <div className="agri-marquee">
        <div className="agri-marquee-track">
          {loop.map((src, i) => (
            <div key={i} className="agri-marquee-item" aria-hidden={i >= gallery.images.length}>
              <img src={src} alt="img" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
