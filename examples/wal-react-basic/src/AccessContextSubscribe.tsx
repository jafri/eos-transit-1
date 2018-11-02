import React, { Component, ReactNode } from 'react';
import WAL, { WalletAccessContext, StateUnsubscribeFn } from 'wal-eos';

export interface AccessContextSubscribeProps {
  children?: (accessContext: WalletAccessContext) => ReactNode;
}

export class AccessContextSubscribe extends Component<
  AccessContextSubscribeProps
> {
  unsubscribe?: StateUnsubscribeFn;

  handleAccessContextUpdate = () => {
    this.forceUpdate();
  };

  componentDidMount() {
    this.unsubscribe = WAL.accessContext.subscribe(
      this.handleAccessContextUpdate
    );
  }

  componentWillUnmount() {
    const { unsubscribe } = this;
    if (typeof unsubscribe === 'function') unsubscribe();
  }

  render() {
    const { children } = this.props;
    if (typeof children !== 'function') return null;
    return children(WAL.accessContext);
  }
}

export default AccessContextSubscribe;