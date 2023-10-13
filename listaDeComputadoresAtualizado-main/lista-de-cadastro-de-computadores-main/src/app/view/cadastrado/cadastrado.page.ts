import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Componentes } from 'src/app/entity/Componentes';
import { AdicionarService } from 'src/app/model/service/adicionar.service';

interface pcCadastrado {
  indice: number;
  categoria: string;
  processador: string;
  placaVideo: string;
  memoriaRam: string;
  armazenamento: number;
  ativarEdicao: boolean;
  componentes: Componentes ;
  cor: boolean;
}

@Component({
  selector: 'app-cadastrado',
  templateUrl: './cadastrado.page.html',
  styleUrls: ['./cadastrado.page.scss'],
})
export class CadastradoPage implements OnInit {
  cadastrar: pcCadastrado = {
    indice: 0,
    categoria: '',
    processador: '',
    placaVideo: '',
    memoriaRam: '',
    armazenamento: 0,
    ativarEdicao: true,
    componentes: new Componentes('', ''),
    cor: false
  }; 

  constructor(
    private actRoute: ActivatedRoute,
    private adicionarService: AdicionarService,
    private router: Router,
    private alertController: AlertController,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.actRoute.params.subscribe((parametro) => {
      if (parametro['indice']) {
        this.cadastrar.indice = parametro['indice'];
      }
    });

    this.cadastrar.componentes = this.adicionarService.obterIndiceDeCadastro(
      this.cadastrar.indice
    );
    this.cadastrar.categoria = this.cadastrar.componentes.categoria;
    this.cadastrar.processador = this.cadastrar.componentes.processador;
    this.cadastrar.placaVideo = this.cadastrar.componentes.placaVideo;
    this.cadastrar.memoriaRam = this.cadastrar.componentes.memoriaRam;
    this.cadastrar.armazenamento = this.cadastrar.componentes.armazenamento;
  }

 



  edicao() {
    if (this.cadastrar.ativarEdicao) {
      this.cadastrar.ativarEdicao = false
    }

    else {
      this.cadastrar.ativarEdicao = true
    }
  }

  alterar() {
    if (this.cadastrar.categoria && this.cadastrar.processador && this.cadastrar.placaVideo &&this.cadastrar.memoriaRam && this.cadastrar.armazenamento) {
      let editarNovo: Componentes = new Componentes(this.cadastrar.categoria, this.cadastrar.processador)
      editarNovo.placaVideo = this.cadastrar.placaVideo
      editarNovo.memoriaRam = this.cadastrar.memoriaRam
      editarNovo.armazenamento = this.cadastrar.armazenamento
      this.adicionarService.atualizarCadastro(this.cadastrar.indice, editarNovo)
      this.router.navigate(['/home'])
    }
    else {
      this.presentAlert("Error:", "os compos devem estar todos prenchidos")
    }
  }
  excluirCadastro() {
    this.adicionarService.deletarCadastro(this.cadastrar.indice)
    this.router.navigate(['/home'])
  }

  async presentAlert(subHeader: string, mesage: string) {
    const alert = await this.alertController.create({
      header: 'Erro',
      subHeader: 'Erro ao cadastrar',
      message: 'Todos os campos devem ser preenchidos!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentAlertConfirme(subHeader: string, mesage: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Important message',
      message: 'This is an alert!',
      buttons: [
        {
          text: 'Cancelar', role: 'cancel', handler: () => {
          },
        },

        {
          text: 'OK', role: 'confirm', handler: () => {
          },
        }

      ],
    });

    await alert.present();
  }

  mudarTema() {
    this.cadastrar.cor = !this.cadastrar.cor;
    const colorTheme = this.cadastrar.cor ? 'dark' : 'light'; 
    this.renderer.setAttribute(document.body, 'color-theme', colorTheme);
  }

  voltar(){
    this.router.navigate(['/home'])
  }
  
}
