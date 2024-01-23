import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {

  public categories: Category[] = [];
  hasProgramId: boolean = false;
  programId: number = 1;

  constructor(private categoryService: CategoryService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCategoriesByProgramId();

    this.route.paramMap.subscribe(params => {
      this.programId = +params.get('programId')!
      this.getCategoriesByProgramId();
    });
  }

  public getCategoriesByProgramId(): void {
    this.programId = +this.route.snapshot.paramMap.get('programId')!;
    this.categoryService.getCategoriesByProgramId(this.programId).subscribe((response: Category[]) => this.categories = response);
  }

  /*  public handleShowingProducts() {
      this.hasProgramId = this.route.snapshot.paramMap.has('programId');
      //this.hasSearchParameter = this.route.snapshot.paramMap.has('searchParam');
      //if (this.hasSearchParameter) {
     //   this.searchProductsByNameOrSku();
      //}
      if (this.hasProgramId) {
        this.getCategoriesByProgramId();
      }
    //  if (!(this.hasSearchParameter) && !(this.hasCategoryId)) {
      //  this.getProducts();
    //  }
    } */
}
