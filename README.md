# Melhorias

## Obs: já não usava Realm a algum tempo
### * Abstrair métodos do Realm para desacoplar do projeto.
### * Pesquisar sobre as tipagens utilizando generics para os retornos dos dados, em minha tentativa superficial, tive problemas com a mescla do objeto do Realm Realm.Results<Realm.Object>.
### * Pesquisar sobre bug de objeto vazio para app.currentUser.
### * Implementar  melhor maneira de manter o padrão de dados Realm / Backend.
### * Implementar checagem de dados já existentes no Realm na sincronização Backend -> Realm, resolvido temporariamente com try cath para que a inserção de novos checklists não pare nos conflitos.
### * Implementar gerenciamento de querys: rtk-query, react-query, etc; Facilitaria muito as sincronizações de dados


# Features
Infelizmente pelo tempo não pude implementar as features de adição de checklist e edição, também pensei em um cadastro de modelos de checklist pre-preenchidos utilizando o Realm
