import {
  DecentralizedEntityHttpService,
  DeploymentHttpService, HttpServicesContainer,
  IndexingHttpService,
  MultiSignProposalHttpService,
  NftProxyHttpService,
  TokenAsAServiceDeployerHttpService
} from "@unleashed-business/opendapps-cloud-ts-commons";
import {Injectable} from "@angular/core";

@Injectable()
export class NgHttpServicesContainer extends HttpServicesContainer {
  constructor(
    decentralizedEntity: DecentralizedEntityHttpService,
    tokenAsAService: TokenAsAServiceDeployerHttpService,
    nftProxy: NftProxyHttpService,
    multiSignProposal: MultiSignProposalHttpService,
    indexing: IndexingHttpService,
    deployment: DeploymentHttpService
  ) {
    super(decentralizedEntity, tokenAsAService, nftProxy, multiSignProposal, indexing, deployment);
  }
}
