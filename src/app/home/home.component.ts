import { Component, OnInit } from '@angular/core';
import { ServicoAutenticacao } from '../autenticacao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private servicoAutenticacao: ServicoAutenticacao) { }

  ngOnInit() {
  }
  public sair(): void {
	this.servicoAutenticacao.sair()
  }
}
