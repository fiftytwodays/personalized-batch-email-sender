function Layout({ className = "", children }) {
  return (
    <main className={`${className} h-screen overflow-auto pb-8`}>
      {children}
    </main>
  );
}

export default Layout;
