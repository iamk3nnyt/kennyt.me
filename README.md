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

## Loading States

The application implements progressive loading states using Next.js's built-in loading UI feature. Each page has a corresponding `loading.tsx` file that shows a loading state while the page content is being fetched.

This approach provides a better user experience by:

- Showing static content immediately
- Using shimmer effects to indicate loading states
- Maintaining layout stability during loading
- Reducing perceived loading time

For more information about loading states in Next.js, see the [official documentation](https://nextjs.org/docs/app/api-reference/file-conventions/loading).

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
