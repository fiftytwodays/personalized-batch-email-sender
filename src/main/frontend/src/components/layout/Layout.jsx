function Layout({ className = "", children }) {
  return (
    <main className={`${className} h-screen overflow-y-scroll pb-8`}>
      {children}
    </main>
  );
}

export default Layout;
