import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createWeb3ReactRoot, useWeb3React, Web3ReactProvider } from '@web3-react/core'
import getLibrary from './utils/getLibrary';
import ChainUpdater from './updaters/ChainUpdater'
import ApplicationUpdater from './updaters/ApplicationUpdater'
import TransactionUpdater from './updaters/TransactionUpdater'
import { injected } from './connectors';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';
import { MoralisProvider } from 'react-moralis';
import { MoralisAPIKey } from './constants';

const Web3ProviderNetwork = createWeb3ReactRoot('NETWORK')

if (!!window.ethereum) {
    window.ethereum.autoRefreshOnNetworkChange = false
}


ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <MoralisProvider appId={ MoralisAPIKey.appId } serverUrl={ MoralisAPIKey.serverUrl }>
          <ChainUpdater />
          <TransactionUpdater />
          <ApplicationUpdater />
          <App />
        </MoralisProvider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
    <NotificationContainer/>
  </React.StrictMode>,
  document.getElementById("root")
);
