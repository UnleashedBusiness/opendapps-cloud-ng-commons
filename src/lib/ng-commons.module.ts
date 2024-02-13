import { ModuleWithProviders, NgModule } from "@angular/core";
import {
  httpServices,
  ngCommonsServices,
  web3ContractService,
} from "./ng-commons.services.js";
import { ngCommonsPipes } from "./ng-commons.pipes.js";
import { ngCommonsComponents } from "./ng-commons.components.js";
import { CommonModule } from "@angular/common";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ClipboardModule } from "ngx-clipboard";
import { FormsModule as NgFormsModule } from "@rooney-and-shadows/ng-commons";
import { MatTooltipModule } from "@angular/material/tooltip";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { firstValueFrom } from "rxjs";
import {
  WalletConnectionDialogComponent,
  WalletConnectionDialogData,
} from "./components/wallet-connection-dialog/wallet-connection-dialog.component.js";
import {
  BACKEND_BASE_URL_DI_TOKEN, IMAGE_UPLOAD_MAX_SIZE_DI_TOKEN,
  WEB3_CONTRACT_TOOLKIT_DI_TOKEN
} from "./ng-commons.const.js";
import { WalletConnectionService } from "./wallet/wallet-connection.service.js";
import {
  ContractGeneralConfig,
  ContractToolkitService,
  TransactionRunningHelperService,
} from "@unleashed-business/ts-web3-commons";

const defaultGeneralContractConfig: ContractGeneralConfig = {
  estimateGasMultiplier: 1.15,
  executionConfirmation: 1,
  executionReceiptTimeout: 10_000,
  blockMintingToleranceIntervalMilliseconds: 30_000,
  blockMintingTolerance: 10,
};

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    ClipboardModule,
    NgFormsModule,
    FormsModule,
    MatTooltipModule,
    FontAwesomeModule,
    RouterModule,
    MatDialogModule,
  ],
  declarations: [...ngCommonsPipes, ...ngCommonsComponents],
  exports: [...ngCommonsPipes, ...ngCommonsComponents],
  providers: [],
})
export class NgCommonsModule {
  public static forRoot(
    config: NgCommonsConfig,
  ): ModuleWithProviders<NgCommonsModule> {
    return {
      ngModule: NgCommonsModule,
      providers: [
        {
          provide: WEB3_CONTRACT_TOOLKIT_DI_TOKEN,
          deps: [TransactionRunningHelperService, WalletConnectionService],
          useFactory: (
            trh: TransactionRunningHelperService,
            wc: WalletConnectionService,
          ) =>
            new ContractToolkitService(
              wc,
              trh,
              config.contractGeneralConfig ?? defaultGeneralContractConfig,
            ),
        },
        ...ngCommonsServices,
        ...web3ContractService,
        ...httpServices,
        {
          provide: BACKEND_BASE_URL_DI_TOKEN,
          useValue: config.baseUrl,
        },
        {
          provide: IMAGE_UPLOAD_MAX_SIZE_DI_TOKEN,
          useValue: config.maxFileSizeInMB ?? 10,
        },
        {
          deps: [MatDialog],
          provide: WalletConnectionService,
          useFactory: (matDialog: MatDialog) =>
            new WalletConnectionService(
              config.walletConnectProviderId,
              async (connectors, walletConnectProviderId) => {
                return (await firstValueFrom(
                  matDialog
                    .open(WalletConnectionDialogComponent, {
                      data: new WalletConnectionDialogData(
                        connectors,
                        walletConnectProviderId,
                      ),
                      width: "95vw",
                      maxHeight: "95vh",
                      maxWidth: "460px",
                    })
                    .afterClosed(),
                ));
              },
            ),
        },
      ],
    };
  }
}

export class NgCommonsConfig {
  constructor(
    public readonly walletConnectProviderId: string,
    public readonly baseUrl: string,
    public readonly contractGeneralConfig?: ContractGeneralConfig,
    public readonly maxFileSizeInMB?: number,
  ) {}
}
