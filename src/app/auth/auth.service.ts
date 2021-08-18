import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

import { Injectable,  } from '@angular/core';

import { Router } from '@angular/router';
import { map } from 'rxjs/operators';


import Swal from 'sweetalert2'
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private afAuth: AngularFireAuth,
               private router: Router,
               private afDB: AngularFirestore) { }


  initAuthListener() {

    this.afAuth.authState.subscribe( fbUser => {

      console.log(fbUser);

    });

  }

  crearUsuario(nombre: string, email: string, password: string )  {

    this.afAuth.auth
    .createUserWithEmailAndPassword(email, password)
    .then(resp => {
      // console.log(resp);
      const user: User = {
        uid: resp.user.uid,
        nombre: nombre,
        email: resp.user.email
      };

      this.afDB.doc(`${user.uid}/usuario`)
        .set( user)
        .then(( ) => {

          this.router.navigate(['/']);
        })


    })
      .catch(error => {
        console.log(error);
        Swal.fire('Error En el login', error.message, 'error')


      })

  }

  login(email: string, password:string) {

    this.afAuth.auth.
    signInWithEmailAndPassword(email, password)
    .then(resp => {

      // console.log(resp);

      this.router.navigate(['/']);

    })
      .catch(error => {
        console.log(error);
        Swal.fire('Error En el login', error.message, 'error')

      })

  }

  logout() {

    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.afAuth.authState.
    pipe(
      map( fbUser => {

        if( fbUser == null ) {
          this.router.navigate(['/login'])
        }

         return fbUser != null
        })
    )
  }

}
