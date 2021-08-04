export function StickyFooter() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bottom-0 z-50 text-white text-lg bg-gray-800 p-2 border-t-2 text-right">
      &copy; {year} Felix Pütz
    </footer>
  );
}
