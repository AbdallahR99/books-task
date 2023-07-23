import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from './shared-material.module';
import { FormsModule } from '@angular/forms';
import { TruncatePipe } from '@widgets/_pipes/truncate.pipe';
import { SizeDirective } from '@widgets/_directives/size.directive';
import { HoverStyleDirective } from '@widgets/_directives/hover-style.directive';
import { ResponsiveDirective } from '@widgets/_directives/responsive.directive';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TruncatePipe,
    SizeDirective,
    HoverStyleDirective,
    ResponsiveDirective
  ],
  exports: [
    CommonModule,
    SharedMaterialModule,
    FormsModule,
    TruncatePipe,
    SizeDirective,
    HoverStyleDirective,
    ResponsiveDirective,
  ]
})
export class SharedModule { }
