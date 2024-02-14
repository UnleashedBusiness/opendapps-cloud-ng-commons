import {
    type AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    type OnDestroy,
    type OnInit,
    ViewChild
} from '@angular/core';
import {Subscription} from "rxjs";

@Component({
    selector: 'app-logo-holder',
    templateUrl: './logo-holder.component.html',
})
export class LogoHolderComponent implements OnInit, OnDestroy, AfterViewInit {
    @Input() name!: string;
    @Input() imageUrl?: string | undefined;
    @Input() maxWidth = 105;
    @Input() maxHeight = 105;
    @Input() loadingImageUrl = false;
    @Input() loadingImageEvent?: EventEmitter<string> | undefined = undefined;

    loadingImage = false;

    @ViewChild("nameTag") nameTag!: ElementRef;
    @ViewChild("imageHolder") imageHolder?: ElementRef;

    private imageLoadingEventSubscription?: Subscription | undefined = undefined;

    constructor() {
    }

    ngOnDestroy(): void {
        this.imageLoadingEventSubscription?.unsubscribe();
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        if (!this.loadingImageUrl) {
            this.loadImage();
        }
        if (this.loadingImageEvent !== undefined) {
            this.imageLoadingEventSubscription = this.loadingImageEvent.subscribe((value) => {
                this.imageUrl = value;
                this.loadImage();
            });
        }
    }

    private loadImage(): void {
        if (this.imageUrl !== undefined && this.imageUrl !== '') {
            (new Promise((resolve, reject) => {
                this.loadingImage = true;
                const image = new Image();
                image.addEventListener('load', resolve);
                image.addEventListener('error', reject);
                image.src = this.imageUrl!;
            })).then(() => {
                this.nameTag.nativeElement.remove();
                this.imageHolder!.nativeElement.style.backgroundImage = `url(${this.imageUrl})`;
                this.imageHolder!.nativeElement.style.display = 'flex'
            }).finally(() => {
                this.loadingImage = false;
            });
        }
    }
}
