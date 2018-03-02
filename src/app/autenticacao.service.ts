import { Usuario } from "./acesso/usuario.model";
import * as firebase from 'firebase';

export class ServicoAutenticacao {
	public cadastrarUsuario(usuario: Usuario): void {
		firebase.auth().createUserWithEmailAndPassword(
			usuario.email, usuario.senha
		)
		.then((resposta: any) => {

			//remove atributo de senha
			delete usuario.senha
			console.log(usuario)
			//registro dos dados complementares do usuário no path email da base64
			firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
				.set( usuario )

			console.log(usuario)
		})
		.catch((error: Error) => console.log( error ))
	}
}