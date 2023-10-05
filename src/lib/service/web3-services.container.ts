import {
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
  TokenRewardsTreasuryContract, Web3ServicesContainer
} from "@unleashed-business/opendapps-cloud-ts-commons";
import {
  Erc20TokenContract,
  UniswapFactoryContract,
  UniswapPairContract,
  UniswapRouterContract, WethContract
} from "@unleashed-business/ts-web3-commons";
import {Injectable} from "@angular/core";

@Injectable()
export class NgWeb3ServicesContainer extends Web3ServicesContainer {
  constructor(
    openDAppsCloudRouter: OpenDAppsCloudRouterContract,
    decentralizedEntityDeployer: DecentralizedEntityDeployerContract,
    tokenAsAServiceDeployer: TokenAsAServiceDeployerContract,
    stakingAsAServiceDeployer: StakingAsAServiceDeployerContract,
    decentralizedEntityInterface: DecentralizedEntityInterfaceContract,
    governorInterface: GovernorInterfaceContract,
    singleOwnerEntity: SingleOwnerEntityContract,
    multiSignEntity: MultiSignEntityContract,
    multiSignSharesEntity: MultiSignSharesEntityContract,
    token: Erc20TokenContract,
    tokenAsAService: TokenAsAServiceContract,
    stakingAsAService: StakingAsAServiceContract,
    dymanicTokenomics: DymanicTokenomicsContractService,
    inflation: InflationContract,
    tokenLiquidityTreasury: TokenLiquidityTreasuryContract,
    tokenRewardsTreasury: TokenRewardsTreasuryContract,
    uniswapRouter: UniswapRouterContract,
    uniswapPair: UniswapPairContract,
    uniswapFactory: UniswapFactoryContract,
    ownershipNFTCollection: OwnershipNftCollectionContract,
    ownershipSharesNFTCollection: OwnershipSharesNftCollectionContract,
    referralEngine: ReferralEngineContract,
    contractDeployer: ContractDeployerContract,
    weth: WethContract
  ) {
    super(openDAppsCloudRouter, decentralizedEntityDeployer, tokenAsAServiceDeployer, stakingAsAServiceDeployer, decentralizedEntityInterface, governorInterface, singleOwnerEntity, multiSignEntity, multiSignSharesEntity, token, tokenAsAService, stakingAsAService, dymanicTokenomics, inflation, tokenLiquidityTreasury, tokenRewardsTreasury, uniswapRouter, uniswapPair, uniswapFactory, ownershipNFTCollection, ownershipSharesNFTCollection, referralEngine, contractDeployer, weth);
  }
}
