import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Usuario } from '../usuario.model';

import { ServicoAutenticacao } from '../../autenticacao.service'

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter()
  public formulario: FormGroup = new FormGroup({
	'email': new FormControl(null, [Validators.required]),
	'nome_completo': new FormControl(null, [Validators.required]),
	'nome_usuario': new FormControl(null, [Validators.required]),
	'senha': new FormControl(null, [Validators.required, Validators.minLength(6)])
  })
  public error_msg: string
  constructor(private servicoAutenticacao: ServicoAutenticacao) { }

  ngOnInit() {
  }
  public exibirPainelLogin(): void{
	this.exibirPainel.emit('login')
  }
  public cadastrarUsuario(): void{
	  let usuario: Usuario = new Usuario(
		  this.formulario.value.email,
		  this.formulario.value.nome_completo,
		  this.formulario.value.nome_usuario,
		  this.formulario.value.senha)

	  this.servicoAutenticacao.cadastrarUsuario(usuario)
		.then( () => {
			this.exibirPainelLogin()
		})
		.catch( (error: Error) => this.error_msg = error.message)
  }
  public cadastroOk(): boolean {
	return this.formulario.valid ? true : false
}
}
