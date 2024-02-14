import { Web3ServicesContainer } from "@unleashed-business/opendapps-cloud-ts-commons";
import {
  ContractToolkitService,
  Web3Contract,
} from "@unleashed-business/ts-web3-commons";
import { Inject, Injectable } from "@angular/core";
import { WEB3_CONTRACT_TOOLKIT_DI_TOKEN } from "../ng-commons.const";
import {
  OpenDAppsCloudRouterAbi,
  type OpenDAppsCloudRouterAbiFunctional
} from "@unleashed-business/opendapps-cloud-ts-abi/dist/abi/opendapps-cloud-router.abi";
import {
  AssetBackingAbi,
  type AssetBackingAbiFunctional,
  BaselineInsuranceServiceDeployerAbi,
  type BaselineInsuranceServiceDeployerAbiFunctional, ContractDeployerAbi, type ContractDeployerAbiFunctional,
  DecentralizedEntityDeployerAbi,
  type DecentralizedEntityDeployerAbiFunctional,
  DecentralizedEntityInterfaceAbi,
  type DecentralizedEntityInterfaceAbiFunctional,
  DynamicTokenomicsAbi,
  type DynamicTokenomicsAbiFunctional,
  InflationAbi,
  type InflationAbiFunctional,
  MultiSignEntityAbi,
  type MultiSignEntityAbiFunctional,
  MultiSignSharesEntityAbi,
  type MultiSignSharesEntityAbiFunctional,
  OwnershipNFTCollectionAbi,
  type OwnershipNFTCollectionAbiFunctional,
  OwnershipSharesNFTCollectionAbi,
  type OwnershipSharesNFTCollectionAbiFunctional,
  ProposalGovernorInterfaceAbi,
  type ProposalGovernorInterfaceAbiFunctional,
  ReferralsEngineAbi,
  type ReferralsEngineAbiFunctional,
  SingleOwnerEntityAbi,
  type SingleOwnerEntityAbiFunctional,
  StakingAsAServiceAbi,
  type StakingAsAServiceAbiFunctional,
  StakingAsAServiceDeployerAbi,
  type StakingAsAServiceDeployerAbiFunctional,
  TokenAsAServiceAbi,
  type TokenAsAServiceAbiFunctional,
  TokenAsAServiceDeployerAbi,
  type TokenAsAServiceDeployerAbiFunctional,
  TokenLiquidityTreasuryAbi,
  type TokenLiquidityTreasuryAbiFunctional,
  TokenRewardsTreasuryAbi,
  type TokenRewardsTreasuryAbiFunctional
} from "@unleashed-business/opendapps-cloud-ts-abi";
import { Erc20Abi, type Erc20AbiFunctional } from "@unleashed-business/ts-web3-commons/dist/abi/erc20.abi";
import {
  UniswapRouterAbi,
  type UniswapRouterAbiFunctional
} from "@unleashed-business/ts-web3-commons/dist/abi/uniswap-router.abi";
import {
  UniswapPairAbi,
  type UniswapPairAbiFunctional
} from "@unleashed-business/ts-web3-commons/dist/abi/uniswap-pair.abi";
import {
  UniswapFactoryAbi,
  type UniswapFactoryAbiFunctional
} from "@unleashed-business/ts-web3-commons/dist/abi/uniswap-factory.abi";
import { WETHAbi, type WETHAbiFunctional } from "@unleashed-business/ts-web3-commons/dist/abi/weth.abi";
import {
  PresaleServiceAbi,
  type PresaleServiceAbiFunctional
} from "@unleashed-business/opendapps-cloud-ts-abi/dist/abi/presale-service.abi";
import {
  PresaleServiceDeployerAbi,
  type PresaleServiceDeployerAbiFunctional
} from "@unleashed-business/opendapps-cloud-ts-abi/dist/abi/presale-service-deployer.abi";

@Injectable({
  providedIn: "root",
})
export class NgWeb3ServicesContainer extends Web3ServicesContainer {
  constructor(
    @Inject(WEB3_CONTRACT_TOOLKIT_DI_TOKEN)
    toolkit: ContractToolkitService,
  ) {
    super(
      new Web3Contract<OpenDAppsCloudRouterAbiFunctional>(toolkit, OpenDAppsCloudRouterAbi),
      new Web3Contract<BaselineInsuranceServiceDeployerAbiFunctional>(toolkit, BaselineInsuranceServiceDeployerAbi),
      new Web3Contract<AssetBackingAbiFunctional>(toolkit, AssetBackingAbi),
      new Web3Contract<DecentralizedEntityDeployerAbiFunctional>(toolkit, DecentralizedEntityDeployerAbi),
      new Web3Contract<TokenAsAServiceDeployerAbiFunctional>(toolkit, TokenAsAServiceDeployerAbi),
      new Web3Contract<StakingAsAServiceDeployerAbiFunctional>(toolkit, StakingAsAServiceDeployerAbi),
      new Web3Contract<DecentralizedEntityInterfaceAbiFunctional>(toolkit, DecentralizedEntityInterfaceAbi),
      new Web3Contract<ProposalGovernorInterfaceAbiFunctional>(toolkit, ProposalGovernorInterfaceAbi),
      new Web3Contract<SingleOwnerEntityAbiFunctional>(toolkit, SingleOwnerEntityAbi),
      new Web3Contract<MultiSignEntityAbiFunctional>(toolkit, MultiSignEntityAbi),
      new Web3Contract<MultiSignSharesEntityAbiFunctional>(toolkit, MultiSignSharesEntityAbi),
      new Web3Contract<Erc20AbiFunctional>(toolkit, Erc20Abi),
      new Web3Contract<TokenAsAServiceAbiFunctional>(toolkit, TokenAsAServiceAbi),
      new Web3Contract<StakingAsAServiceAbiFunctional>(toolkit, StakingAsAServiceAbi),
      new Web3Contract<DynamicTokenomicsAbiFunctional>(toolkit, DynamicTokenomicsAbi),
      new Web3Contract<InflationAbiFunctional>(toolkit, InflationAbi),
      new Web3Contract<TokenLiquidityTreasuryAbiFunctional>(toolkit, TokenLiquidityTreasuryAbi),
      new Web3Contract<TokenRewardsTreasuryAbiFunctional>(toolkit, TokenRewardsTreasuryAbi),
      new Web3Contract<UniswapRouterAbiFunctional>(toolkit, UniswapRouterAbi),
      new Web3Contract<UniswapPairAbiFunctional>(toolkit, UniswapPairAbi),
      new Web3Contract<UniswapFactoryAbiFunctional>(toolkit, UniswapFactoryAbi),
      new Web3Contract<OwnershipNFTCollectionAbiFunctional>(toolkit, OwnershipNFTCollectionAbi),
      new Web3Contract<OwnershipSharesNFTCollectionAbiFunctional>(toolkit, OwnershipSharesNFTCollectionAbi),
      new Web3Contract<ReferralsEngineAbiFunctional>(toolkit, ReferralsEngineAbi),
      new Web3Contract<ContractDeployerAbiFunctional>(toolkit, ContractDeployerAbi),
      new Web3Contract<WETHAbiFunctional>(toolkit, WETHAbi),
      new Web3Contract<PresaleServiceAbiFunctional>(toolkit, PresaleServiceAbi),
      new Web3Contract<PresaleServiceDeployerAbiFunctional>(toolkit, PresaleServiceDeployerAbi),
    );
  }
}
