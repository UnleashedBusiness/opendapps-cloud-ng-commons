import {ModuleWithProviders, NgModule} from "@angular/core";
import {httpServices, ngCommonsServices, web3ContractService} from "./ng-commons.services";
import {ngCommonsPipes} from "./ng-commons.pipes";
import {ngCommonsComponents} from "./ng-commons.components";
import {CommonModule} from "@angular/common";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ClipboardModule} from "ngx-clipboard";
import {FormsModule as NgFormsModule} from "@rooney-and-shadows/ng-commons";
import {MatTooltipModule} from "@angular/material/tooltip";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {WalletConnectionService} from "@unleashed-business/ts-web3-commons";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {firstValueFrom} from "rxjs";
import {
    WalletConnectionDialogComponent, WalletConnectionDialogData
} from "./components/wallet-connection-dialog/wallet-connection-dialog.component";
import {Connector} from "@wagmi/connectors";
import {HttpServiceConfig} from "@unleashed-business/opendapps-cloud-ts-commons/dist/web2/config/http-service.config";

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
        MatDialogModule
    ],
    declarations: [
        ...ngCommonsPipes,
        ...ngCommonsComponents
    ],
    exports: [
        ...ngCommonsPipes,
        ...ngCommonsComponents
    ]
})
export class NgCommonsModule {
    public static forRoot(config: NgCommonsConfig): ModuleWithProviders<NgCommonsModule> {
        return {
            ngModule: NgCommonsModule,
            providers: [
                ...ngCommonsServices,
                ...web3ContractService,
                ...httpServices,
                {
                    provide: HttpServiceConfig,
                    useValue: config.httpServiceConfiguration,
                },
                {
                    deps: [MatDialog],
                    provide: WalletConnectionService,
                    useFactory: (matDialog: MatDialog) => new WalletConnectionService(
                        config.walletConnectProviderId,
                        async (connectors, walletConnectProviderId) => {
                            return await firstValueFrom(matDialog.open(
                                WalletConnectionDialogComponent,
                                {
                                    data: new WalletConnectionDialogData(
                                        connectors,
                                        walletConnectProviderId
                                    ),
                                    width: '95vw',
                                    maxHeight: "95vh",
                                    maxWidth: '460px',
                                }
                            ).afterClosed()) as Connector;
                        }
                    )
                },
            ]
        }
    }
}

export class NgCommonsConfig {
    constructor(
        public readonly walletConnectProviderId: string,
        public readonly httpServiceConfiguration: HttpServiceConfig
    ) {
    }
}