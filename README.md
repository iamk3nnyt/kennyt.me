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

## ![screenshot](./public/og.png)

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

## Error Handling

The application implements a robust error handling system using Next.js 13+ error handling features:

### Global Error Page

- Located at `app/error.tsx`
- Handles runtime errors in the application
- Provides user-friendly error messages
- Includes "Try Again" and "Go back home" options
- Logs errors to console (can be extended to error reporting services)

### Not Found Page

- Located at `app/not-found.tsx`
- Handles 404 errors for non-existent routes
- Consistent styling with error page
- Clear navigation back to homepage

### API Error Handling

- All API routes include try-catch blocks
- Standardized error response format:
  ```typescript
  {
    error: string;
    message: string;
  }
  ```
- HTTP status codes for different error types:
  - 400: Bad Request
  - 401: Unauthorized
  - 403: Forbidden
  - 404: Not Found
  - 500: Internal Server Error

### Error Handling Best Practices

1. **Server Components**: Errors in server components are caught by the nearest error boundary
2. **Client Components**: Use try-catch blocks for client-side error handling
3. **API Routes**: Implement proper error handling and status codes
4. **Type Safety**: Use TypeScript for compile-time error prevention
5. **Error Logging**: Console logging for development, can be extended to production logging services

For more information about Next.js error handling, refer to the [official documentation](https://nextjs.org/docs/app/getting-started/error-handling).

## API Security

### Generating a Secure Secret

You can generate a secure secret using Node.js's crypto module. Here are a few methods:

1. **Using Node.js (Recommended)**

   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

   This generates a 32-byte (256-bit) random hex string.

2. **Using OpenSSL**

   ```bash
   openssl rand -hex 32
   ```

   This also generates a 32-byte random hex string.

3. **Using Python**
   ```bash
   python3 -c "import secrets; print(secrets.token_hex(32))"
   ```
   This generates a 32-byte random hex string using Python's secrets module.

The generated secret should be stored in your `.env.local` file:

```env
SECRET=your-generated-secret-here
```

### Protected Endpoints

Certain API endpoints require a secret header for security. These endpoints are used for seeding and deleting data, and should only be accessible in development or through secure means.

#### Required Header

```http
x-secret: <your-secret>
```

The secret value should match the `SECRET` environment variable.

#### Protected Endpoints

1. **Seed Endpoints**

   - `POST /api/gaming/heroes/seed`
   - `POST /api/room/seed`
   - `POST /api/tech/seed`

2. **Delete Endpoints**
   - `DELETE /api/gaming/heroes/delete`
   - `DELETE /api/room/delete`
   - `DELETE /api/tech/delete`

#### Example Usage

```bash
# Seeding data
curl -X POST http://localhost:3000/api/gaming/heroes/seed \
  -H "x-secret: your-secret-here"

# Deleting data
curl -X DELETE http://localhost:3000/api/gaming/heroes/delete \
  -H "x-secret: your-secret-here"
```

#### Error Responses

If the secret header is missing or incorrect, the API will return a 403 Forbidden response:

```json
{
  "error": "Unauthorized"
}
```

### Security Best Practices

1. **Environment Variables**

   - Store the secret in `.env.local` for development
   - Use a secure secret management system in production
   - Never commit secrets to version control

2. **Request Validation**

   - Always validate the secret header
   - Use HTTPS in production
   - Consider implementing rate limiting

3. **Error Handling**
   - Return appropriate status codes
   - Don't expose sensitive information in error messages
   - Log security-related events

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

## TODO List

### Features

- [ ] Add search functionality for blog posts
- [ ] Implement pagination for blog posts list
- [ ] Create an RSS feed for blog posts
- [ ] Add social media sharing buttons
- [ ] Add a newsletter subscription system

### Security

- [ ] Add rate limiting for API endpoints
- [ ] Implement proper input validation
- [ ] Add proper security headers
- [ ] Set up proper backup strategy
- [ ] Implement proper logging strategy

### Technical Improvements

- [ ] Add performance monitoring and analytics
- [ ] Implement proper SEO meta tags
- [ ] Add proper sitemap generation
- [ ] Set up CI/CD pipeline
- [ ] Add proper documentation for API endpoints
