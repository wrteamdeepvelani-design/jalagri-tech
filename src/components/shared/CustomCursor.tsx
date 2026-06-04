/**
 * CustomCursor — just renders the two cursor divs. The theme's main.js
 * (function itCursor at line 918) finds `.mouseCursor`, animates them
 * with `transform: translate(...)` on mousemove, and toggles a
 * `.cursor-hover` class when hovering buttons/links. DO NOT add JS here —
 * setting `style.left/top` from React fights with main.js's transform.
 */
export default function CustomCursor() {
  return (
    <>
      <div className="mouseCursor cursor-outer"></div>
      <div className="mouseCursor cursor-inner"></div>
    </>
  );
}
