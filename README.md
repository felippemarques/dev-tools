# ??? DevTools Pessoal (Meu Arsenal)

Um conjunto de ferramentas úteis para desenvolvedores Web (focado em stacks Microsoft/PHP), centralizadas numa interface limpa e sem anúncios.

## ?? Funcionalidades

### ?? Documentos
* **CPF e CNPJ:** Gerador (com/sem pontuação) e Validador real.
* **NFe/NFCe:** Validador de chave de acesso (44 dígitos).

### ?? Segurança
* **Gerador de Senhas:** Configurável (tamanho, símbolos, números).
* **Validador de E-mail:** Regex padrão W3C.
* **Testador de Regex:** Valida expressões regulares em tempo real.

### ?? Formatadores (Beautify)
* **JSON:** Identação e validação.
* **HTML:** Formatação com indentação inteligente.
* **XML:** Identação de nós.
* **SQL (DBA Style):** Formatação customizada estilo Red-Gate (Alinhamento vertical de variáveis, Joins e Where).

### ?? Comparador
* **Diff Checker:** Compara dois textos e destaca as diferenças (estilo Git).

## ?? Como rodar com Docker

1. Construa a imagem:
   ```bash
   docker build -t meu-devtools .