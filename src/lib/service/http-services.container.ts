import {
  DecentralizedEntityHttpService,
  DeploymentHttpService,
  HttpServicesContainer,
  IndexingHttpService,
  MultiSignProposalHttpService,
  NftProxyHttpService,
  OwnershipHttpService,
  StatsHttpService,
  TokenAsAServiceDeployerHttpService
} from "@unleashed-business/opendapps-cloud-ts-commons";
import { Inject, Injectable } from "@angular/core";
import { BACKEND_BASE_URL_DI_TOKEN } from "../ng-commons.const";
import { BlocktimeHttpService } from "@unleashed-business/opendapps-cloud-ts-commons/dist/web2/blocktime-http.service";

@Injectable({
  providedIn: "root"
})
export class NgHttpServicesContainer extends HttpServicesContainer {
  constructor(@Inject(BACKEND_BASE_URL_DI_TOKEN) baseUrl: string) {
    super(
      new DecentralizedEntityHttpService(baseUrl),
      new TokenAsAServiceDeployerHttpService(baseUrl),
      new NftProxyHttpService(baseUrl),
      new MultiSignProposalHttpService(baseUrl),
      new IndexingHttpService(baseUrl),
      new DeploymentHttpService(baseUrl),
      new BlocktimeHttpService(baseUrl),
      new StatsHttpService(baseUrl),
      new OwnershipHttpService(baseUrl),
    );
  }
}
