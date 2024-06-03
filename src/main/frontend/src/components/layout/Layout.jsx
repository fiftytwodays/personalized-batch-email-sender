function Layout({ className = "", children }) {
  return (
    <main
      className={`${className} h-dvh overflow-x-hidden w-dvw overflow-y-scroll`}
    >
      {children}
    </main>
  );
}

export default Layout;
