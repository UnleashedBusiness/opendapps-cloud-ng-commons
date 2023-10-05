import WalletAddressFormatterService from "./service/wallet-address-formatter.service";
import BeautifulNumberFormatterService from "./service/beautiful-number-formatter.service";
import {LoadingService} from "./service/loading.service";
import {Provider} from "@angular/core";
import {
  NotificationService,
  TransactionRunningHelperService, WalletConnectionService
} from "@unleashed-business/ts-web3-commons";
import {
  AssetBackingContract,
  BaselineInsuranceDeployerContract,
  ContractDeployerContract,
  DecentralizedEntityDeployerContract,
  DecentralizedEntityHttpService,
  DecentralizedEntityInterfaceContract, DeploymentHttpService,
  DymanicTokenomicsContractService,
  GovernorInterfaceContract, HttpServicesContainer,
  IndexingHttpService,
  InflationContract,
  MultiSignEntityContract,
  MultiSignProposalHttpService,
  MultiSignSharesEntityContract,
  NftProxyHttpService, OpenDAppsCloudRouterContract,
  OwnershipNftCollectionContract,
  OwnershipSharesNftCollectionContract,
  ReferralEngineContract,
  SingleOwnerEntityContract,
  StakingAsAServiceContract,
  StakingAsAServiceDeployerContract,
  TokenAsAServiceContract,
  TokenAsAServiceDeployerContract,
  TokenAsAServiceDeployerHttpService,
  TokenLiquidityTreasuryContract,
  TokenRewardsTreasuryContract, Web3ServicesContainer
} from "@unleashed-business/opendapps-cloud-ts-commons";
import {
  Erc20TokenContract,
  Erc721Contract,
  UniswapFactoryContract,
  UniswapPairContract,
  UniswapRouterContract,
  WethContract
} from "@unleashed-business/ts-web3-commons";
import {NgWeb3ServicesContainer} from "./service/web3-services.container";
import {HttpServiceConfig} from "@unleashed-business/opendapps-cloud-ts-commons/dist/web2/config/http-service.config";
import {NgHttpServicesContainer} from "./service/http-services.container";

export const ngCommonsServices: Provider[] = [
  {provide: WalletAddressFormatterService, useFactory: () => new WalletAddressFormatterService()},
  {provide: BeautifulNumberFormatterService, useFactory: () => new BeautifulNumberFormatterService()},
  {provide: LoadingService, useFactory: () => new LoadingService()},
  {provide: NotificationService, useFactory: () => new NotificationService()},
  {
    provide: TransactionRunningHelperService,
    deps: [NotificationService],
    useFactory: (notificationService: NotificationService) => {
      return new TransactionRunningHelperService(notificationService);
    }
  }
];

const tokenAwareContractDeps = [Erc20TokenContract, WalletConnectionService, TransactionRunningHelperService];
const defaultContractDeps = [WalletConnectionService, TransactionRunningHelperService];
export const web3ContractService: Provider[] = [
  {
    provide: Erc20TokenContract,
    deps: defaultContractDeps,
    useFactory: (c: WalletConnectionService, t: TransactionRunningHelperService) => new Erc20TokenContract(c, t)
  },
  {
    provide: AssetBackingContract,
    deps: tokenAwareContractDeps,
    useFactory: (e: Erc20TokenContract, c: WalletConnectionService, t: TransactionRunningHelperService) =>
      new AssetBackingContract(e, c, t)
  },
  {
    provide: BaselineInsuranceDeployerContract,
    deps: tokenAwareContractDeps,
    useFactory: (e: Erc20TokenContract, c: WalletConnectionService, t: TransactionRunningHelperService) =>
      new BaselineInsuranceDeployerContract(e, c, t)
  },
  {
    provide: ContractDeployerContract,
    deps: tokenAwareContractDeps,
    useFactory: (e: Erc20TokenContract, c: WalletConnectionService, t: TransactionRunningHelperService) =>
      new ContractDeployerContract(e, c, t)
  },
  {
    provide: DecentralizedEntityDeployerContract,
    deps: defaultContractDeps,
    useFactory: (c: WalletConnectionService, t: TransactionRunningHelperService) =>
      new DecentralizedEntityDeployerContract(c, t)
  },
  {
    provide: DecentralizedEntityInterfaceContract,
    deps: defaultContractDeps,
    useFactory: (c: WalletConnectionService, t: TransactionRunningHelperService) =>
      new DecentralizedEntityInterfaceContract(c, t)
  },
  {
    provide: DymanicTokenomicsContractService,
    deps: tokenAwareContractDeps,
    useFactory: (e: Erc20TokenContract, c: WalletConnectionService, t: TransactionRunningHelperService) =>
      new DymanicTokenomicsContractService(e, c, t)
  },
  {
    provide: GovernorInterfaceContract,
    deps: defaultContractDeps,
    useFactory: (c: WalletConnectionService, t: TransactionRunningHelperService) =>
      new GovernorInterfaceContract(c, t)
  },
  {
    provide: InflationContract,
    deps: tokenAwareContractDeps,
    useFactory: (e: Erc20TokenContract, c: WalletConnectionService, t: TransactionRunningHelperService) =>
      new InflationContract(e, c, t)
  },
  {
    provide: MultiSignEntityContract,
    deps: defaultContractDeps,
    useFactory: (c: WalletConnectionService, t: TransactionRunningHelperService) =>
      new MultiSignEntityContract(c, t)
  },
  {
    provide: MultiSignSharesEntityContract,
    deps: defaultContractDeps,
    useFactory: (c: WalletConnectionService, t: TransactionRunningHelperService) =>
      new MultiSignSharesEntityContract(c, t)
  },
  {
    provide: OpenDAppsCloudRouterContract,
    deps: defaultContractDeps,
    useFactory: (c: WalletConnectionService, t: TransactionRunningHelperService) =>
      new OpenDAppsCloudRouterContract(c, t)
  },
  {
    provide: OwnershipNftCollectionContract,
    deps: defaultContractDeps,
    useFactory: (c: WalletConnectionService, t: TransactionRunningHelperService) =>
      new OwnershipNftCollectionContract(c, t)
  },
  {
    provide: OwnershipSharesNftCollectionContract,
    deps: defaultContractDeps,
    useFactory: (c: WalletConnectionService, t: TransactionRunningHelperService) =>
      new OwnershipSharesNftCollectionContract(c, t)
  },
  {
    provide: ReferralEngineContract,
    deps: tokenAwareContractDeps,
    useFactory: (e: Erc20TokenContract, c: WalletConnectionService, t: TransactionRunningHelperService) =>
      new ReferralEngineContract(e, c, t)
  },
  {
    provide: SingleOwnerEntityContract,
    deps: defaultContractDeps,
    useFactory: (c: WalletConnectionService, t: TransactionRunningHelperService) =>
      new SingleOwnerEntityContract(c, t)
  },
  {
    provide: StakingAsAServiceContract,
    deps: tokenAwareContractDeps,
    useFactory: (e: Erc20TokenContract, c: WalletConnectionService, t: TransactionRunningHelperService) =>
      new StakingAsAServiceContract(e, c, t)
  },
  {
    provide: StakingAsAServiceDeployerContract,
    deps: defaultContractDeps,
    useFactory: (c: WalletConnectionService, t: TransactionRunningHelperService) =>
      new StakingAsAServiceDeployerContract(c, t)
  },
  {
    provide: TokenAsAServiceContract,
    deps: defaultContractDeps,
    useFactory: (c: WalletConnectionService, t: TransactionRunningHelperService) =>
      new TokenAsAServiceContract(c, t)
  },
  {
    provide: TokenAsAServiceDeployerContract,
    deps: tokenAwareContractDeps,
    useFactory: (e: Erc20TokenContract, c: WalletConnectionService, t: TransactionRunningHelperService) =>
      new TokenAsAServiceDeployerContract(e, c, t)
  },
  {
    provide: TokenLiquidityTreasuryContract,
    deps: tokenAwareContractDeps,
    useFactory: (e: Erc20TokenContract, c: WalletConnectionService, t: TransactionRunningHelperService) =>
      new TokenLiquidityTreasuryContract(e, c, t)
  },
  {
    provide: TokenRewardsTreasuryContract,
    deps: tokenAwareContractDeps,
    useFactory: (e: Erc20TokenContract, c: WalletConnectionService, t: TransactionRunningHelperService) =>
      new TokenRewardsTreasuryContract(e, c, t)
  },
  {
    provide: Erc721Contract,
    deps: defaultContractDeps,
    useFactory: (c: WalletConnectionService, t: TransactionRunningHelperService) =>
      new Erc721Contract(c, t)
  },
  {
    provide: UniswapFactoryContract,
    deps: defaultContractDeps,
    useFactory: (c: WalletConnectionService, t: TransactionRunningHelperService) =>
      new UniswapFactoryContract(c, t)
  },
  {
    provide: UniswapPairContract,
    deps: defaultContractDeps,
    useFactory: (c: WalletConnectionService, t: TransactionRunningHelperService) =>
      new UniswapPairContract(c, t)
  },
  {
    provide: UniswapRouterContract,
    deps: tokenAwareContractDeps,
    useFactory: (e: Erc20TokenContract, c: WalletConnectionService, t: TransactionRunningHelperService) =>
      new UniswapRouterContract(e, c, t)
  },
  {
    provide: WethContract,
    deps: tokenAwareContractDeps,
    useFactory: (e: Erc20TokenContract, c: WalletConnectionService, t: TransactionRunningHelperService) =>
      new WethContract(e, c, t)
  },
  {
    provide: WethContract,
    deps: tokenAwareContractDeps,

    useFactory: (e: Erc20TokenContract, c: WalletConnectionService, t: TransactionRunningHelperService) =>
      new WethContract(e, c, t)
  },
  {provide: Web3ServicesContainer, useClass: NgWeb3ServicesContainer},
];

export const httpServices: Provider[] = [
  {
    provide: DecentralizedEntityHttpService,
    deps: [HttpServiceConfig],
    useFactory: (c: HttpServiceConfig) => new DecentralizedEntityHttpService(c),
  },
  {
    provide: DeploymentHttpService,
    deps: [HttpServiceConfig],
    useFactory: (c: HttpServiceConfig) => new DeploymentHttpService(c),
  },
  {
    provide: IndexingHttpService,
    deps: [HttpServiceConfig],
    useFactory: (c: HttpServiceConfig) => new IndexingHttpService(c),
  },
  {
    provide: MultiSignProposalHttpService,
    deps: [HttpServiceConfig],
    useFactory: (c: HttpServiceConfig) => new MultiSignProposalHttpService(c),
  },
  {
    provide: NftProxyHttpService,
    deps: [HttpServiceConfig],
    useFactory: (c: HttpServiceConfig) => new NftProxyHttpService(c),
  },
  {
    provide: TokenAsAServiceDeployerHttpService,
    deps: [HttpServiceConfig],
    useFactory: (c: HttpServiceConfig) => new TokenAsAServiceDeployerHttpService(c),
  },
  {provide: HttpServicesContainer, useClass: NgHttpServicesContainer}
];