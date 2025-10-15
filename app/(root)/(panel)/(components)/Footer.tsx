// app/components/Footer.tsx

export default function Footer() {
  return (
    <footer className="w-full text-gray-800 text-sm py-5 flex justify-between items-center">
      <span>© {new Date().getFullYear()} Edulingo</span>

      <a
        href="https://t.me/vanilla_valentine"
        target="_blank"
        rel="noopener noreferrer"
        className="base_text"
      >
        Support Contact
      </a>
    </footer>
  );
}
