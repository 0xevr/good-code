export default function Footer() {
  return (
    <footer className="bg-brand-black py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-4">
            © 2025 GoodCode. All Rights Reserved.
          </p>
          <div className="flex justify-center items-center gap-2 text-gray-500 text-sm">
            <a href="#about" className="hover:text-brand-yellow transition-colors">
              About
            </a>
            <span>·</span>
            <a href="#courses" className="hover:text-brand-yellow transition-colors">
              Courses
            </a>
            <span>·</span>
            <a href="#contact" className="hover:text-brand-yellow transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}