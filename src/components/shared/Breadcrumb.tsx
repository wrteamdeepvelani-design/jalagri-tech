import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  title: string;
  items?: BreadcrumbItem[];
}

export default function Breadcrumb({ title, items = [] }: BreadcrumbProps) {
  const crumbs = items.length > 0 ? items : [{ label: title }];

  return (
    <div
      className="breadcrumb-wrapper bg-cover"
      style={{ backgroundImage: "url('/images/breadcrumb.png')" }}
    >
      <div className="top-image">
        <img src="/images/breadcrumb-2.jpg" alt="breadcrumb" />
      </div>
      <div className="container">
        <div className="page-heading">
          <div className="breadcrumb-sub-title">
            <h1 className="text-white wow fadeInUp" data-wow-delay=".3s">
              {title}
            </h1>
          </div>
          <ul className="breadcrumb-items wow fadeInUp" data-wow-delay=".5s">
            <li>
              <Link href="/">
                <i className="fa-solid fa-house"></i> Home
              </Link>
            </li>
            {crumbs.map((item, i) => (
              <>
                <li key={`sep-${i}`}>:</li>
                <li key={`item-${i}`}>
                  {item.href ? (
                    <Link href={item.href}>{item.label}</Link>
                  ) : (
                    item.label
                  )}
                </li>
              </>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
