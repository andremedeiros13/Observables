import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { rejects } from 'node:assert';
import { Observable } from 'rxjs';
import { subscribe } from 'node:diagnostics_channel';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Observables(RXJS)';

  ngOnInit(): void {
    // this.minhaPromise('André').then((result) => console.log(result));

    // this.minhaPromise('Jose')
    //   .then((result) => console.log(result))
    //   .catch((erro) => console.log(erro));

    // this.minhaObservable('André')
    //   .subscribe(
    //     result => console.log(result),
    //     erro => console.log(erro),
    //     () => console.log('FIM!'));

    const observer = {
      next: (valor) => console.log('Next: ', valor),
      error: (erro) => console.log('Erro: ', erro),
      complete: () => console.log('FIM!'),
    };

    // const obs = this.minhaObservable('André');
    //     obs.subscribe(observer); 

    const obs = this.usuarioObservable('Admin', 'admin@admin.com');
    const subs = obs.subscribe(observer);

    setTimeout(() => {
      subs.unsubscribe();
      console.log('Conexão fechada: ' + subs.closed);
    }, 3500);
  }

  escrever(texto: string) {
    console.log(texto);
  }

  minhaPromise(nome: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (nome === 'André') {
        setTimeout(() => {
          resolve('Seja bem vindo ' + nome);
        }, 5000);
      } else {
        reject('Ops! Você não é o André');
      }
    });
  }

  minhaObservable(nome: string): Observable<string> {
    return new Observable((subscribe) => {
      if (nome === 'André') {
        subscribe.next('Olá! ' + nome);
        subscribe.next('Olá de novo! ' + nome);
        setTimeout(() => {
          subscribe.next('Resposta com Delay ' + nome);
        }, 5000);
        subscribe.complete();
      } else {
        subscribe.error('Ops! Ocorreu um erro!');
      }
    });
  }

  usuarioObservable(nome: string, email: string): Observable<Usuario> {
    return new Observable((subscriber) => {
      if (nome === 'Admin') {
        let usuario = new Usuario(nome, email);

        setTimeout(() => {
          subscriber.next(usuario);
        }, 1000);

        setTimeout(() => {
          subscriber.next(usuario);
        }, 2000);

        setTimeout(() => {
          subscriber.next(usuario);
        }, 3000);

        setTimeout(() => {
          subscriber.next(usuario);
        }, 4000);

        setTimeout(() => {
          subscriber.complete();
        }, 5000);
      } else {
        subscriber.error('Ops! Deu erro!');
      }
    });
  }
}

export class Usuario {
  constructor(nome: string, email: string) {
    this.nome = nome;
    this.email = email;
  }

  nome: string;
  email: string;
}
