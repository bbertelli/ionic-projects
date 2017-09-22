import { FormGroup } from "@angular/forms";

export class ContatoModel {
  private cliente: any;
  private nome: string;
  private apelido: string;
  private funcao: string;
  private fone: string;
  private aniversario: Date;
  private email: string;
  private observacao: string;
  private ativo: number;
  private cadastroIncompleto: number;

  constructor() {}

  public objetoContatoCadastro(
    idCliente: any,
    contatoCadastroValidationForm: FormGroup
  ) {
    let cadastroIncompleto;

    if (
      contatoCadastroValidationForm.controls.nome.value != "" &&
      contatoCadastroValidationForm.controls.apelido.value != "" &&
      contatoCadastroValidationForm.controls.funcao.value != "" &&
      contatoCadastroValidationForm.controls.fone.value != "" &&
      contatoCadastroValidationForm.controls.aniversario.value != "" &&
      contatoCadastroValidationForm.controls.email.value != "" &&
      contatoCadastroValidationForm.controls.observacao.value != ""
    ) {
      cadastroIncompleto = 0;
    } else {
      cadastroIncompleto = 1;
    }

    return {
      nome: contatoCadastroValidationForm.controls.nome.value,
      apelido: contatoCadastroValidationForm.controls.apelido.value,
      funcao: contatoCadastroValidationForm.controls.funcao.value,
      fone: contatoCadastroValidationForm.controls.fone.value,
      aniversario: contatoCadastroValidationForm.controls.aniversario.value,
      email: contatoCadastroValidationForm.controls.email.value,
      observacao: contatoCadastroValidationForm.controls.observacao.value,
      ativo: 1,
      cadastroIncompleto: cadastroIncompleto,
      cliente: {
        id: idCliente
      }
    };
  }

  public objetoContatoAtualizar(
    idContato: any,
    idCliente: any,
    contatoValidationForm: FormGroup
  ) {
    let cadastroIncompleto;

    if (
      contatoValidationForm.controls.nome.value != "" &&
      contatoValidationForm.controls.apelido.value != "" &&
      contatoValidationForm.controls.funcao.value != "" &&
      contatoValidationForm.controls.fone.value != "" &&
      contatoValidationForm.controls.aniversario.value != "" &&
      contatoValidationForm.controls.email.value != "" &&
      contatoValidationForm.controls.observacao.value != ""
    ) {
      cadastroIncompleto = 0;
    } else {
      cadastroIncompleto = 1;
    }

    return {
      id: idContato,
      nome: contatoValidationForm.controls.nome.value,
      apelido: contatoValidationForm.controls.apelido.value,
      funcao: contatoValidationForm.controls.funcao.value,
      fone: contatoValidationForm.controls.fone.value,
      aniversario: contatoValidationForm.controls.aniversario.value,
      email: contatoValidationForm.controls.email.value,
      observacao: contatoValidationForm.controls.observacao.value,
      ativo: 1,
      cadastroIncompleto: cadastroIncompleto,
      cliente: {
        id: idCliente
      }
    };
  }
}
