import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeViewerComponent } from './components/tree-viewer/tree-viewer.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  declarations: [
    TreeViewerComponent,
  ],
  imports: [
    CommonModule,
    NzModalModule,
    ReactiveFormsModule,
    NzIconModule,
    NzPopconfirmModule,
    NzCheckboxModule,
    NzInputModule,
  ],
  exports: [
    TreeViewerComponent,
  ]
})
export class AstModule { }
