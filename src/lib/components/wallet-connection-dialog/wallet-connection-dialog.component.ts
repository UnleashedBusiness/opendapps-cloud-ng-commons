import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { EthereumPresets } from "../../wallet/ethereum-presets";

@Component({
  selector: 'lib-wallet-connection-dialog',
  templateUrl: './wallet-connection-dialog.component.html',
})
export class WalletConnectionDialogComponent {
  constructor(public dialogRef: MatDialogRef<WalletConnectionDialogComponent, any>,
              @Inject(MAT_DIALOG_DATA) public data: WalletConnectionDialogData
  ) {
  }

  selectConnector(connector: any) {
    this.dialogRef.close(connector);
  }

  connectorImageId(id: string): string {
    return EthereumPresets.injectedPreset[id]!.icon;
  }


  connectorName(id: string): string {
    return EthereumPresets.injectedPreset[id]!.name;
  }
}

export class WalletConnectionDialogData {
  constructor(
    public readonly connectors: any[],
    public readonly walletConnectProjectId: string,
  ) {
  }
}
