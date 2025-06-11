# kennyt.me

A modern, personal portfolio and blog for Kenny Tran – full stack developer, founder, and writer. Explore projects, articles, and more, all built with Next.js, TypeScript, and Tailwind CSS.

---

## 🚀 Features

- **Personal portfolio** with project showcase and tech stack
- **Blog** for articles, tutorials, and thoughts
- **Responsive, accessible UI** with dark mode
- **SEO optimized** with Open Graph, Twitter Card, and structured data
- **Bookmark-style lists** for projects and articles
- **Modern navigation and animated header**
- **Loading, error, and empty states** for a smooth UX
- **TypeScript, Next.js App Router, Tailwind CSS**

---

## 🖼️ Screenshots

<!-- Add screenshots here -->

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS
- **SEO:** Next.js Metadata API, Open Graph, Twitter Card, JSON-LD
- **Other:** Lucide Icons, Google Favicon API

## 💾 Data Layer

The application uses a type-safe data layer built with MongoDB and TypeScript. The data layer is organized into the following components:

### Operations

- **Create:** `CreateOperations<T extends BaseDocument>`
- **Read:** `ReadOperations<T extends BaseDocument>`
- **Update:** `UpdateOperations<T extends BaseDocument>`
- **Delete:** `DeleteOperations<T extends BaseDocument>`

## 🔌 API Endpoints

### Featured Articles

#### Get Featured Articles

```bash
curl http://localhost:3000/api/blog/featured
```

Response:

```json
[
  {
    "slug": "building-modern-web-apps",
    "title": "Building Modern Web Applications",
    "excerpt": "A comprehensive guide...",
    "date": "2024-01-15T00:00:00.000Z"
  }
]
```

#### Seed Featured Articles

```bash
curl -X POST http://localhost:3000/api/blog/featured/seed
```

Response:

```json
{
  "message": "Successfully seeded featured articles",
  "count": 3,
  "articles": [...]
}
```

#### Delete All Featured Articles

```bash
curl -X DELETE http://localhost:3000/api/blog/featured/delete
```

Response:

```json
{
  "message": "Successfully deleted all featured articles",
  "deletedCount": 3
}
```

### Bookmarks

#### Get Bookmarks

```bash
curl http://localhost:3000/api/bookmarks
```

Response:

```json
[
  {
    "name": "Next.js Documentation",
    "url": "https://nextjs.org/docs",
    "icon": "https://www.google.com/s2/favicons?domain=nextjs.org&sz=64"
  }
]
```

#### Seed Bookmarks

```bash
curl -X POST http://localhost:3000/api/bookmarks/seed
```

Response:

```json
{
  "message": "Successfully seeded bookmarks",
  "count": 5,
  "bookmarks": [
    {
      "name": "Next.js Documentation",
      "url": "https://nextjs.org/docs",
      "icon": "https://www.google.com/s2/favicons?domain=nextjs.org&sz=64"
    }
    // ... more bookmarks
  ]
}
```

#### Delete All Bookmarks

```bash
curl -X DELETE http://localhost:3000/api/bookmarks/delete
```

Response:

```json
{
  "message": "Successfully deleted all bookmarks",
  "deletedCount": 5
}
```

---

## 📝 Contributing

Contributions are welcome! Please read the [Contributing Guide](./CONTRIBUTING.md) and [Code of Conduct](./CODE_OF_CONDUCT.md) before submitting issues or pull requests.

- [Open an Issue](https://github.com/iamk3nnyt/kennyt.me/issues)
- [Submit a Pull Request](https://github.com/iamk3nnyt/kennyt.me/pulls)

---

## 🏁 Getting Started

1. **Clone the repo:**
   ```sh
   git clone https://github.com/iamk3nnyt/kennyt.me.git
   cd kennyt.me
   ```
2. **Install dependencies:**
   ```sh
   pnpm install
   ```
3. **Set up environment variables:**
   - Copy `.env.example` to `.env.local` and fill in any required values
4. **Run the dev server:**
   ```sh
   pnpm dev
   ```
5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

---

## 📄 License

This project is [MIT licensed](./LICENSE).
