import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from "./acesso/usuario.model";
import * as firebase from 'firebase';

@Injectable()
export class ServicoAutenticacao {

	public token_id: string
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
				.catch((error: Error) => console.log( error ))
	}
	public autenticar(email: string, senha: string): void {
		firebase.auth().signInWithEmailAndPassword(email, senha)
			.then((resposta: any) => {
				firebase.auth().currentUser.getIdToken()
					.then( (idToken: string) => {
						this.token_id = idToken
						localStorage.setItem('idToken', idToken)
						this.router.navigate(['home'])
					})
			})
			.catch((erro: Error) => console.log(erro))
	}
	public autenticado(): boolean {

		if (this.token_id === undefined && localStorage.getItem('idToken') != null){
			this.token_id = localStorage.getItem('idToken')
		}
		return this.token_id !== undefined
	}
}