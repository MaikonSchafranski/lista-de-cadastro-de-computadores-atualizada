import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Componentes } from 'src/app/entity/Componentes';
import { AdicionarService } from 'src/app/model/service/adicionar.service';

interface pcCadastro {
  categoria: string;
  processador: string;
  placaVideo: string;
  memoriaRam: string;
  armazenamento: number;
  cor: boolean
}

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  pcDeCadastro: pcCadastro = {
    categoria: '',
    processador: '', 
    placaVideo: '',
    memoriaRam: '',
    armazenamento: 0,
    cor: false

  };

  constructor(
    private alertController: AlertController,
    private router: Router,
    private adicionarService: AdicionarService,
    private renderer: Renderer2

  ) {}

  ngOnInit() {}

  cadastro() {
    if (
      this.pcDeCadastro.categoria &&
      this.pcDeCadastro.processador &&
      this.pcDeCadastro.placaVideo &&
      this.pcDeCadastro.memoriaRam
    ) {
      let novoComponente: Componentes = new Componentes(
        this.pcDeCadastro.categoria,
        this.pcDeCadastro.processador
      );
      novoComponente.placaVideo = this.pcDeCadastro.placaVideo;
      novoComponente.memoriaRam = this.pcDeCadastro.memoriaRam;
      novoComponente.armazenamento = this.pcDeCadastro.armazenamento;
      this.adicionarService.cadastrar(novoComponente);
      this.router.navigate(['/home']);
    } else {
      this.presentAlert('Erro', 'Todos os campos obrigatórios devem ser preenchidos');
    }
  }

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Cadastro de Computadores',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  mudarTema() {
    this.pcDeCadastro.cor = !this.pcDeCadastro.cor;
    const colorTheme = this.pcDeCadastro.cor ? 'dark' : 'light'; 
    this.renderer.setAttribute(document.body, 'color-theme', colorTheme);
  }

  voltar(){
    this.router.navigate(['/home'])
  }
}
