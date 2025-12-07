import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskList } from './pages/task-list/task-list';

const routes: Routes = [
  {path:'tasks', component: TaskList},


  {path:'**', redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
