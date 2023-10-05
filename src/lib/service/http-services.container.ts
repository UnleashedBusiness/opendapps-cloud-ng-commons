import {
  DecentralizedEntityHttpService,
  DeploymentHttpService,
  HttpServicesContainer,
  IndexingHttpService,
  MultiSignProposalHttpService,
  NftProxyHttpService,
  TokenAsAServiceDeployerHttpService
} from "@unleashed-business/opendapps-cloud-ts-commons";
import {Injectable} from "@angular/core";
import {HttpServiceConfig} from "@unleashed-business/opendapps-cloud-ts-commons/dist/web2/config/http-service.config";

@Injectable()
export class NgHttpServicesContainer extends HttpServicesContainer {
  constructor(httpConfig: HttpServiceConfig) {
    super(
      new DecentralizedEntityHttpService(httpConfig),
      new TokenAsAServiceDeployerHttpService(httpConfig),
      new NftProxyHttpService(httpConfig),
      new MultiSignProposalHttpService(httpConfig),
      new IndexingHttpService(httpConfig),
      new DeploymentHttpService(httpConfig)
    );
  }
}
