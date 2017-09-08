import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-item';
import { CargaImagenesService } from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css']
})
export class CargaComponent{
  estaSobredropZone: boolean;
  permiteCargar: boolean;
  archivos: FileItem[] = [];

  constructor(
    public _cargaImagenesService: CargaImagenesService
  ) {
    this.estaSobredropZone = false;
    this.permiteCargar = true;
  }


  archivoSobreDropZone( event: boolean) {
        this.estaSobredropZone = event;
  }

  cargarImagenesFirebase() {
    this.permiteCargar = false;
    this._cargaImagenesService.cargar_imagenes_firebase( this.archivos );

  }

  limpiarArchivos() {
    this.archivos = [];
    this.permiteCargar = true;
  }

}
