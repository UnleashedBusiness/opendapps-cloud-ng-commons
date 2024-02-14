import { type Provider } from "@angular/core";
import {
  NotificationService,
  TransactionRunningHelperService,
} from "@unleashed-business/ts-web3-commons";
import {
  HttpServicesContainer,
  Web3ServicesContainer,
} from "@unleashed-business/opendapps-cloud-ts-commons";
import { NgWeb3ServicesContainer } from "./service/web3-services.container";
import { NgHttpServicesContainer } from "./service/http-services.container";

export const ngCommonsServices: Provider[] = [
  { provide: NotificationService, useFactory: () => new NotificationService() },
  {
    provide: TransactionRunningHelperService,
    deps: [NotificationService],
    useFactory: (notificationService: NotificationService) => {
      return new TransactionRunningHelperService(notificationService);
    },
  },
];

export const web3ContractService: Provider[] = [
  { provide: Web3ServicesContainer, useClass: NgWeb3ServicesContainer },
];

export const httpServices: Provider[] = [
  { provide: HttpServicesContainer, useClass: NgHttpServicesContainer },
];
