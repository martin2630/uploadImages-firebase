import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import {FileItem} from '../models/file-item';


@Directive({
  selector: '[NgDropFiles]'
})
export class NgDropFilesDirective {
 @Input() archivos: FileItem[] = [];
 @Output() archivoSobre: EventEmitter<any> = new EventEmitter()

  constructor( public elemento: ElementRef ) {

  }
  @HostListener('dragenter', ['$event'])
  public onDragEnter( event: any ) {
    this.archivoSobre.emit( true );
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave( event: any ) {
    this.archivoSobre.emit( false );
  }

  @HostListener('dragover', ['$event'])
  public onDragover( event: any ) {

    let tranferencia = this._getTranferencia( event );

    tranferencia.dropEffect = 'copy';

    this._prevenisDetener( event );

    this.archivoSobre.emit( true );

  }

  @HostListener('drop', ['$event'])
  public onDrop( event: any ) {
    let tranferencia = this._getTranferencia( event );

    if ( !tranferencia ) {
      return;
    }
    this._agregarArchivos( tranferencia.files );
    this._prevenisDetener( event );
    this.archivoSobre.emit( true );

  }


  private _agregarArchivos( archivosLista: FileList ) {


   for (let i in Object.getOwnPropertyNames( archivosLista ) ) {

     let archTemporal = archivosLista[i];

     if ( this._archivoPuedeSerCargado( archTemporal ) ) {

       let nuevoArchivo = new FileItem( archTemporal );
       this.archivos.push( nuevoArchivo );

     }
   }
   console.log( this.archivos );



  }

  private _getTranferencia( event: any) {
   return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  // previene que se recargue la pagina
  private _prevenisDetener( event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  // funcion que valida que no exista el archivos en el arreglo y que valida el tipo de archivo a jpg
  private _archivoPuedeSerCargado( archivo: File ) {
   if ( !this._archivoDroppeado( archivo.name ) && this._esImagen( archivo.type ) ) {
      return true;
   }

   return false;

  }

  private _archivoDroppeado( nombre: string): boolean {
   for ( let i in this.archivos ) {

     let arch  = this.archivos[i];

     if ( arch.archivo.name === nombre ) {
        console.log('Archivo ya existe en la lista', nombre);
        return true;
     }
   }

   return false;

  }

  private _esImagen(tipoArchivo: string): boolean {
    return ( tipoArchivo == '' || tipoArchivo == undefined ) ? false : tipoArchivo.startsWith('image');
  }

}
