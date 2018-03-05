import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServicoAutenticacao } from '../../autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter()
  public formulario: FormGroup = new FormGroup({
	'email': new FormControl(null , [ Validators.required ]),
	'senha': new FormControl(null, [ Validators.required, Validators.minLength(6) ] )
  })
  public error: any
  public error_msg: string
  constructor(private servicoAutenticacao: ServicoAutenticacao ) { }

  ngOnInit() {
  }


  public exibirPainelCadastro(): void{
	this.exibirPainel.emit('cadastro')
  }

  public autenticar(): void {
	this.servicoAutenticacao.autenticar(this.formulario.value.email, this.formulario.value.senha)
			.then( (resposta: string) => this.error_msg = resposta)
  }
  public loginOk(): boolean {
	  return this.formulario.valid ? true : false
  }

}
