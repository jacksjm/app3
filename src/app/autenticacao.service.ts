import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from "./acesso/usuario.model";
import * as firebase from 'firebase';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ServicoAutenticacao {

	public token_id: string
	public error_msg: string

	constructor(private router: Router) {

	}
	public cadastrarUsuario(usuario: Usuario): Promise<any> {
		return firebase.auth().createUserWithEmailAndPassword(
					usuario.email, usuario.senha
				)
				.then((resposta: any) => {

					//remove atributo de senha
					delete usuario.senha
					//registro dos dados complementares do usuário no path email da base64
					firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
						.set( usuario )

				})
				.catch((error: Error) => {
					this.error_msg = error.message
				})
	}
	public autenticar(email: string, senha: string): Promise<any> {
		return firebase.auth().signInWithEmailAndPassword(email, senha)
					.then((resposta: any) => {
						firebase.auth().currentUser.getIdToken()
							.then( (idToken: string) => {
								this.token_id = idToken
								localStorage.setItem('idToken', idToken)
								this.router.navigate(['/home'])
							})
						return ''
					})
					.catch((error: Error) => {
						return error.message
					})
	}
	public autenticado(): boolean {

		if (this.token_id === undefined && localStorage.getItem('idToken') != null){
			this.token_id = localStorage.getItem('idToken')
		}

		if(this.token_id === undefined){
			this.router.navigate(['/'])
		}
		return this.token_id !== undefined
	}

	public sair(): void {
		firebase.auth().signOut()
			.then( () => {
				localStorage.removeItem('idToken')
				this.token_id = undefined
				this.router.navigate(['/'])
			})
	}
}