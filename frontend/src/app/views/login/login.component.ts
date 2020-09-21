import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public loginForm: FormGroup
    
  constructor(
    private clienteService: ClienteService,
    private router: Router, 
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      agencia: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      conta: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  public login() : void {
    this.clienteService.showMessage('Login realizado!');
    this.router.navigate(['/home']);
  }
}
