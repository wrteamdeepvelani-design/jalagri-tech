/**
 * ContactFormSection — theme markup from contact.html lines 466-530.
 * Form on left (id="contact-form" handled by theme's ajax-mail.js),
 * Google Maps iframe on right. Editable content + map URL in
 * src/data/contact/contact.json under `form`. Decorative shapes use
 * .float-bob-x keyframes from main.css.
 */
import data from "@/data/contact/contact.json";

type Field = {
  label: string;
  type: string;
  name: string;
  id: string;
  placeholder: string;
};

export default function ContactFormSection() {
  const form = data.form;
  const fields = form.fields as Field[];

  return (
    <div className="contact-section section-padding fix section-bg-3">
      <div className="left-shape float-bob-x">
        <img src={form.shapes.left} alt="img" />
      </div>
      <div className="maize-shape float-bob-x">
        <img src={form.shapes.maize} alt="img" />
      </div>
      <div className="container">
        <div className="contact-wrapper">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="contact-content">
                <div className="contact-form">
                  <form id="contact-form">
                    <div className="row g-3">
                      {fields.map((field) => (
                        <div key={field.id} className="col-lg-12">
                          <div className="form-clt">
                            <span>{field.label}</span>
                            {field.type === "textarea" ? (
                              <textarea
                                name={field.name}
                                id={field.id}
                                cols={30}
                                rows={10}
                                placeholder={field.placeholder}
                              />
                            ) : (
                              <input
                                type={field.type}
                                name={field.name}
                                id={field.id}
                                placeholder={field.placeholder}
                              />
                            )}
                          </div>
                        </div>
                      ))}
                      <div className="col-lg-12">
                        <div className="form-clt">
                          <button
                            type="submit"
                            value={form.submitLabel}
                            className="theme-btn theme-btn-3"
                          >
                            {form.submitLabel}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="contact-map">
                <iframe
                  src={form.map.embedUrl}
                  title={form.map.title}
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
