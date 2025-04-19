export default function Footer() {
  return (
    <footer className="bg-base-200 mt-10 border-t py-6">
      <div className="text-base-content container mx-auto px-4 text-center text-sm">
        © {new Date().getFullYear()} OrifromJapan. All rights reserved.
      </div>
    </footer>
  );
}
