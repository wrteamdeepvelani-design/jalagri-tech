/**
 * HeroClients — full-width client-logo strip in the light band at the top of
 * the home hero, under the header. Logos only, full colour, no boxes; the
 * names stay as tooltip/alt. Clients that share one logo file (e.g. four
 * Adani Power sites) show the logo once, with every name in its tooltip.
 * The list is rendered twice so the CSS marquee loops seamlessly; the copy
 * is hidden from assistive tech. Data: src/data/home/brand.json.
 */
import data from "@/data/home/brand.json";

type Client = { name: string; logo: string };
type Logo = { logo: string; names: string[] };

function uniqueLogos(clients: Client[]): Logo[] {
  const byLogo = new Map<string, Logo>();
  for (const c of clients) {
    const entry = byLogo.get(c.logo);
    if (entry) entry.names.push(c.name);
    else byLogo.set(c.logo, { logo: c.logo, names: [c.name] });
  }
  return [...byLogo.values()];
}

function Logos({ logos, hidden }: { logos: Logo[]; hidden?: boolean }) {
  return (
    <ul className="hero-clients__group" aria-hidden={hidden || undefined}>
      {logos.map((l) => (
        <li key={l.logo} className="hero-clients__logo" title={l.names.join(", ")}>
          <img src={l.logo} alt={hidden ? "" : l.names.join(", ")} loading="lazy" />
        </li>
      ))}
    </ul>
  );
}

export default function HeroClients() {
  const logos = uniqueLogos(data.clients as Client[]);

  return (
    <div className="hero-clients">
      <span className="hero-clients__label">Trusted by</span>
      <div className="hero-clients__viewport">
        <div className="hero-clients__track">
          <Logos logos={logos} />
          <Logos logos={logos} hidden />
        </div>
      </div>
    </div>
  );
}
