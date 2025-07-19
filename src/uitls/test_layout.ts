// tree
// 0 (root)
// ├── aboba
// │   └── 2
// ├── 3

// graph
export const g1 = {
  nodes: [
    {
      id: 0,
    },
    {
      id: "aboba",
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
  ],
  links: [
    {
      source: "aboba",
      target: 0,
    },
    {
      source: 2,
      target: "aboba",
    },
    {
      source: 3,
      target: 0,
    },
  ],
};

// tree

// ├── README.md (1)
// ├── package.json (2)
// ├── public (3)
// │   └── index.html (6)
// ├── src (4)
// │   ├── App.tsx (7)
// │   ├── JSONEditor.tsx (8)
// │   ├── index.tsx (...)
// │   ├── layouts.tsx
// │   ├── setupCy.ts
// │   └── styles.css (12)
// └── tsconfig.json (5)

// graph
export const g2 = {
  nodes: [
    {
      id: 0,
      label: "root",
    },
    {
      id: 1,
      label: "README.md",
    },
    {
      id: 2,
      label: "package.json",
    },
    {
      id: 3,
      label: "public",
    },
    {
      id: 4,
      label: "src",
    },
    {
      id: 5,
      label: "App.tsx",
    },
    {
      id: 6,
      label: "JSONEditor.tsx",
    },
    {
      id: 7,
      label: "index.tsx",
    },
    {
      id: 8,
      label: "layouts.tsx",
    },
    {
      id: 9,
      label: "setupCy.ts",
    },
    {
      id: 12,
      label: "styles.css",
    },
    {
      id: 55,
      label: "tsconfig.json",
    },
  ],
  links: [
    {
      source: 0,
      target: 1,
    },
    {
      source: 0,
      target: 2,
    },
    {
      source: 0,
      target: 3,
    },
    {
      source: 0,
      target: 4,
    },
    {
      source: 4,
      target: 5,
    },
    {
      source: 4,
      target: 6,
    },
    {
      source: 4,
      target: 7,
    },
    {
      source: 4,
      target: 8,
    },
    {
      source: 4,
      target: 9,
    },
    {
      source: 4,
      target: 12,
    },
    {
      source: 0,
      target: 55,
    },
  ],
};
