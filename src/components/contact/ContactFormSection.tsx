/**
 * ContactFormSection — theme markup from contact.html lines 466-530.
 * There is no mail backend in this build, so the form does not POST
 * anywhere: it validates client-side, then opens WhatsApp with the
 * enquiry prefilled. Editable content + map URL live in
 * src/data/contact/contact.json under `form`.
 */
"use client";

import { useState } from "react";
import data from "@/data/contact/contact.json";

type Field = {
  label: string;
  type: string;
  name: string;
  id: string;
  placeholder: string;
  required?: boolean;
};

const form = data.form;
const fields = form.fields as Field[];
const errorText = form.errors as Record<string, string>;

// Accepts +91 98794 47399, 09879447399, 9879447399 — 10 digits once the
// country code and separators are stripped.
const isValidPhone = (v: string) => v.replace(/\D/g, "").length >= 10;

export default function ContactFormSection() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (name: string, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    for (const field of fields) {
      const value = (values[field.name] ?? "").trim();
      if (field.required && !value) {
        next[field.name] = errorText[field.name] ?? "This field is required.";
        continue;
      }
      if (field.name === "number" && value && !isValidPhone(value)) {
        next.number = errorText.number;
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    const lines = [
      "New enquiry from jalagritech.com",
      "",
      `Name: ${values.name?.trim()}`,
      `Phone: ${values.number?.trim()}`,
    ];
    if (values.subject?.trim()) lines.push(`Subject: ${values.subject.trim()}`);
    lines.push("", values.message?.trim() ?? "");

    window.open(
      `https://wa.me/${form.whatsappNumber}?text=${encodeURIComponent(
        lines.join("\n")
      )}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

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
                  <form id="contact-form" onSubmit={handleSubmit} noValidate>
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
                                value={values[field.name] ?? ""}
                                onChange={(e) =>
                                  set(field.name, e.target.value)
                                }
                              />
                            ) : (
                              <input
                                type={field.type}
                                name={field.name}
                                id={field.id}
                                placeholder={field.placeholder}
                                value={values[field.name] ?? ""}
                                onChange={(e) =>
                                  set(field.name, e.target.value)
                                }
                              />
                            )}
                            {errors[field.name] && (
                              <span className="form-error">
                                {errors[field.name]}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                      <div className="col-lg-12">
                        <div className="form-clt">
                          <button
                            type="submit"
                            className="theme-btn theme-btn-3 contact-wa-btn"
                          >
                            <i
                              className="fa-brands fa-whatsapp"
                              aria-hidden="true"
                            ></i>
                            {form.submitLabel}
                          </button>
                          <p className="form-note">{form.note}</p>
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
