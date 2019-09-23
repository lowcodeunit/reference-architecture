export class ToggleThemeUtil {

    /**
     * Toggle fathym themes // could probably add themes to local storage
     *
     * @param classList classlist that holds the theme class
     *
     * @param val theme to change to
     */
    public static Toggle(classList: DOMTokenList, val: string): string {

        let theme: string;

        if (classList.contains('arctic-theme')) {
            classList.remove('arctic-theme');
        }

        if (classList.contains('contrast-theme')) {
            classList.remove('contrast-theme');
        }

        if (classList.contains('cool-candy-theme')) {
            classList.remove('cool-candy-theme');
        }

        if (classList.contains('flipper-theme')) {
            classList.remove('flipper-theme');
        }

        if (classList.contains('ice-theme')) {
            classList.remove('ice-theme');
        }

        if (classList.contains('sea-green-theme')) {
            classList.remove('sea-green-theme');
        }

        if (classList.contains('white-mint')) {
            classList.remove('white-mint');
        }

        switch (val.toUpperCase()) {
            case 'ARCTIC-THEME':
                theme = 'arctic-theme';
                classList.add('arctic-theme');
                break;
            case 'CONTRAST-THEME':
                theme = 'contrast-theme';
                classList.add('contrast-theme');
                break;
            case 'COOL-CANDY-THEME':
                theme = 'cool-candy-theme';
                classList.add('cool-candy-theme');
                break;
            case 'FLIPPER-THEME':
                theme = 'flipper-theme';
                classList.add('flipper-theme');
                break;
            case 'ICE-THEME':
                theme = 'ice-theme';
                classList.add('ice-theme');
                break;
            case 'SEA-GREEN-THEME':
                theme = 'sea-green-theme';
                classList.add('sea-green-theme');
                break;
            case 'WHITE-MINT-THEME':
                theme = 'white-mint-theme';
                classList.add('white-mint-theme');
                break;
          }

        return theme;
    }
}