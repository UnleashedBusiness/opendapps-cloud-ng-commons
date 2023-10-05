import WalletAddressFormatterService from "./service/wallet-address-formatter.service";
import BeautifulNumberFormatterService from "./service/beautiful-number-formatter.service";
import {LoadingService} from "./service/loading.service";
import {Provider} from "@angular/core";
import {
    NotificationService,
    TransactionRunningHelperService
} from "@unleashed-business/ts-web3-commons";
import {
    AssetBackingContract,
    BaselineInsuranceDeployerContract,
    ContractDeployerContract,
    DecentralizedEntityDeployerContract,
    DecentralizedEntityHttpService,
    DecentralizedEntityInterfaceContract, DeploymentHttpService,
    DymanicTokenomicsContractService,
    GovernorInterfaceContract,
    HttpServicesContainer,
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
    TokenRewardsTreasuryContract,
    Web3ServicesContainer
} from "@unleashed-business/opendapps-cloud-ts-commons";
import {
    Erc20TokenContract,
    Erc721Contract,
    UniswapFactoryContract,
    UniswapPairContract,
    UniswapRouterContract,
    WethContract
} from "@unleashed-business/ts-web3-commons";

export const ngCommonsServices: Provider[] = [
    WalletAddressFormatterService,
    BeautifulNumberFormatterService,
    LoadingService,
    NotificationService,
    TransactionRunningHelperService
];

export const web3ContractService: Provider[] = [
    AssetBackingContract,
    BaselineInsuranceDeployerContract,
    ContractDeployerContract,
    DecentralizedEntityDeployerContract,
    DecentralizedEntityInterfaceContract,
    DymanicTokenomicsContractService,
    GovernorInterfaceContract,
    InflationContract,
    MultiSignEntityContract,
    MultiSignSharesEntityContract,
    OpenDAppsCloudRouterContract,
    OwnershipNftCollectionContract,
    OwnershipSharesNftCollectionContract,
    ReferralEngineContract,
    SingleOwnerEntityContract,
    StakingAsAServiceContract,
    StakingAsAServiceDeployerContract,
    TokenAsAServiceContract,
    TokenAsAServiceDeployerContract,
    TokenLiquidityTreasuryContract,
    TokenRewardsTreasuryContract,
    Erc20TokenContract,
    Erc721Contract,
    UniswapFactoryContract,
    UniswapPairContract,
    UniswapRouterContract,
    WethContract,
    Web3ServicesContainer
];

export const httpServices: Provider[] = [
    DecentralizedEntityHttpService,
    DeploymentHttpService,
    IndexingHttpService,
    MultiSignProposalHttpService,
    NftProxyHttpService,
    TokenAsAServiceDeployerHttpService,
    HttpServicesContainer
];