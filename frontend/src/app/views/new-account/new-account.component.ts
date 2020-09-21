import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { CpfFormValidator } from 'src/app/validators/cpf-form.validator';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {

  public clienteForm: FormGroup

  constructor(
    private clienteService: ClienteService,
    private router: Router, 
    private formBuilder: FormBuilder
  ) {  }

  ngOnInit(): void {
    this.clienteForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(120)]],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), CpfFormValidator.validar()]],
      celular: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      dataNascimento: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      termos: [false, [Validators.requiredTrue]],
      receberInfo: [false],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmacaoSenha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  public createAccount() : void {
    this.clienteService.create(this.clienteForm.value).subscribe(()=> {
       this.clienteService.showMessage('Conta criada com sucesso!');
       this.router.navigate(['/login']);
     });
  }

  public cancel(): void {
    this.router.navigate(['/']);
  }
}
