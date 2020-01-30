import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './_components/main/main.component';


const routes: Routes = [
    {path: '', component: MainComponent, pathMatch: 'full'},
    {path: '**', component: MainComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
