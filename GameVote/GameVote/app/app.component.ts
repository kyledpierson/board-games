import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.html',
})
export class AppComponent {
    total = 0;
    games = [
        { 'title': '7 Wonders', 'votes': 0, 'disabled': false },
        { 'title': 'Acquire', 'votes': 0, 'disabled': false },
        { 'title': 'Bang', 'votes': 0, 'disabled': false },
        { 'title': 'Bohnanza', 'votes': 0, 'disabled': false },
        { 'title': 'Killer Bunnies', 'votes': 0, 'disabled': false },
        { 'title': 'Mormon Bridge', 'votes': 0, 'disabled': false },
        { 'title': 'Scattergories', 'votes': 0, 'disabled': false },
        { 'title': 'Team Stratego', 'votes': 0, 'disabled': false },
        { 'title': 'Team Ticket to Ride', 'votes': 0, 'disabled': false }
    ];

    nextVoter() {
        this.total = 0;
        for (let game of this.games) {
            game.disabled = false;
        }
    }
}
