// Observable Version
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Game } from './game';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class GameService {
    constructor(private http: Http) { }

    getGames(): Observable<Game[]> {
        let url: string = 'api/game';

        return this.http.get(url)
            .map(r => r.json()).catch(e => { return Observable.of([]) });
    }

    saveGames(games: Game[]): Observable<string> {
        let url: string = 'api/game';

        return this.http.post(url, games)
            .map(r => r.text).catch(e => Observable.of(e));
    }

    getGameAPI(id: string): Observable<Game> {
        let url: string = 'http://bgg-api.herokuapp.com/api/v1';

        return this.http.get(url + '/thing?id=' + id + '&stats=1')
            .map(this.parseGame).retryWhen(e => e.delay(3000))
            .catch(e => {
                return Observable.of(new Game('(no data)', '0', '0', '0', '0', '0', '0', '(no image)'))
            });
    }

    getGamesAPI(): Observable<Game[]> {
        let ids: string[] = [
            "189052",
            "171273",
            "150312",
            "173346",
            "155068",
            "136056",
            "5716",
            "34219",
            "140933",
            "171499",
            "153938",
            "175117",
            "195503",
            "178900",
            "158899",
            "39856",
            "129459",
            "81453",
            "157354",
            "175914",
            "172",
            "19857",
            "8203",
            "191862",
            "154203",
            "37759",
            "63888",
            "185589",
            "54043",
            "28023",
            "394",
            "183251",
            "127023",
            "122515",
            "70323",
            "27162",
            "160851",
            "129051",
            "129622",
            "199",
            "122298",
            "175199",
            "21241",
            "15363",
            "4396",
            "160477",
            "141572",
            "163412",
            "125548",
            "161417",
            "372",
            "122522",
            "34635",
            "133473",
            "70919",
            "908",
            "118048",
            "147253",
            "63628",
            "31627",
            "123540",
            "102680",
            "128063",
            "20100",
            "7854"
        ]
        let gameCalls: Observable<Game>[] = [];

        for (let id of ids) {
            gameCalls.push(this.getGameAPI(id));
        }

        return Observable.forkJoin(gameCalls);
    }

    private parseGame(response: Response): Game {
        let body = response.json();
        let item = body.items.item[0];

        return new Game(
            item.name[0].$.value,
            item.playingtime[0].$.value,
            item.minplayers[0].$.value,
            item.maxplayers[0].$.value,
            item.statistics[0].ratings[0].ranks[0].rank[0].$.value,
            item.statistics[0].ratings[0].bayesaverage[0].$.value,
            item.statistics[0].ratings[0].averageweight[0].$.value,
            'http:' + item.image[0]
        );
    }
}
