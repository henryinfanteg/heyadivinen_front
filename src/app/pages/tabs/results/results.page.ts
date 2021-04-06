import { Component, OnInit } from '@angular/core';
import { Result } from '../../../shared/models/result';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {

  objResult: Result[] = [];
  score = 0;

  constructor(private route: ActivatedRoute, public router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.objResult = this.router.getCurrentNavigation().extras.state.resultados;
        this.scorePoints();
      }
    });
  }

  ngOnInit() {}

  scorePoints() {
    this.score = this.objResult.filter(res => res.points !== 0).reduce((sum, current) => sum + current.points, 0);
  }

  goToGame() {
    this.router.navigate(['/home/board']);
  }

}
