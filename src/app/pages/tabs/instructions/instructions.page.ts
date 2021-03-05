import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Categoria } from 'src/app/shared/models/categoria';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.page.html',
  styleUrls: ['./instructions.page.scss'],
})
export class InstructionsPage implements OnInit {

  objCategoria: Categoria = new Categoria();

  constructor(private route: ActivatedRoute,  public router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.objCategoria = this.router.getCurrentNavigation().extras.state.categoria;
      }
    });
  }

  ngOnInit() {}


  showBoard() {
    const navigationExtras: NavigationExtras = {
      state: {
        categoria: this.objCategoria
      }
    };
    this.router.navigate(['/tabs/home/board'], navigationExtras);
  }

  goToBack() {
    this.router.navigate(['../../']);
  }

}
