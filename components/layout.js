import Head from 'next/head';
import Header from './header';

function Layout({ user, loading = false, children }) {
  if (process.browser) {
    const currentTheme = document.documentElement.dataset.theme;

    if (currentTheme === 'dark') {
      window.document.documentElement.dataset.theme = 'light';
    } else {
      window.document.documentElement.dataset.theme = 'dark';
    }
  }
  return (
    <>
      <Head>
        <title>Next.js with Auth0</title>
      </Head>

      <Header user={user} loading={loading} />

      <main className="bg-white dark:bg-gray-900">
        <div className="max-w-2xl py-6 mx-auto">{children}</div>
      </main>

      <style jsx>{`
        .container {
          max-width: 42rem;
          margin: 1.5rem auto;
        }
      `}</style>
      <style jsx global>{`
        body {
          margin: 0;
          color: #333;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
      `}</style>
    </>
  );
}

export default Layout;
