export default function Footer() {
  return (
    <footer className="bg-white border-t mt-8">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600">
        <div>
          © {new Date().getFullYear()} MyBlog — Built with Next.js • MongoDB
        </div>
        <div className="mt-2">
          Follow SEO best practices · Accessible · Mobile-first
        </div>
      </div>
    </footer>
  );
}
