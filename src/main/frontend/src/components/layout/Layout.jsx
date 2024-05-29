function Layout({ className = "", children }) {
  return (
    <main className={`${className} h-dvh overflow-y-scroll`}>{children}</main>
  );
}

export default Layout;
