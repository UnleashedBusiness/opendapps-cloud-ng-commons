import { NotificationService, TransactionRunningHelperService } from "@unleashed-business/ts-web3-commons";
import { HttpServicesContainer, Web3ServicesContainer } from "@unleashed-business/opendapps-cloud-ts-commons";
import { LoadingService } from "./loading.service";
import { WalletConnectionService } from "../wallet/wallet-connection.service";
import { FileUploadService } from "./file-upload.service";
import { BigNumberMathService } from "./big-number-math.service";
import BeautifulNumberFormatterService from "./beautiful-number-formatter.service";
import WalletAddressFormatterService from "./wallet-address-formatter.service";

export interface GlobalServiceProviderInterface {
  get notifications(): NotificationService;
  get transactionManager(): TransactionRunningHelperService;
  get web3Services(): Web3ServicesContainer;
  get httpServices(): HttpServicesContainer;
  get connection(): WalletConnectionService;
  get loading(): LoadingService;
  get fileUpload(): FileUploadService;
  get bigNumberMath(): BigNumberMathService;
  get beautifulNumberFormatter(): BeautifulNumberFormatterService;
  get walletAddressFormatter(): WalletAddressFormatterService;
}
