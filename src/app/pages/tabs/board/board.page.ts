import { Component, OnInit } from '@angular/core';
import { Palabra } from 'src/app/shared/models/palabra';
import { PalabraService } from 'src/app/core/services/palabras/palabra.service';
import { Resultado } from '../../../shared/models/resultado';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { LoaderService } from 'src/app/core/services/_service-util/loader.service';
import { Categoria } from 'src/app/shared/models/categoria';

@Component({
  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss'],
})

export class BoardPage implements OnInit {

  maxTimeIntro: number;
  maxTimeBoard: number;
  palabras: Palabra[] = [];
  palabraEnTablero = '';
  posicion = 0;
  resultados: Resultado[] = [];
  resultado: Resultado = new Resultado();
  objCategoria: Categoria = new Categoria();
  // Paginador
  pageSize = 10;
  currentPage = 1;

  constructor(
    private palabraService: PalabraService,
    private route: ActivatedRoute,
    private router: Router,
    private loaderService: LoaderService) {
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.objCategoria = this.router.getCurrentNavigation().extras.state.categoria;
        }
      });
  }

  initialize() {
    this.maxTimeIntro = 3;
    this.maxTimeBoard = 45;
    this.palabras = [];
    this.getAllPalabrasXcategoriaId();
  }

  ngOnInit() {
    this.initialize();
  }

  startTimerIntro() {
    this.cambiarPalabra(null);
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

  getAllPalabrasXcategoriaId() {
    const params = new Map<string, any>();
    params.set('estado', true);
    params.set('page[number]', this.currentPage);
    params.set('page[size]', this.pageSize);
    this.loaderService.present();
    this.palabraService.getPalabrasByCategoriaId(this.objCategoria.id, params).subscribe((response: any) => {
      this.loaderService.dismiss();
      if (response && response.status === 200) {
        this.palabras = response.body;
        this.startTimerIntro();
      }
    });
  }


  cambiarPalabra(accion) {
    if (accion === 'pasar') {
      this.resultado.estado = 'Pasó';
      this.resultado.palabra = this.palabraEnTablero;
      this.resultados.push(this.resultado);
    } else if (accion === 'correcto') {
      this.resultado.puntos = 3;
      this.resultado.respuesta = true;
      this.resultado.palabra = this.palabraEnTablero;
      this.resultados.push(this.resultado);
    }
    this.mostrarPalabra();
  }

  mostrarPalabra() {
    if (this.palabras.length) {
      this.palabraEnTablero = this.palabras[this.posicion].palabra;
      this.palabras.splice(this.posicion, 1);
      this.resultado = new Resultado();
    } else {
      this.showResults();
    }
  }

  showResults() {
    const navigationExtras: NavigationExtras = {
      state: {
        resultados: this.resultados
      }
    };
    this.router.navigate(['/tabs/home/results'], navigationExtras);
  }

}
