import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FileItem } from '../models/file-item';
import * as firebase from 'firebase';

@Injectable()
export class CargaImagenesService {
  private CARPETA_IMAGES: string = 'img';

  constructor( public db: AngularFireDatabase ) {}


  listaUltimasImagenes(numeroImagenes: number): FirebaseListObservable<any[]> {

    return this.db.list(`/${this.CARPETA_IMAGES}`, {
      query: {
      limitToLast: numeroImagenes
    }

    });
  }

  cargar_imagenes_firebase( archivos: FileItem[] ) {

    console.log( archivos );
    let storageRef = firebase.storage().ref();

    for ( let archivo of archivos ) {
      archivo.estaSubiendo = true;

      let uploadTask: firebase.storage.UploadTask =
        storageRef.child(`${ this.CARPETA_IMAGES}/${archivo.nombreArchivo}`).put( archivo.archivo );

      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,

        ( snapshot ) => archivo.progreso  = 100,
        ( error ) => console.error(error),
        () => {
          archivo.url = uploadTask.snapshot.downloadURL;
          archivo.estaSubiendo = false;

          this.guardarImagen({ nombre: archivo.nombreArchivo, url: archivo.url });

        }
      );
    }

  }

  private guardarImagen( imagen: any) {
    this.db.list(`/${ this.CARPETA_IMAGES }`)
      .push( imagen );
  }
}
