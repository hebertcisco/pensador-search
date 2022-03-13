import { ReactNode } from 'react';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="">
    {props.meta}
    <header>
      <nav>
        <ul id="nav_bar">
          <li className="nav-links" id="gmail">
            <a href="#">Gmail</a>
          </li>
          <li className="nav-links">
            <a href="#">Images</a>
          </li>
          <li id="sign_in">
            <a href="#">Sign In</a>
          </li>
        </ul>
      </nav>
    </header>

    {props.children}

    {/* FOOTER */}
    <footer>
      <ul className="footer-left">
        <li>
          <a href="#">Advertising</a>
        </li>
        <li>
          <a href="#">Business</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
      </ul>
      <ul className="footer-right">
        <li>
          <a href="#">Privacy</a>
        </li>
        <li>
          <a href="#">Terms</a>
        </li>
        <li>
          <a href="#">Settings</a>
        </li>
      </ul>
    </footer>
  </div>
);

export { Main };
