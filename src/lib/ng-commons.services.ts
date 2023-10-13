import WalletAddressFormatterService from "./service/wallet-address-formatter.service";
import BeautifulNumberFormatterService from "./service/beautiful-number-formatter.service";
import { LoadingService } from "./service/loading.service";
import { Provider } from "@angular/core";
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
import { WalletConnectionService } from "./wallet/wallet-connection.service";

export const ngCommonsServices: Provider[] = [
  {
    provide: WalletAddressFormatterService,
    useFactory: () => new WalletAddressFormatterService(),
  },
  {
    provide: BeautifulNumberFormatterService,
    useFactory: () => new BeautifulNumberFormatterService(),
  },
  { provide: LoadingService, useFactory: () => new LoadingService() },
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
