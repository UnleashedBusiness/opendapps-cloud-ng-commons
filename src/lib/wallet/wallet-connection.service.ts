import Web3 from "web3";
import {recoverTypedSignature, SignTypedDataVersion} from "@metamask/eth-sig-util";
import {BigNumber} from "bignumber.js";
import {
    createWalletClient,
    custom,
    WalletClient,
    type Chain,
} from "viem";
import {
    createConfig, fallback, http,
} from "wagmi";
import {
    BlockchainDefinition,
    DefaultEVMNativeTokenDecimals, ReadOnlyWeb3ConnectionService,
    SUPPORTED_WAGMI_CHAINS, WalletWeb3Connection
} from "@unleashed-business/ts-web3-commons";
import {EventEmitter} from "@angular/core";
import {connect, watchChainId, watchAccount, type GetAccountReturnType, type GetChainIdReturnType, getConnectors} from '@wagmi/core'

export class WalletConnectionService extends ReadOnlyWeb3ConnectionService implements WalletWeb3Connection {
    public static readonly WALLET_CONNECTOR_CACHE_KEY = 'ODAPPS_WALLET_CONNECTOR_CACHE_KEY';

    private _connector?: any = undefined;
    private _web3?: Web3 = undefined;
    private _connectedBlockchainDefinition?: BlockchainDefinition = undefined;
    private _walletClient?: WalletClient = undefined;

    private _accounts: any = [];
    private _balanceCache: BigNumber = new BigNumber(0);

    public readonly walletConnectedEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

    public get web3(): Web3 {
        return this._web3!;
    }

    public get walletClient(): WalletClient {
        return this._walletClient!;
    }

    public get blockchain() {
        return this._connectedBlockchainDefinition!;
    }

    public get balanceCache(): BigNumber {
        return this._balanceCache;
    }

    public get accounts(): any {
        return this._accounts;
    }

    constructor(
        private readonly walletConnectProviderId: string,
        private readonly fetchConnectorCallable: (connectors: any[], walletConnectProviderId: string) => Promise<any>,
    ) {
        super();
    }

    public isLocalAccountConnected(): boolean {
        return false;
    }

    async connectWallet(
        allowedChains: BlockchainDefinition[],
        targetChain?: number
    ): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const chainsList: Chain[] = [];
                for (const chain of SUPPORTED_WAGMI_CHAINS) {
                    if (allowedChains.filter(x => x.networkId === chain.id).length > 0) {
                        chainsList.push(chain);
                    }
                }

                if (allowedChains.filter(x => x.networkId === targetChain).length === 0) {
                    targetChain = undefined;
                }

                let targetChainDefinition: BlockchainDefinition | undefined = undefined;
                if (targetChain !== undefined) {
                    targetChainDefinition = allowedChains.filter(x => x.networkId === targetChain)[0];
                }

                const transports: any = {};

                for (let chain of allowedChains) {
                    transports[chain.networkId] = fallback(chain.networkRPC.map(x => http(x)))
                }
                const config = createConfig({
                    chains: chainsList as unknown as readonly [Chain, ...Chain[]],
                    connectors: [],
                    transports: transports
                });


                const connectorsReady = getConnectors(config);
                if (connectorsReady.length <= 0) {
                    reject('No wallet providers were found!');
                    return;
                }

                const cachedConnector = localStorage.getItem(WalletConnectionService.WALLET_CONNECTOR_CACHE_KEY);
                if (cachedConnector !== null) {
                    this._connector = connectorsReady.filter((x) => x.name === cachedConnector).pop();
                }
                if (this._connector === undefined) {
                    this._connector = await this.fetchConnectorCallable(connectorsReady as any[], this.walletConnectProviderId);
                }
                if (this._connector === undefined) {
                    reject('Wallet provider was not selected!');
                    return;
                }

                const connection = await connect(config, {
                    chainId: targetChain,
                    connector: this._connector,
                });

                const account = connection.accounts[0];
                const selectedChain = connection.chainId;
                this._connectedBlockchainDefinition = targetChainDefinition
                    ?? allowedChains.filter(x => x.networkId === selectedChain)[0];
                const wagmiChainFiltered = SUPPORTED_WAGMI_CHAINS
                    .filter(x => x.id === selectedChain);

                // @ts-ignore
                const provider = connection.provider ?? await this._connector!.getProvider()
                this._walletClient = createWalletClient({
                    transport: custom(provider),
                    chain: wagmiChainFiltered.pop()
                })

                watchChainId(config, {
                    onChange: async (chainId: GetChainIdReturnType) => {
                        const newChain = chainId;
                        if (newChain === undefined) {
                            return this.disconnect();
                        }

                        this._connectedBlockchainDefinition = allowedChains.filter(x => x.networkId === newChain).pop();
                        const wagmiChainFiltered = SUPPORTED_WAGMI_CHAINS
                            .filter(x => x.id === newChain)
                            .pop();

                        if (this._connectedBlockchainDefinition === undefined || wagmiChainFiltered === undefined) {
                            return this.disconnect();
                        }

                        const connection = await connect(config, {
                            chainId: newChain,
                            connector: this._connector!,
                        });

                        // @ts-ignore
                        const provider = connection.provider ?? await this._connector?.getProvider()
                        this._walletClient = createWalletClient({
                            transport: custom(provider),
                            chain: wagmiChainFiltered
                        });

                        await this.reloadBalanceCache();

                        this.walletConnectedEvent.emit(true);
                    }
                });

                watchAccount(config, {
                    onChange: async (e: GetAccountReturnType) => {
                        if (e.isDisconnected || e.chain === undefined || allowedChains.filter(x => x.networkId === e.chainId).length <= 0) {
                            return this.disconnect();
                        } else if (e.isConnected) {
                            this._accounts = [e.address];
                            if (e.chainId !== this.blockchain.networkId) {
                                this._connectedBlockchainDefinition = allowedChains.filter(x => x.networkId === e.chainId).pop();
                                const wagmiChainFiltered = SUPPORTED_WAGMI_CHAINS
                                    .filter(x => x.id === e.chainId)
                                    .pop();

                                if (this._connectedBlockchainDefinition === undefined || wagmiChainFiltered === undefined) {
                                    return this.disconnect();
                                }

                                this._connector = e.connector!;
                                const connection = await connect(config, {
                                    chainId: e.chainId,
                                    connector: e.connector!,
                                });

                                // @ts-ignore
                                const provider = connection.provider ?? await this._connector?.getProvider()
                                this._walletClient = createWalletClient({
                                    transport: custom(provider),
                                    chain: wagmiChainFiltered
                                });

                                await this.reloadBalanceCache();

                                this.walletConnectedEvent.emit(true);
                            }
                        }
                    }
                });

                this._accounts = [account];
                this._web3 = new Web3(provider);
                await this.reloadBalanceCache();

                localStorage.setItem(WalletConnectionService.WALLET_CONNECTOR_CACHE_KEY, this._connector.id);

                this.walletConnectedEvent.emit(true);

                resolve();
            } catch (e) {
                console.log(e);
                reject("Failed to connect with wallet! Please, check if you are compatible with web3 and try again ");
            }
        })
    }

    async disconnect() {
        this._web3 = undefined;
        this._connectedBlockchainDefinition = undefined;
        this._connector = undefined;
        this._walletClient = undefined;
        this._accounts = [];

        localStorage.removeItem(WalletConnectionService.WALLET_CONNECTOR_CACHE_KEY);

        this.walletConnectedEvent.emit(false);
    }

    walletConnected(): boolean {
        return this._walletClient !== undefined
            && this._accounts.length > 0;
    }

    async signV4(types: any, mainType: string, domain: {
        name: string,
        version: string,
        verifyingContract: string
    }, messageData: any): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                const signData: any = {
                    types: {
                        EIP712Domain: [
                            {name: "name", type: "string"},
                            {name: "version", type: "string"},
                            {name: "chainId", type: "uint256"},
                            {name: "verifyingContract", type: "address"},
                        ],
                        ...types
                    },
                    domain: {
                        name: domain.name,
                        version: domain.version,
                        chainId: this._connectedBlockchainDefinition!.networkId,
                        verifyingContract: domain.verifyingContract
                    },
                    primaryType: mainType,
                    message: messageData,
                };

                const msgParams = JSON.stringify(signData);
                const params = [this.accounts[0], msgParams];

                const web3local = this._web3;
                const accountLocal = this.accounts[0];
                await (this._web3!.currentProvider! as any).sendAsync(
                    {
                        method: 'eth_signTypedData_v4',
                        params,
                        from: accountLocal,
                    },
                    function (err: any, result: any) {
                        if (err) return reject(err);
                        if (result.error) return reject(result.error.message);
                        const signature = result.result;

                        if (web3local!.utils.toChecksumAddress(accountLocal) !== web3local!.utils.toChecksumAddress(recoverTypedSignature({
                            data: signData,
                            version: SignTypedDataVersion.V4,
                            signature: signature
                        }))) {
                            reject("Signature failed to match original sender!");
                        }

                        resolve(signature);
                    }
                );
            } catch (e) {
                reject(e);
            }
        });
    }

    async reloadBalanceCache() {
        const client = this.getWeb3ReadOnly(this._connectedBlockchainDefinition!);
        const balanceFromClient = await client.eth.getBalance(this.accounts[0]);
        this._balanceCache = new BigNumber(balanceFromClient.toString()).dividedBy(DefaultEVMNativeTokenDecimals);
    }
}
