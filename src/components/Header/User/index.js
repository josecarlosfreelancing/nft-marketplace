import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./User.module.sass";
import Icon from "../../Icon";
import Theme from "../../Theme";
// import menuIcon from '../../assets/img/navbar/menu.svg'
import { useLocation } from 'react-router-dom'
// import WalletModal from '../walletModal'
import Wallet from '../Wallet';
import Modal from '../../Modal';
import Report from '../../Report';
import { useWeb3React } from '@web3-react/core'
import { shortenAddress } from '../../../helper'
import { useModalOpen, useWalletModalToggle } from '../../../hooks/store'
import { ApplicationModal } from '../../../constants';
// import metamaskImg from '../../assets/img/metamask.png'

const User = ({ className }) => {
  const [visible, setVisible] = useState(false);

  const location = useLocation()

  const { account, deactivate } = useWeb3React()

  const [ showDropDown, setShowDropDown ] = useState(false)

  // const walletModalOpen = useModalOpen( ApplicationModal.WALLET )
  const [walletModalOpen, setWalletModalOpen] = useState(false);

  // const toggleWalletModal = useWalletModalToggle()
  const toggleWalletModal = () => {
    setWalletModalOpen(!walletModalOpen)
  }

  const handleClickDropDownMenu = () => {
      setShowDropDown(prev => !prev)
  }

  const detectTarget = (event) => {
      if( !event.target.matches('#dropdownMenuBtn') ) {
          setShowDropDown(false)
      }
  }

  const onDisconnect = () => {
    deactivate();
    setVisible(!visible);
  }

  useEffect(() => {
      window.addEventListener('click', detectTarget)

      return () => {
          window.removeEventListener('click', detectTarget)
      }
  })


  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div className={cn(styles.user, className)}>
        {account 
        ?
          <button className={cn("button-stroke", styles.button, styles.head, styles.connect)} onClick={() => setVisible(!visible)}>
            {/* <div className={styles.avatar}>
              <img src="/images/content/avatar-user.jpg" alt="Avatar" />
            </div>
            <div className={styles.wallet}>
              7.00698 <span className={styles.currency}>ETH</span>
            </div> */}
            {shortenAddress(account)}
          </button>
        :
          <button className={cn("button-stroke", styles.button, styles.head, styles.connect)} onClick={() => toggleWalletModal()}>
              Connect Wallet
          </button>
        }
        {visible && (
          <div className={styles.body}>
            <div className={styles.menu}>
              <Link
                className={styles.item}
                to="/store"
              >
                <div className={styles.icon}>
                  <Icon name="image" size="20" />
                </div>
                <div className={styles.text}>My Collection</div>
              </Link>
              <a className={styles.item}>
                <div className={styles.icon}>
                  <Icon name="bulb" size="20" />
                </div>
                <div className={styles.text}>Dark theme</div>
                <Theme className={styles.theme} />
              </a>
              <a
                className={styles.item}
                onClick={onDisconnect}
              >
                <div className={styles.icon}>
                  <Icon name="exit" size="20" />
                </div>
                <div className={styles.text}>Disconnect</div>
              </a>
            </div>
          </div>
        )}
      </div>
      <Modal
        visible={walletModalOpen}
        onClose={ toggleWalletModal }
      >
        <Wallet onClose={toggleWalletModal} />
      </Modal>
      {/* <WalletModal 
        isOpen={walletModalOpen}
      /> */}
    </OutsideClickHandler>
  );
};

export default User;
