import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Produto } from './model/produtos.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private produtosColecao: AngularFirestoreCollection<Produto> = this.afs.collection('produtos')

  constructor(private afs: AngularFirestore) { }

  getProdutos(): Observable<Produto[]> {
    return this.produtosColecao.valueChanges();
  }

  addProdutos(p: Produto) {
    p.id = this.afs.createId();
    return this.produtosColecao.doc(p.id).set(p);
    //return this.produtosColecao.add(p);
  }

  deletarProduto(p: Produto) {
    return this.produtosColecao.doc(p.id).delete();
  }

  editarProduto(p: Produto) {
    return this.produtosColecao.doc(p.id).set(p);
  }

  pesquisaPorNome(nome: any): Observable<Produto[]> {
    return this.afs.collection<Produto>('produtos',
      ref => ref.orderBy('nome').startAt(nome).endAt(nome+"\uf8ff"))
      .valueChanges();

    
  }
}
