import { Component, OnInit } from '@angular/core';
import { AdicionarService } from 'src/app/model/service/adicionar.service';
import { Componentes } from 'src/app/entity/Componentes';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.page.html',
  styleUrls: ['./excluir.page.scss'],
})
export class ExcluirPage implements OnInit {
  public componentes: Componentes[] = [];

  constructor(private adicionarService: AdicionarService,
    private alertController: AlertController,
    private router: Router) { }

  ngOnInit() {
    this.componentes = this.adicionarService.obterCadastro();
  }

  async excluirItem(indice: number) {
    const confirm = await this.presentAlert('Excluir item', 'Tem certeza de que deseja excluir este item?');

    if (confirm) {
      await this.adicionarService.deletarCadastro(indice);
      this.componentes = this.adicionarService.obterCadastro();
    }
  }

  async presentAlert(subHeader: string, message: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      const alert = await this.alertController.create({
        header: 'Alert',
        subHeader: subHeader,
        message: message,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              resolve(false);
            },
          },
          {
            text: 'Confirmar',
            handler: () => {
              resolve(true);
            },
          },
        ],
      });

      await alert.present();
    });
  }

  voltar(){
    this.router.navigate(['/home'])
  }
}
