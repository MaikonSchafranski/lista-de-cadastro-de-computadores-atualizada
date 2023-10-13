import { Injectable } from '@angular/core';
import { Componentes } from 'src/app/entity/Componentes';

interface servico {
  componentes: Componentes[];
}

@Injectable({
  providedIn: 'root',
})
export class AdicionarService {
  servers: servico = { componentes: [] }; 

  constructor() {
    let pc1 = new Componentes('Computador Gamer', 'INTEL I5-10400F');
    let pc2 = new Componentes('Notebook gamer Lenovo', 'Intel Core i5 9300H');
    let pc3 = new Componentes('Computadores Workstation', 'AMD RYZEN 5 5600');

    this.servers.componentes.push(pc1);
    this.servers.componentes.push(pc2);
    this.servers.componentes.push(pc3);
  }

  cadastrar(componente: Componentes) {
    this.servers.componentes.push(componente);
  }

  obterCadastro(): Componentes[] {
    return this.servers.componentes;
  }

  obterIndiceDeCadastro(indice: number): Componentes {
    return this.servers.componentes[indice];
  }

  atualizarCadastro(indice: number, novoComponente: Componentes) {
    this.servers.componentes[indice] = novoComponente;
  }

  deletarCadastro(indice: number) {
    this.servers.componentes.splice(indice, 1);
  }
}
