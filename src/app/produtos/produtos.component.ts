import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Produto } from '../model/produtos.model';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  produtos$: any;
  filtroDoProduto$: any;

  displayedColumns = ['nome', 'preco', 'estoque', 'operations'];

  @ViewChild('nome') nomeproduto: any = '';

  produtoFormulario = this.fb.group({
    id: [undefined],
    nome: ['', [Validators.required]],
    estoque: [0, [Validators.required]],
    preco: [0, [Validators.required]]
  });

  constructor(
    private fb :FormBuilder,
    private produtoService: ProdutoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.produtos$ = this.produtoService.getProdutos()
  }

  enviar() {
    let p: Produto = this.produtoFormulario.value
    if (!p.id) {
      this.addProduto(p)
    } else {
      this.editarProduto(p)
    }
  }

  addProduto(p: Produto) {
    this.produtoService.addProdutos(p)
      .then(() => {
        this.snackBar.open('Produto adicionado.', 'Ok', {duration: 2000});
        this.produtoFormulario.reset({nome: '', estoque: 0, preco: 0, id: undefined})
        this.nomeproduto.nativeElement.focus()
      })
      .catch(() => {
        this.snackBar.open('Erro ao adicionar produto.', 'Ok', {duration: 2000})
      })
  }

  editarProduto(p: Produto) {
    this.produtoService.editarProduto(p)
      .then(() => {
        this.snackBar.open('Produto editado.', 'Ok', {duration: 2000});
        this.produtoFormulario.reset({nome: '', estoque: 0, preco: 0, id: undefined})
        this.nomeproduto.nativeElement.focus()
      })
      .catch(() => {
        this.snackBar.open('Erro ao editar o produto.', 'Ok', {duration: 2000})
      })
    //this.produtoFormulario.setValue(p)
  }

  edit(p: Produto) {
    this.produtoFormulario.setValue(p)
  }

  del(p: Produto) {
    this.produtoService.deletarProduto(p)
      .then(() => {
        this.snackBar.open('Produto removido.', 'Ok', {duration: 2000});
      })
      .catch(() => {
        this.snackBar.open('Erro ao remover o produto.', 'Ok', {duration: 2000})
      })
  }

  filtro(event: any) {
    this.filtroDoProduto$ = this.produtoService.pesquisaPorNome(event.target.value)
  }
}
