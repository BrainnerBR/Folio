export default function Footer() {
  return (
    <footer className="w-full bg-white shadow-sm rounded-3xl p-10">
      <div className="flex flex-col md:flex-row justify-between gap-14">
        {/* Logo + Text */}
        <div className="max-w-xs">
          <h2 className="text-2xl font-extrabold text-black">Folio</h2>
          <p className="text-black mt-2">
            Transform your ideas into stunning visuals.
          </p>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 flex-1">
          {/* Product */}
          <div>
            <h3 className="font-bold text-black mb-3">Product</h3>
            <ul className="space-y-2 text-black cursor-pointer ">
              <li className="hover:text-primary duration-100">Features</li>
              <li className="hover:text-primary duration-100">Templates</li>
              <li className="hover:text-primary duration-100">Integrations</li>
              <li className="hover:text-primary duration-100">AI Studio</li>
              <li className="hover:text-primary duration-100">
                Basic Analytics
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-black mb-3">Company</h3>
            <ul className="space-y-2 text-black cursor-pointer">
              <li className="hover:text-primary duration-100">About Us</li>
              <li className="hover:text-primary duration-100">Careers</li>
              <li className="hover:text-primary duration-100">Blog</li>
              <li className="hover:text-primary duration-100">Partners</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-black mb-3">Resources</h3>
            <ul className="space-y-2 text-black cursor-pointer">
              <li className="hover:text-primary duration-100">Help Center</li>
              <li className="hover:text-primary duration-100">
                API Documentation
              </li>
              <li className="hover:text-primary duration-100">Tutorials</li>
              <li className="hover:text-primary duration-100">Support Chat</li>
            </ul>
          </div>
        </div>

        {/* Social + Subscribe */}
        <div className="flex flex-col gap-4">
          {/* Subscribe */}
          <div>
            <p className="font-semibold text-black mb-2">Stay updated</p>
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="border border-black/20 rounded-lg px-3 py-2 text-sm focus:outline-none"
              />
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg cursor-pointer">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bottom text */}
      <div className="mt-10 border-t border-black/10 pt-4 text-black/50 text-sm flex items-center justify-center gap-2">
        © 2024 Folio. All rights reserved | By BBR
      </div>
    </footer>
  );
}
