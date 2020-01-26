import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'header' })
export class HeaderPipe implements PipeTransform {
    transform(header: string): string {
        switch (header) {
            case 'name':
            case 'time':
            case 'rank':
            case 'rating':
            case 'complexity':
            case 'image':
                return header.charAt(0).toUpperCase() + header.substring(1);
            case 'minplayers':
                return 'Min Players';
            case 'maxplayers':
                return 'Max Players';

        }
    }
}
