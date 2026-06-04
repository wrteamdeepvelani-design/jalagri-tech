/**
 * LetterImageSection — theme markup from about.html lines 1158-1163.
 * Big letter-image text strip used as a section divider.
 * Editable text lives in src/data/about/letter.json.
 */
import data from "@/data/about/letter.json";

export default function LetterImageSection() {
  return (
    <div className="letter-image-section-2 fix">
      <div className="letter-image mb-0">{data.text}</div>
    </div>
  );
}
