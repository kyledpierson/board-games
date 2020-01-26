import { Component, OnInit } from '@angular/core';

import { Game } from './game';
import { GameService } from './game.service';

@Component({
    moduleId: module.id,
    selector: 'board-games',
    templateUrl: './game.component.html',
    styleUrls: ['./game.css']
})

export class GameComponent implements OnInit {
    games: Game[];
    headers: string[];
    headersSort: {};

    constructor(private gameService: GameService) { }

    ngOnInit(): void {
        this.headers = [
            'name', 'time', 'minplayers', 'maxplayers',
            'rank', 'rating', 'complexity', 'image'
        ];

        this.headersSort = {};
        for (let header of this.headers) {
            this.headersSort[header] = true;
        }

        this.gameService.getGames()
            .subscribe(games => this.games = games);
    }

    public refreshGames() {
        this.gameService.getGamesAPI().subscribe(games => {
            this.gameService.saveGames(games).subscribe(result => {
                this.gameService.getGames()
                    .subscribe(games => {
                        this.games = games;
                    });
            });
        });
    }

    public sort(header: string) {
        this.games.sort((a, b) => this.customCompare(a, b, header));
        if (this.headersSort[header]) {
            this.games.reverse();
        }
        this.headersSort[header] = !this.headersSort[header];
    }

    public customCompare(a: Game, b: Game, header: string): number {
        if (!isNaN(a[header]) && !isNaN(b[header])) {
            return Number(a[header]) - Number(b[header]);
        }

        if (a[header] < b[header]) return -1;
        if (a[header] > b[header]) return 1;
        return 0;
    }
}
