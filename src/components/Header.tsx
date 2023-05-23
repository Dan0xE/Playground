function Header({ title }: { title: string }) {
  return (
    <header className="sticky top-0 py-4 text-white px-14">
      <h1 className="text-2xl font-bold">{title}</h1>
    </header>
  );
}

export default Header;
