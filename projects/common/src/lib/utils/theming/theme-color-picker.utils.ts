// https://ajonp.com/courses/angularmaterial/angular-material-theming/

import { OverlayContainer } from '@angular/cdk/overlay';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Injectable } from '@angular/core';

// @dynamic

/**
 * @dynamic is used because this class contains static properties
 */

@Injectable({
    providedIn: 'root'
})

export class ThemeColorPickerUtil {

    protected static colorClass: BehaviorSubject<string>;
    protected static initialClass: string;
    protected static overlayContainer: OverlayContainer;

    constructor(protected overlayContainer: OverlayContainer) {
        ThemeColorPickerUtil.overlayContainer = overlayContainer;
        ThemeColorPickerUtil.initialClass = 'fathym-contrast-theme';

        const storageClass = localStorage.getItem('theme-picker');
        console.log('color picker service', storageClass);
        if (storageClass) {
            overlayContainer.getContainerElement().classList.add(storageClass);
            ThemeColorPickerUtil.colorClass.next(storageClass);
        } else {
            overlayContainer.getContainerElement().classList.add(ThemeColorPickerUtil.initialClass);
        }
    }

    public static GetColorClass(): BehaviorSubject<string> {
        return ThemeColorPickerUtil.colorClass;
    }

    public static SetColorClass(className: string) {
        ThemeColorPickerUtil.overlayContainer.getContainerElement().classList.forEach(css => {
            ThemeColorPickerUtil.overlayContainer.getContainerElement().classList.remove(css);
        });

        ThemeColorPickerUtil.overlayContainer.getContainerElement().classList.add(className);
        ThemeColorPickerUtil.colorClass.next(className);
        localStorage.setItem('theme-picker', className);
    }
}
