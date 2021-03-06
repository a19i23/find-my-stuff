import Link from 'next/link';

function Header({ user, loading }) {
  return (
    <header>
      <nav>
        <ul>
          {!loading &&
            (user ? (
              <>
                <li>
                  <Link href="/items">
                    <a>Items</a>
                  </Link>
                </li>
                <li>
                  <Link href="/newItem">
                    <a>Create</a>
                  </Link>
                </li>
                <li>
                  <Link href="/api/logout">Logout</Link>
                </li>
              </>
            ) : (
              <li>
                <Link href="/api/login">Login</Link>
              </li>
            ))}
        </ul>
      </nav>

      <style jsx>{`
        header {
          padding: 0.2rem;
          color: #fff;
          background-color: #333;
        }
        nav {
          max-width: 42rem;
          margin: 1.5rem auto;
        }
        ul {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
        }
        li {
          margin-right: 1rem;
          margin-left: 1rem;
        }
        li:nth-child(2) {
          margin-right: auto;
        }
        a {
          color: #fff;
          text-decoration: none;
        }
        button {
          font-size: 1rem;
          color: #fff;
          cursor: pointer;
          border: none;
          background: none;
        }
      `}</style>
    </header>
  );
}

export default Header;
