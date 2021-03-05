import { Component, OnInit } from '@angular/core';
import { Resultado } from '../../../shared/models/resultado';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {

  objResultado: Resultado[] = [];
  puntosTotales = 0;

  constructor(private route: ActivatedRoute, public router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.objResultado = this.router.getCurrentNavigation().extras.state.resultados;
        this.sumarPuntos();
      }
    });
  }

  ngOnInit() {}

  sumarPuntos() {
    this.puntosTotales = this.objResultado.filter(resultado => resultado.puntos !== 0).reduce((sum, current) => sum + current.puntos, 0);
  }

  goToGame() {
    this.router.navigate(['/tabs/home/board']);
  }

}
