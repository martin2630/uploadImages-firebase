import { Component, OnInit } from '@angular/core';
import { CargaImagenesService } from '../../services/carga-imagenes.service';
import { FirebaseListObservable } from 'angularfire2/database';



@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.css']
})
export class FotosComponent implements OnInit {
  imagenes: FirebaseListObservable<any[]>;

  constructor(private _cargaImagenesService: CargaImagenesService) {

  this.imagenes = this._cargaImagenesService.listaUltimasImagenes(10);

  }

  ngOnInit() {
  }

}
