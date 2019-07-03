import { Inject } from '@angular/core';
import { InjectionToken } from '@angular/core';

export interface FaviconsConfig {
    icons: IconsConfig;
    cacheBusting?: boolean;
}

export interface IconsConfig {
    [ name: string ]: IconConfig;
}

export interface IconConfig {
    type: string;
    href: string;
    isDefault?: boolean;
}

export let BROWSER_FAVICONS_CONFIG = new InjectionToken<FaviconsConfig>( 'Favicons Configuration' );

/**
 * Abstract class that acts as both interface for implementation and as the dependency-injection
 */
export abstract class FaviconsService {
    abstract activate( name: string ): void;
    abstract reset(): void;
}

/**
 * Provide the browser-oriented implementation of the Favicons class
 */
export class BrowserFavicons implements FaviconsService {

    protected elementId: string;
    protected icons: IconsConfig;
    protected useCacheBusting: boolean;

    /**
     * initialize the Favicons service.
     */
    constructor( @Inject( BROWSER_FAVICONS_CONFIG ) config: FaviconsConfig ) {

        this.elementId = 'favicons-service-injected-node';
        this.icons = Object.assign( Object.create( null ), config.icons );
        this.useCacheBusting = ( config.cacheBusting || false );

        // Since the document may have a static favicon definition, we want to strip out
        // any exisitng elements that are attempting to define a favicon. This way, there
        // is only one favicon element on the page at a time.
        this.removeExternalLinkElements();

    }

    /**
     * Active favicon with given identifier
     *
     * @param name favicon name
     */
    public activate( name: string ): void {

        if ( ! this.icons[ name ] ) {

            throw( new Error( `Favicon for [ ${ name } ] not found.` ) );

        }

        this.setNode( this.icons[ name ].type, this.icons[ name ].href );

    }

    /**
     * Activate the default favicon (with isDefault set to True)
     */
    public reset(): void {

        for ( const name of Object.keys( this.icons ) ) {

            const icon = this.icons[ name ];

            if ( icon.isDefault ) {

                this.setNode( icon.type, icon.href );
                return;

            }

        }

        // If we made it this far, none of the favicons were flagged as default. In that
        // case, let's just remove the favicon node altogether.
        this.removeNode();

    }

    /**
     * Inject the favicon element into the document header
     * 
     * @param type type of icon (.png, .jpeg, etc)
     *
     * @param href location
     */
    protected addNode( type: string, href: string ): void {

        const linkElement = document.createElement( 'link' );
        linkElement.setAttribute( 'id', this.elementId );
        linkElement.setAttribute( 'rel', 'icon' );
        linkElement.setAttribute( 'type', type );
        linkElement.setAttribute( 'href', href );
        document.head.appendChild( linkElement );

    }

    /**
     * Return an augmented HREF value with a cache-busting query-string parameter
     *
     * @param href location
     */
    protected cacheBustHref( href: string ): string {

        const augmentedHref = ( href.indexOf( '?' ) === -1 )
            ? `${ href }?faviconCacheBust=${ Date.now() }`
            : `${ href }&faviconCacheBust=${ Date.now() }`
        ;

        return( augmentedHref );

    }

    /**
     * I remove any favicon nodes that are not controlled by this service
     */
    protected removeExternalLinkElements(): void {

        // tslint:disable-next-line:prefer-const
        let linkElements: NodeListOf<Element> = document.querySelectorAll( `link[ rel ~= 'icon' i]` );

        for ( const linkElement of Array.from( linkElements ) ) {

            linkElement.parentNode.removeChild( linkElement );

        }

    }

    /**
     * Remove the favicon node from the document header
     */
    protected removeNode(): void {

        const linkElement = document.head.querySelector( '#' + this.elementId );

        if ( linkElement ) {

            document.head.removeChild( linkElement );

        }

    }

    /**
     * Remove existing favicon node and inject a new favicon node with the give
     * elemet settings
     *
     * @param type type of favicon
     * @param href location
     */

    protected setNode( type: string, href: string ): void {

        const augmentedHref = this.useCacheBusting
            ? this.cacheBustHref( href )
            : href
        ;

        this.removeNode();
        this.addNode( type, augmentedHref );

    }

}
