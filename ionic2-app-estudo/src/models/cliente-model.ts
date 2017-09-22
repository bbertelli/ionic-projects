import { FormGroup } from "@angular/forms";

export class ClienteModel {
  private id: number;
  private nome: string;
  private cnpj: string;
  private classificacao: string;
  private segmento: string;
  private endereco: string;
  private cidade: string;
  private estado: string;
  private pais: string;
  private atrasos: number;
  private valorAtrasos: number;
  private contatoPadrao: number;
  private ativo: number;
  private cadastroIncompleto: number;

  constructor() {}

  public objetoClienteCadastro(clienteCadastroValidationForm: FormGroup) {
    return {
      id: null,
      nome: clienteCadastroValidationForm.controls.nome.value,
      cnpj: clienteCadastroValidationForm.controls.cnpj.value,
      classificacao: null,
      segmento: clienteCadastroValidationForm.controls.segmento.value,
      endereco: clienteCadastroValidationForm.controls.endereco.value,
      cidade: clienteCadastroValidationForm.controls.cidade.value,
      estado: clienteCadastroValidationForm.controls.estado.value,
      pais: "Brasil",
      atrasos: 0,
      valorAtrasos: 0,
      contatoPadrao: null,
      ativo: 1,
      cadastroIncompleto: 1
    };
  }

  public objetoClienteAtualizarCadastro(
    cliente: any,
    clienteValidationForm: FormGroup
  ) {
    let cadastroIncompleto;

    if (
      clienteValidationForm.controls.nome.value != "" &&
      clienteValidationForm.controls.cnpj.value != "" &&
      clienteValidationForm.controls.segmento.value != "" &&
      clienteValidationForm.controls.endereco.value != "" &&
      clienteValidationForm.controls.cidade.value != "" &&
      clienteValidationForm.controls.estado.value != "" &&
      clienteValidationForm.controls.atrasos.value != "" &&
      clienteValidationForm.controls.valorAtrasos.value != "" &&
      clienteValidationForm.controls.contatoPadrao.value != ""
    ) {
      cadastroIncompleto = 0;
    } else {
      cadastroIncompleto = 1;
    }

    return {
      id: cliente.id,
      nome: clienteValidationForm.controls.nome.value,
      cnpj: clienteValidationForm.controls.cnpj.value,
      classificacao: cliente.classificacao,
      segmento: clienteValidationForm.controls.segmento.value,
      endereco: clienteValidationForm.controls.endereco.value,
      cidade: clienteValidationForm.controls.cidade.value,
      estado: clienteValidationForm.controls.estado.value,
      pais: cliente.pais,
      atrasos: clienteValidationForm.controls.atrasos.value,
      valorAtrasos: clienteValidationForm.controls.valorAtrasos.value,
      contatoPadrao: clienteValidationForm.controls.contatoPadrao.value,
      ativo: cliente.ativo,
      cadastroIncompleto: cadastroIncompleto
    };
  }
}
