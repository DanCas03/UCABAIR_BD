CREATE TABLE LUGAR(
  codigo serial primary key,
  nombre varchar(50) NOT NULL,
  tipo varchar(20) NOT NULL,
  fk_lugar integer,
  CONSTRAINT ch_tipo_lugar CHECK (tipo IN('estado','municipio','parroquia'))
);

CREATE TABLE ROL(
  Rol_Id serial primary key,
  Rol_Nombre varchar(50) NOT NULL
);


CREATE TABLE USUARIO (
Usu_Id serial primary key,
Usu_Nombre varchar(50) NOT NULL,
Usu_Contraseña varchar(50) NOT NULL, 
Rol_Id integer NOT NULL,
CONSTRAINT fk_Rol FOREIGN KEY (Rol_Id) REFERENCES ROL(Rol_Id)
);

CREATE TABLE CLIENTE(
Cli_Id serial primary key,
Cli_Nombre varchar(50) NOT NULL,
Cli_Direccion varchar(50) NOT NULL,
Cli_Monto_Acreditado integer NOT NULL,
Cli_Pag_Web varchar(50) NOT NULL,
Cli_Fecha_Ini_Op date NOT NULL,
codigo integer NOT NULL, 
Usu_Id integer NOT NULL,
CONSTRAINT fk_lugar FOREIGN KEY(codigo) REFERENCES LUGAR(codigo),
CONSTRAINT fk_usuario FOREIGN KEY(Usu_Id) REFERENCES USUARIO(Usu_Id)
);

CREATE TABLE PROVEEDOR(
Pro_Id serial primary key,
Pro_Nombre varchar(50) NOT NULL,
Pro_Direccion varchar(50) NOT NULL,
Pro_Pag_Web varchar(50) NOT NULL,
Pro_Fecha_Ini_Op date NOT NULL,
codigo integer NOT NULL, 
Usu_Id integer NOT NULL,
CONSTRAINT fk_lugar FOREIGN KEY(codigo) REFERENCES LUGAR(codigo),
CONSTRAINT fk_usuario FOREIGN KEY(Usu_Id) REFERENCES USUARIO(Usu_Id)
);

CREATE TABLE EMPLEADO(
Emp_Id serial primary key,
Emp_Nombre varchar(50) NOT NULL, 
Emp_Direccion varchar(50) NOT NULL,
Emp_Exp_Profesional varchar(50) NOT NULL,
Emp_Ano_Servicio integer NOT NULL,
Emp_Titulacion varchar(50) NOT NULL,
codigo integer NOT NULL,
Usu_Id integer NOT NULL,
CONSTRAINT fk_lugar FOREIGN KEY(codigo) REFERENCES LUGAR(codigo),
CONSTRAINT fk_usuario FOREIGN KEY(Usu_Id) REFERENCES USUARIO(Usu_Id)
);

