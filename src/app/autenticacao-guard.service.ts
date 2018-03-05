import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router'
import { ServicoAutenticacao } from './autenticacao.service'

@Injectable()
export class AutenticacaoGuard implements CanActivate {
	constructor(private servicoAutenticacao: ServicoAutenticacao ){

	}
	canActivate(): boolean{
		return this.servicoAutenticacao.autenticado()
	}
}