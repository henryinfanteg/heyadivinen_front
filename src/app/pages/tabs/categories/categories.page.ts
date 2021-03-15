import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Category } from 'src/app/shared/models/category';
import { CategoriasService } from 'src/app/services/words/category.service';
import { Router, NavigationExtras } from '@angular/router';
// import { LoaderService } from 'src/app/core/services/_service-util/loader.service';
import { ColorsUtil } from 'src/app/shared/util/colors-util';
import { DatabaseService } from 'src/app/core/services/_service-util/database.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  categorias: Category[] = [];
  templateRetry = false;

  categories = [];
  export = null;
  newCategory = new Category();

  constructor(private categoriaService: CategoriasService,
    public router: Router,
    private databaseService: DatabaseService
    //, private loaderService: LoaderService
    ) {
      // this.loadCategories();
      // this.addCategory();
    }

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
    console.log('------> ENTER PAGE CATEGORIES');
    // Params
    const params = new Map<string, any>();
    params.set('estado', true);
    // this.loaderService.present();
    this.categoriaService.getAll(params).subscribe((response: any) => {
      // this.loaderService.dismiss();
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

  loadCategories() {
    this.databaseService.getCategoriesList().subscribe(res => {
      this.categories = res.values;
    });
  }

   // Mode is either "partial" or "full"
   async createExport(mode) {
    const dataExport = await this.databaseService.getDatabaseExport(mode);
    this.export = dataExport.export;
  }
 
  async addCategory() {
    console.log('------> ENTER ADD CATEGORIES');
    this.newCategory.id = "99";
    this.newCategory.description = "Deportistas";
    this.newCategory.status = true;
    this.newCategory.free = true;
    this.newCategory.icon = "sports";
    await this.databaseService.addDummyCategory(this.newCategory);
    this.newCategory = null;
    this.loadCategories();
  }

}
