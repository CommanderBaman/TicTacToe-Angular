import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { SignContainerComponent } from './sign-container/sign-container.component'
import { BoardComponent } from './board/board.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NbThemeModule, NbLayoutModule, NbButtonModule } from '@nebular/theme'
import { NbEvaIconsModule } from '@nebular/eva-icons'
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment'

// For firebase
import { AngularFireModule } from '@angular/fire'

const firebaseConfig = {
  apiKey: 'AIzaSyASPDG-AYQ1bJpH9dh3giWx3MoT8z9bSpM',
  authDomain: 'tic-tac-toe-b34ff.firebaseapp.com',
  projectId: 'tic-tac-toe-b34ff',
  storageBucket: 'tic-tac-toe-b34ff.appspot.com',
  messagingSenderId: '247337538157',
  appId: '1:247337538157:web:d4403fbf039a111b2a2564',
  measurementId: 'G-S02ZFF5KNT'
}

@NgModule({
  declarations: [AppComponent, SignContainerComponent, BoardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbButtonModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
