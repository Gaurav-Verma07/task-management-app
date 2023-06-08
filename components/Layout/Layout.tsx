import { ReactElement, useContext } from 'react';

interface LayoutProps {
  children: ReactElement[] | ReactElement | string;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <header></header>
      <main>{children}</main>
      <footer></footer>
    </>
  );
};

export default Layout;
