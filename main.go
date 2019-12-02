package main

import (
	"bufio"
	"fmt"
	"io"
	"log"
	"os"
	"strings"
	"text/template"
)

type TInstrucao = struct {
	comando					string
	parametro				string
}

type TFuncRota = func(entrada... TInstrucao)

type CRUD_MOD1_campos struct {
	Id						string
	Nome					string
	Titulo					string
}

type CRUD_MOD1_input struct {
	ModuleBase				string
	IdModulo				string
	Titulo					string
	TituloSingular			string
	Campos					[]CRUD_MOD1_campos
}

type TDSLExecutor struct {
	//Propriedades privadas
	comandoAtivo			TFuncRota
	bufferComandoAtivo		[]TInstrucao
	comandos           		map[string]TFuncRota
	CRUD_MOD1				CRUD_MOD1_input
}

const
	diretorioBase = "BASE/"

func (self *TDSLExecutor) gerarLinguagemObjeto(){
	var artefatos = [4]string{".html", "-form.js", "-main.js", "-table.js"}

	for _, array := range artefatos {
		tmpl := template.Must(template.ParseFiles("BASE/" + self.CRUD_MOD1.ModuleBase + array))

		f, err := os.Create("FINAL/" + self.CRUD_MOD1.IdModulo + array)
		defer f.Close()

		err = tmpl.Execute(f, self.CRUD_MOD1)

		if err != nil {
			log.Fatalf("Erro de execução: %s", err)
		}
	}
}

func (self *TDSLExecutor) criar_modulo(entrada... TInstrucao){
	for _, array := range entrada {
		switch comando := array.comando; comando {
		case "modulo_base":
			self.CRUD_MOD1.ModuleBase = array.parametro
		case "id_modulo":
			self.CRUD_MOD1.IdModulo = array.parametro
		case "titulo_modulo":
			self.CRUD_MOD1.Titulo = array.parametro
		case "titulo_singular_modulo":
			self.CRUD_MOD1.TituloSingular = array.parametro
		default:

		}

		fmt.Println("\tcriar_modulo: " + array.comando + ":" + array.parametro)
	}
}

func (self *TDSLExecutor) adicionar_campo(entrada... TInstrucao){

	self.CRUD_MOD1.Campos = append(self.CRUD_MOD1.Campos, CRUD_MOD1_campos{})

	for _, array := range entrada {
		switch comando := array.comando; comando {
		case "id_campo":
			self.CRUD_MOD1.Campos[len(self.CRUD_MOD1.Campos)-1].Id = self.CRUD_MOD1.IdModulo + "_" + array.parametro
			self.CRUD_MOD1.Campos[len(self.CRUD_MOD1.Campos)-1].Nome = array.parametro
		case "titulo_campo":
			self.CRUD_MOD1.Campos[len(self.CRUD_MOD1.Campos)-1].Titulo = array.parametro
		default:

		}

		fmt.Println("\tadicionar_campo: " + array.comando + ":" + array.parametro)
	}
}

func (self *TDSLExecutor) processaLinhaDSL(instrucao string) {
	if self.comandos[instrucao] != nil || instrucao == "FIM" {

		//Verifica se tem algum comando para executar em buffer
		if self.comandoAtivo != nil {
			self.comandoAtivo(self.bufferComandoAtivo...)

			//Limpa buffer comando anterior
			self.comandoAtivo = nil
			self.bufferComandoAtivo = make([]TInstrucao, 0)
		}

		if instrucao == "FIM" {
			self.gerarLinguagemObjeto()
		} else {
			self.comandoAtivo = self.comandos[instrucao]
		}

		fmt.Println(instrucao)
	} else {
		chave_valor_array := strings.SplitN(instrucao, " ", 2)

		//Ignora aspas
		chave_valor_array[1] = chave_valor_array[1][1:len(chave_valor_array[1])-1]

		chave_valor := TInstrucao{comando: chave_valor_array[0], parametro: chave_valor_array[1]}

		self.bufferComandoAtivo = append(self.bufferComandoAtivo, chave_valor)
	}
}

func (self *TDSLExecutor) ExecutaArquivoDSL(arquivoNome string){
	arquivo, err := os.Open(arquivoNome)
	defer arquivo.Close()

	if err != nil {
		fmt.Printf("Falha ao ler o arquvo \"%s\": %v\n", arquivoNome, err)
		return
	}

	leitor := bufio.NewReader(arquivo)

	var linha string

	for {
		linha, err = leitor.ReadString('\n')

		// Remove /r/n do fim da linha
		linha = strings.TrimRightFunc(linha, func(c rune) bool {
			return c == '\r' || c == '\n'
		})

		if linha != "" {
			self.processaLinhaDSL(linha)
		}

		if err != nil {
			break
		}
	}

	if err != io.EOF {
		fmt.Printf("Não foi possível ler até o fim do arquvo \"%s\": %v\n", arquivoNome, err)
	} else {
		self.processaLinhaDSL("FIM")
	}

	return
}

func Novo_TDSLExecutor() (novoObj *TDSLExecutor) {
	novoObj = &TDSLExecutor {
		comandoAtivo: nil,
		bufferComandoAtivo: make([]TInstrucao, 0),
		comandos: make(map[string]TFuncRota),
	}

	//Adicionando lista de comandos
	novoObj.comandos["criar_modulo"] = novoObj.criar_modulo
	novoObj.comandos["adicionar_campo"] = novoObj.adicionar_campo

	return
}

func main() {
	argumentos := os.Args
	if len(argumentos) < 2 {
		fmt.Print("É preciso informar o arquivo DSL para gerar um programa final.")
	} else {
		DSLExecutorObj := Novo_TDSLExecutor()
		DSLExecutorObj.ExecutaArquivoDSL(argumentos[1])
	}
}