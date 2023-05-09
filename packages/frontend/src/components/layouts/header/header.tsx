import { FC } from "react";
import classes from "./header.module.sass";
import { Logo, MenuListItem, MenuButton, MenuNavbarCollapse } from "../..";
import { menuItems, IMenuItem } from "./navbarmenuConfig";
import { Edit } from "../../../assets";

const Header: FC = () => {
  return (
    <div className={classes.header}>
      <div className={classes.header_logo_mobile}>
        <Logo type="horizontal" />
      </div>
      <MenuNavbarCollapse className={classes.header_nabvar}>
        <div className={classes.header_logo_desktop}>
          <Logo type="vertical" />
        </div>
        <MenuButton link="/create" icon={Edit} text="Crear" />
        <ul className={classes.header_navbar_itemlist}>
          {menuItems.map(({ id, icon, text, link }: IMenuItem) => {
            return (
              <MenuListItem key={id} icon={icon} text={text} link={link} />
            );
          })}
        </ul>
      </MenuNavbarCollapse>
    </div>
  );
};

export default Header;
