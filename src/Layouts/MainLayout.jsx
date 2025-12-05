import Navbar from "../Components/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-bg">
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <Navbar />

        {/* Main content */}
        <main className="p-6">{children}Main CONTENT</main>
      </div>
    </div>
  );
}
