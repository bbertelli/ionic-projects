import { Values } from "./../app/values";
export class VisitaModel {
  private dataPlanejada: Date;
  private dataFechamento: Date;
  private contatoPlanejado: number;
  private contatoRealizado: number;
  private objetivos: string;
  private reporte: string;
  private duracao: string;
  private audioGravado: string;
  private cliente: any;
  private usuario: any;
  private situacaoVisita: any;

  constructor() {}

  public objetoVisitaNaoAgendada(
    idCliente: any,
    data: Date,
    contato: number,
    duracao: string,
    audioGravado: string,
    idUsuario: any
  ) {
    return {
      dataPlanejada: null,
      dataFechamento: data,
      contatoPlanejado: null,
      contatoRealizado: contato,
      objetivos: null,
      reporte: null,
      duracao: duracao,
      audioGravado: audioGravado,
      cliente: {
        id: idCliente
      },
      usuario: {
        id: idUsuario
      },
      situacaoVisita: {
        id: Values.SITUACAO_VISITA_REALIZADA
      }
    };
  }

  public objetoVisitaAgendada(
    idCliente: any,
    data: Date,
    contato: number,
    objetivo: string,
    idUsuario: any
  ) {
    return {
      dataPlanejada: data,
      dataFechamento: null,
      contatoPlanejado: contato,
      contatoRealizado: null,
      objetivos: objetivo,
      reporte: null,
      duracao: null,
      audioGravado: null,
      cliente: {
        id: idCliente
      },
      usuario: {
        id: idUsuario
      },
      situacaoVisita: {
        id: Values.SITUACAO_VISITA_AGENDADA
      }
    };
  }
}
