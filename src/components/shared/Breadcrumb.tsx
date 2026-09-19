import { Fragment } from "react";
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
    /* The theme drops the CSS background below 1400px in favour of a
       .top-image <img>. We use one background for every width instead, fed
       through a custom property so globals.css can beat that !important. */
    <div
      className="breadcrumb-wrapper bg-cover"
      style={
        { "--breadcrumb-image": "url('/images/breadcrumb.jpg')" } as React.CSSProperties
      }
    >
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
              <Fragment key={i}>
                <li>:</li>
                <li>
                  {item.href ? (
                    <Link href={item.href}>{item.label}</Link>
                  ) : (
                    item.label
                  )}
                </li>
              </Fragment>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
