export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-500 text-center py-6 mt-auto text-xs">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-center gap-4 mb-2">
          <a href="/" className="hover:text-blue-600 transition-colors">首页</a>
          <span className="text-gray-300">|</span>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">GitHub</a>
        </div>
        <p>&copy; {new Date().getFullYear()} iziyu CMS. All rights reserved.</p>
      </div>
    </footer>
  );
}
