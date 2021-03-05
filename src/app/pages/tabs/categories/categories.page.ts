import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Categoria } from 'src/app/shared/models/categoria';
import { CategoriasService } from 'src/app/core/services/palabras/categoria.service';
import { Router, NavigationExtras } from '@angular/router';
import { LoaderService } from 'src/app/core/services/_service-util/loader.service';
import { ColorsUtil } from 'src/app/shared/util/colors-util';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  categorias: Categoria[] = [];
  templateRetry = false;

  constructor(private categoriaService: CategoriasService, public router: Router, private loaderService: LoaderService) {}

  ngOnInit() {
    this.getAllCategorias();
  }

  changeColor(index) {
    return ColorsUtil.getColors(index);
  }

  freeOrNot(flag) {
    if (flag) {
      return '';
    } else {
      return 'logo-usd';
    }
  }

  getAllCategorias() {
    // Params
    const params = new Map<string, any>();
    params.set('estado', true);
    this.loaderService.present();
    this.categoriaService.getAll(params).subscribe((response: any) => {
      this.loaderService.dismiss();
      if (response && response.status === 200) {
        this.templateRetry = false;
        this.categorias = response.body;
      } else {
        this.templateRetry = true;
      }
    });
  }

  showInstructions(categoria) {
    const navigationExtras: NavigationExtras = {
      state: {
        // tslint:disable-next-line:object-literal-shorthand
        categoria: categoria
      }
    };
    this.router.navigate(['/tabs/home/instructions'], navigationExtras);
  }

}
