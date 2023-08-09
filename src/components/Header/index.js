import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import cn from "classnames";
import styles from "./Header.module.sass";
import Icon from "../Icon";
import Image from "../Image";
import Notification from "./Notification";
import User from "./User";
import OutsideClickHandler from "react-outside-click-handler";

const nav = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/gallery",
    title: "Gallery",
  },
];

const Headers = () => {
  const [visibleNav, setVisibleNav] = useState(false);
  const [search, setSearch] = useState("");

  const [visible, setVisible] = useState(false);
  const handleSubmit = (e) => {
    alert();
  };

  return (
    <header className={styles.header}>
      <div className={cn("container", styles.container)}>
        <Link className={styles.logo} to="/">
          <Image
            className={styles.pic}
            src="/images/logo-dark.png"
            srcDark="/images/logo-light.png"
            alt="Fitness Pro"
          />
          {/* <div className="h4">Gamebop</div> */}
        </Link>
        <div className={cn(styles.wrapper, { [styles.active]: visibleNav })}>
          <nav className={styles.nav}>
            {nav.map((x, index) => (
              <Link
                className={styles.link}
                to={x.url}
                key={index}
              >
                {x.title}
              </Link>
            ))}
            <div className={styles.market}>
            <button
              // href="https://testnets.opensea.io/collection/nownft-v4"
              // target="_blank"
              className={cn(styles.link, styles.buy)}
              onClick={() => setVisible(!visible)}
            >
              Buy
            </button>
              <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
              {visible && (
                <div className={styles.body}>
                  <div className={styles.menu}>
                    <a
                      href="https://testnets.opensea.io/collection/nownft-v4"
                      target="_blank"
                      className={styles.item}
                    >
                      <div className={styles.text}>NOW (OS)</div>
                    </a>
                  </div>
                </div>
              )}
              </OutsideClickHandler>
            </div>
          </nav>
        </div>
        <User className={styles.user} />
        <button
          className={cn(styles.burger, { [styles.active]: visibleNav })}
          onClick={() => setVisibleNav(!visibleNav)}
        ></button>
      </div>
    </header>
  );
};

export default Headers;
