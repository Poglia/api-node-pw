create table academias (
	codigo serial primary key, 
	nome varchar(40) not null, 
	descricao varchar(40) not null, 
	sigla varchar(4) not null 	
);

insert into academias (nome, descricao, sigla) 
values ('ACAD 1', 'Academia do centro ', 'ACAD-C')
returning codigo, nome, descricao, sigla;

create table setores (
	codigo serial primary key, 
	numero integer not null, 
	descricao varchar(40) not null, 
	capacidade integer not null, 
	academia integer not null, 
	foreign key (academia) references academias (codigo)
);


insert into setores (numero, descricao, capacidade, academia) 
values (12, 'setor de supino', 12, 1), (13, 'Setor de esteiras', 12, 2)
returning codigo, numero, descricao, capacidade, predio;

-- criação da tabela equipamentos
create table pesos (
	codigo serial primary key, 
	descricao varchar(40) not null, 
	numero_serie varchar(40) not null, 
	valor numeric(10,2) not null, 
	setor integer not null, 
	foreign key (setor) references setores (codigo)
);

-- inserindo alguns registros na tabela equipamentos
insert into pesos (descricao, numero_serie, valor, setor) 
values ('Anilha', '23492384', 25, 1), ('Barra Supino', '6546544', 15, 1);


-- criação da tabela usuários
create table usuarios (
	email varchar(50) not null primary key, 
	senha varchar(20) not null, 
	tipo char(1)  not null, 
	check (tipo = 'T' or tipo = 'A' or tipo = 'U'),
	telefone varchar(14)  not null, 
	nome varchar(50) not null
);

-- inserindo alguns registros na tabela usuários
insert into usuarios (email, senha, tipo, telefone, nome) 
values ('jorgebavaresco@ifsul.edu.br', '123456', 'A','(54)99984-4348','Jorge Bavaresco'), 
('joao@ifsul.edu.br', '123456', 'U','(54)44484-4348','Joao');
