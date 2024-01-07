import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { FilterComponent } from './component/filter/filter.component';
import { SortComponent } from './component/sort/sort.component';
import { FilterElementComponent } from './component/filter-element/filter-element.component';
import { SortButtonComponent } from './component/sort-button/sort-button.component';
import { BorderedFieldComponent } from './component/bordered-field/bordered-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { InputComponent } from './component/input/input.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    FilterComponent,
    SortComponent,
    FilterElementComponent,
    SortButtonComponent,
    BorderedFieldComponent,
    PageNotFoundComponent,
    InputComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterLinkActive, RouterLink],
  exports: [
    HeaderComponent,
    FooterComponent,
    FilterComponent,
    SortComponent,
    FilterElementComponent,
    SortButtonComponent,
    BorderedFieldComponent,
    InputComponent,
  ],
})
export class SharedModule {}
