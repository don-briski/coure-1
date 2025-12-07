import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTooltipModule } from "@angular/material/tooltip";
import { CommonModule } from "@angular/common";
import { MatTabsModule } from "@angular/material/tabs";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatRadioModule } from "@angular/material/radio";
import { MatBadgeModule } from "@angular/material/badge";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { HttpClientModule } from "@angular/common/http";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";
import { TaskList } from "../pages/task-list/task-list";
import { CreateTask } from "../pages/component/create-task/create-task";

const AngularMaterialComps = [
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatDividerModule,
  MatTabsModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatMenuModule,
  MatPaginatorModule,
  MatTabsModule,
  MatDialogModule,
  MatSnackBarModule,
  MatRadioModule,
  MatBadgeModule,
  MatCheckboxModule,
  MatProgressBarModule,
  MatTooltipModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatTableModule,
];

@NgModule({
  imports: [
    AngularMaterialComps,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],

  declarations: [
  ],

  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AngularMaterialComps,
    HttpClientModule,
  ],
})
export class SharedModule {}
