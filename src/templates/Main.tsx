import { ReactNode } from 'react';
import { LINKS_LIST } from '@/shared/constants';

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
          {LINKS_LIST.map((link) => (
            <li className="nav-links" id={link.name}>
              <a href={link.url}>{link.name}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
    {props.children}
  </div>
);

export { Main };
