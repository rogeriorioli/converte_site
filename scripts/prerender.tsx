import React from "react";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { renderToString } from "react-dom/server";
import App from "../src/App";
import { services } from "../src/content";

const file = resolve("dist/index.html");
const template = await readFile(file, "utf8");
const root = '<div id="root"></div>';
if (!template.includes(root))
  throw new Error("Prerender: root placeholder was not found.");

const origin = "https://www.convertesites.com.br/";
const organization = `${origin}#organization`;
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organization,
      name: "Converte",
      url: origin,
      logo: `${origin}favicon.svg`,
      telephone: "+5548991775899",
      sameAs: [
        "https://instagram.com/convertesites",
        "https://www.linkedin.com/company/convertesites/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${origin}#website`,
      url: origin,
      name: "Converte",
      inLanguage: "pt-BR",
      publisher: { "@id": organization },
    },
    ...services.map((service) => ({
      "@type": "Service",
      "@id": `${origin}#${service.id}-service`,
      name: service.title,
      description: service.description,
      url: `${origin}#${service.id}`,
      provider: { "@id": organization },
    })),
  ],
};
const jsonLd = `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>`;
const rendered = renderToString(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
await writeFile(
  file,
  template
    .replace(root, `<div id="root">${rendered}</div>`)
    .replace("</head>", `${jsonLd}</head>`),
);
console.log(
  "Prerender: página completa e dados estruturados gravados em dist/index.html.",
);
