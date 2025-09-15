import Link from 'next/link';
import classes from './nav.module.css';

const
  links = [
    { href: '/', title: 'Home' },
    { href: '/jsph1', title: 'Users by click' },
    { href: '/jsph2', title: 'Users on mount' },
    { href: '/he', title: 'Horizontal example' },
    { href: '/todo1', title: 'ToDo' },
    { href: '/calendar', title: 'calendar' },
  ];

export function Nav() {
  return <nav className={classes.nav}>
    <ul>
      {links.map(({ href, title }) => <li key={href}>
        <Link href={href}>{title}</Link>
      </li>)}
    </ul>
  </nav>
}