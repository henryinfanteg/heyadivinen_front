import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/shared/models/word';
import { Result } from '../../../shared/models/result';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
// import { LoaderService } from 'src/app/core/services/_service-util/loader.service';
import { Category } from 'src/app/shared/models/category';
import { Parameters } from 'src/app/shared/parameters';
import { StorageService } from 'src/app/core/services/_service-util/storage.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss'],
})

export class BoardPage implements OnInit {

  maxTimeIntro: number;
  maxTimeBoard: number;
  words = [];
  wordsRandom = [];
  wordOnBoard = '';
  position = 0;
  results: Result[] = [];
  result: Result = new Result();
  objCategory: Category = new Category();
  categories = this.storageService.categories;

  // DELETE THIS OBJECT FOR PDN
  //wordsTest = [];
  /*categoriesTest = [
    {
      description: "PELÍCULAS 1",
      icon: "movies-one",
      id: 1,
      price: 0,
      status: true,
      words: [{ clue: "", description: "Titanic" }, { description: "Harry Potter", clue: "" }]
    },
    {
      description: "LUGARES 1",
      icon: "places-one",
      id: 3,
      price: 0,
      status: true,
      words: [{ clue: "", description: "Campos Eliseos" }, { clue: "", description: "La Muralla China" }]
    },
    {
      description: "SERIES 1",
      icon: "series-one",
      id: 2,
      price: 0,
      status: true,
      words: [{ description: "Flash", clue: "" }, { description: "Arrow", clue: "" }]
    },
    {
      description: "ACTORES 1",
      icon: "actors-one",
      id: 4,
      price: 0,
      status: true,
      words: [{ clue: "", description: "Pierce Brosnan" }, { clue: "", description: "Brad Pitt" }]
    }
  ];*/

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService
    // private loaderService: LoaderService
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.objCategory = this.router.getCurrentNavigation().extras.state.categoria;
      }
    });
  }

  initialize() {
    this.maxTimeIntro = Parameters.timeIntro;
    this.maxTimeBoard = Parameters.timeGame;
    this.words = [];
    this.getAllWordsXcategoryId();
  }

  ngOnInit() {
    this.initialize();
  }

  startTimerIntro() {
    this.changeWord(null);
    const interval = setInterval(x => {
      if (this.maxTimeIntro > 0) {
        this.maxTimeIntro -= 1;
      } else if (this.maxTimeIntro === 0) {
        clearInterval(interval);
        this.startTimerBoard();
      }
    }, 1000);
  }

  startTimerBoard() {
    const interval = setInterval(x => {
      if (this.maxTimeBoard > 0) {
        this.maxTimeBoard--;
      } else if (this.maxTimeBoard === 0) {
        clearInterval(interval);
        this.showResults();
      }
    }, 1000);
  }

  getAllWordsXcategoryId() {
    this.categories.filter(cat => {
      if (cat.id === this.objCategory.id + '') {
        this.words = cat.words;
      }
    });
    this.getRandomWords(this.words);
  }

  getRandomWords(wordsArray) {
    for (var i = 0; i < 10; i++) {
      var randomChoice = wordsArray[~~(Math.random() * wordsArray.length)]
      this.wordsRandom.push(randomChoice)
      let indexSplice = wordsArray.indexOf(randomChoice);
      wordsArray.splice(indexSplice, 1);
    }
    this.startTimerIntro();
  }


  changeWord(action) {
    if (action === Parameters.actionPass) {
      this.result.status = Parameters.actionPass;
      this.result.word = this.wordOnBoard;
      this.results.push(this.result);
    } else if (action === Parameters.actionCorrect) {
      this.result.points = Parameters.pointsHit;
      this.result.response = true;
      this.result.word = this.wordOnBoard;
      this.results.push(this.result);
    }
    this.showWord();
  }

  showWord() {
    if (this.wordsRandom.length) {
      this.wordOnBoard = this.wordsRandom[this.position].description;
      this.wordsRandom.splice(this.position, 1);
      this.result = new Result();
    } else {
      this.showResults();
    }
  }

  showResults() {
    const navigationExtras: NavigationExtras = {
      state: {
        resultados: this.results
      }
    };
    this.router.navigate(['/home/results'], navigationExtras);
  }

}
