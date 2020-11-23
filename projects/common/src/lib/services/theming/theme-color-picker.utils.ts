// https://ajonp.com/courses/angularmaterial/angular-material-theming/

import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ThemeColorPickerService {

    protected colorClass: BehaviorSubject<string>;
    protected initialClass: string;

    constructor(protected overlayContainer: OverlayContainer) {

        this.initialClass = 'fathym-contrast-theme';
        this.colorClass = new BehaviorSubject(this.initialClass);

        const storageClass = localStorage.getItem('theme-picker');
        console.log('color picker service', storageClass);
        if (storageClass) {
            overlayContainer.getContainerElement().classList.add(storageClass);
            this.colorClass.next(storageClass);
        } else {
            overlayContainer.getContainerElement().classList.add(this.initialClass);
        }
    }

    public GetColorClass(): BehaviorSubject<string> {
        return this.colorClass;
    }

    public SetColorClass(className: string) {
        this.overlayContainer.getContainerElement().classList.forEach(css => {
          if (css !== 'cdk-overlay-container') {
            this.overlayContainer.getContainerElement().classList.remove(css);
          }
        });

        this.overlayContainer.getContainerElement().classList.add(className);
        this.colorClass.next(className);
        localStorage.setItem('theme-picker', className);
    }
}
