CREATE TABLE LUGAR(
  Lug_Id serial primary key,
  Lug_Nombre varchar(50) NOT NULL,
  Lug_Tipo varchar(20) NOT NULL,
  fk_lugar integer,
  CONSTRAINT ch_tipo_lugar CHECK (Lug_Tipo IN('estado','municipio','parroquia'))
  CONSTRAINT fk_lugar FOREIGN KEY(fk_lugar) REFERENCES LUGAR(Lug_Id)
);

CREATE TABLE ROL(
  Rol_Id serial primary key,
  Rol_Nombre varchar(50) NOT NULL
);


CREATE TABLE USUARIO (
Usu_Id serial primary key,
Usu_Nombre varchar(50) NOT NULL,
Usu_Contrasena varchar(50) NOT NULL, 
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
    Lug_Id integer NOT NULL, 
    Usu_Id integer NOT NULL,
    Cor_Id Integer NOT NULL,
    Tel_Id INTEGER NOT NULL,
    CONSTRAINT fk_lugar FOREIGN KEY(Lug_Id) REFERENCES LUGAR(Lug_Id),
    CONSTRAINT fk_usuario FOREIGN KEY(Usu_Id) REFERENCES USUARIO(Usu_Id),
    CONSTRAINT fk_correo FOREIGN KEY(Cor_Id) REFERENCES CORREO(Cor_Id),
    CONSTRAINT fk_telefono FOREIGN KEY(Tel_Id) REFERENCES TELEFONO(Tel_Id)
);

CREATE TABLE PROVEEDOR(
    Pro_Id serial primary key,
    Pro_Nombre varchar(50) NOT NULL,
    Pro_Direccion varchar(50) NOT NULL,
    Pro_Pag_Web varchar(50) NOT NULL,
    Pro_Fecha_Ini_Op date NOT NULL,
    Lug_Id integer NOT NULL, 
    Usu_Id integer NOT NULL,
    Cor_Id integer NOT NULL,
    Tel_Id Integer NOT NULL,
    CONSTRAINT fk_lugar FOREIGN KEY(Lug_Id) REFERENCES LUGAR(Lug_Id),
    CONSTRAINT fk_usuario FOREIGN KEY(Usu_Id) REFERENCES USUARIO(Usu_Id),
    CONSTRAINT fk_correo FOREIGN KEY(Cor_Id) REFERENCES CORREO(Cor_Id),
    CONSTRAINT fk_telefono FOREIGN KEY(Tel_Id) REFERENCES TELEFONO(Tel_Id)
);

CREATE TABLE EMPLEADO(
    Emp_Id serial primary key,
    Emp_Nombre varchar(50) NOT NULL, 
    Emp_Direccion varchar(50) NOT NULL,
    Emp_Exp_Profesional varchar(50) NOT NULL,
    Emp_Ano_Servicio integer NOT NULL,
    Emp_Titulacion varchar(50) NOT NULL,
    Are_Id integer NOT NULL,
    Lug_Id integer NOT NULL,
    Usu_Id integer NOT NULL,
    Red_Id integer NOT NULL,
    Cor_Id Integer NOT NULL,
    Tel_Id INTEGER NOT NULL,
    CONSTRAINT fk_lugar FOREIGN KEY(Lug_Id) REFERENCES LUGAR(Lug_Id),
    CONSTRAINT fk_usuario FOREIGN KEY(Usu_Id) REFERENCES USUARIO(Usu_Id),
    CONSTRAINT fk_red_social FOREIGN KEY(Red_Id) REFERENCES RED_SOCIAL(Red_Id),
    CONSTRAINT fk_correo FOREIGN KEY(Cor_Id) REFERENCES CORREO(Cor_Id),
    CONSTRAINT fk_telefono FOREIGN KEY(Tel_Id) REFERENCES TELEFONO(Tel_Id),
    CONSTRAINT fk_area FOREIGN KEY(Are_Id) REFERENCES AREA(Are_Id)
);

CREATE TABLE TASA_CAMBIO(
    TasC_Id serial primary key, 
    TasC_Moneda varchar(50) NOT NULL,
    TasC_Valor  NUMERIC Not NULL  
)

CREATE TABLE PAGO(
    Pag_Id serial PRIMARY key,
    Pag_Monto integer NOT NULL,
    Pag_Concepto varchar(50) NOT NULL,
    Pag_Fecha DATE NOT NULL,
    Pag_Referencia varchar(50) NOT NULL,
    TasC_Id integer, 
    CONSTRAINT fk_Tasa_Cambio FOREIGN key(TasC_Id) REFERENCES TASA_CAMBIO(TasC_Id)
);

CREATE TABLE PAGO_EMPLEADO(
    PagE_Horas_Extra integer NOT NULL,
    PagE_Quincena integer NOT NULL,
    Pag_Id integer NOT NULL,
    Emp_Id integer NOT NULL,
    CONSTRAINT pk_empleado FOREIGN KEY(Emp_Id) REFERENCES EMPLEADO(Emp_Id),
    CONSTRAINT pk_Pago FOREIGN KEY(Pag_Id) REFERENCES PAGO(Pag_Id),
    PRIMARY KEY(Emp_Id, Pag_Id)
);

CREATE TABLE HORARIO(
    Hor_Id serial PRIMARY KEY, 
    Hor_Dia Varchar(50) NOT NULL,
    Hor_Hora_Entrada VARCHAR(50) NOT NULL, 
    Hor_Hora_Salida VARCHAR(50) NOT NULL,    
);

CREATE TABLE HORARIO_EMPLEADO(
    HorEmp_Turno_nocturno VARCHAR(50),
    Hor_Id integer NOT NULL,
    Emp_Id integer NOT NULL,
    CONSTRAINT pk_horario FOREIGN KEY(Hor_Id) REFERENCES HORARIO(Hor_Id),
    CONSTRAINT pk_empleado FOREIGN KEY(Emp_Id) REFERENCES EMPLEADO(Emp_Id),
    PRIMARY KEY (Emp_Id, Hor_Id)
);

CREATE TABLE BENEFICIARIO(
    Ben_Id serial,
    Ben_Nombre VARCHAR(50) NOT NULL,
    Ben_Telefono VARCHAR(50) NOT NULL,
    Emp_Id integer NOT NULL,
    CONSTRAINT pk_beneficiario FOREIGN KEY(Emp_Id) REFERENCES EMPLEADO(Emp_Id)
    PRIMARY KEY (Emp_Id, Ben_Id)
);

CREATE TABLE ASISTENCIA(
    Asi_Fecha_Asistencia DATE NOT NULL,
    Asi_Horas_Extras varchar(50) NOT NULL,
    Asi_Id Serial NOT NULL, 
    Hor_Id Integer NOT NULL,
    Emp_Id integer NOT NULL, 
    CONSTRAINT fk_Horario_Empleado1 FOREIGN KEY(Hor_Id) References HORARIO_EMPLEADO(Hor_Id),
    CONSTRAINT fk_Horario_Empleado2 FOREIGN KEY(Emp_Id) references HORARIO_EMPLEADO(Emp_Id),
    PRIMARY KEY (Hor_Id, Emp_Id, Asi_Id)
);

CREATE TABLE TELEFONO(
    Tel_Id SERIAL PRIMARY KEY,
    Tel_Numero INTEGER NOT NULL,
    Tel_Cod_Area INTEGER NOT NULL
);

CREATE TABLE CORREO(
    Cor_Id Serial PRIMARY KEY,
    Cor_Url VARCHAR(50) NOT NULL,
    Cor_Tipo VARCHAR(50) NOT NULL
);

CREATE TABLE RED_SOCIAL(
    Red_Id Serial PRIMARY KEY,
    Red_Nombre VARCHAR(50) NOT NULL,
    Red_Tipo VARCHAR(50) NOT NULL
); 


CREATE TABLE TIPO_PRUEBA(
    TipP_Id serial PRIMARY KEY,
    TipP_Nombre VARCHAR(50) NOT NULL,
    TipP_Descripcion VARCHAR(100) NOT NULL
)


CREATE TABLE CARACTERISTICA_AERONAVE(
    CarA_Id serial PRIMARY KEY,
    CarA_Nombre VARCHAR(50) NOT NULL,
);

CREATE TABLE MODELO_AERONAVE(
    ModA_Id serial PRIMARY KEY,
    ModA_Nombre VARCHAR(50) NOT NULL, 
);

CREATE TABLE MODELO_AERONAVE_CARACTERISTICA(
    ModACar_Valor integer NOT NULL,
    ModACar_Unidad VARCHAR(50) NOT NULL,
    ModA_Id INTEGER NOT NULL,
    CarA_Id INTEGER NOT NULL,
    CONSTRAINT fk_modelo_aeronave FOREIGN KEY(ModA_Id) REFERENCES MODELO_AERONAVE(ModA_Id),
    CONSTRAINT fk_caracteristica_aeronave FOREIGN KEY(CarA_Id) REFERENCES CARACTERISTICA_AERONAVE(CarA_Id),
    PRIMARY KEY(ModA_Id, CarA_Id)
);

CREATE TABLE CONFIGURACION_ASIENTO(
    ConA_Id serial PRIMARY KEY,
    ConA_Separacion FLOAT,
    ConA_Separacion FLOAT
    ModA_Id INTEGER NOT NULL,
    CONSTRAINT fk_modelo_aeronave FOREIGN KEY(ModA_Id) REFERENCES MODELO_AERONAVE(ModA_Id)
);

CREATE TABLE MODELO_PIEZA(
  ModP_Id serial primary key,
  ModP_Tipo varchar(50) NOT NULL,
  ModP_Nombre varchar(20) NOT NULL,
  modelo_pieza integer,
  CONSTRAINT fk_modelo_pieza FOREIGN KEY(modelo_pieza) REFERENCES MODELO_PIEZA(ModP_Id)
);

CREATE TABLE MODELO_AERONAVE_PIEZA(
    ModA_Id INTEGER NOT NULL,
    ModP_Id INTEGER NOT NULL,
    CONSTRAINT fk_modelo_aeronave FOREIGN KEY(ModA_Id) REFERENCES MODELO_AERONAVE(ModA_Id),
    CONSTRAINT fk_modelo_pieza FOREIGN KEY(ModP_Id) REFERENCES MODELO_PIEZA(ModP_Id),
    PRIMARY KEY(ModA_Id, ModP_Id)
);

CREATE TABLE MAQUINARIA(
    Maq_Id serial PRIMARY KEY,
    Maq_Tipo VARCHAR(50),
    Are_Id INTEGER NOT NULL,
    CONSTRAINT fk_area FOREIGN KEY(Are_Id) REFERENCES AREA(Are_Id)
);

CREATE TABLE SEDE(
    Sed_Id serial PRIMARY KEY,
    Sed_Nombre VARCHAR(50),
    Sed_Direccion VARCHAR(50),
    Sed_Fecha_Ini_Op DATE NOT NULL,
    Lug_Id INTEGER NOT NULL,
    CONSTRAINT fk_lugar FOREIGN KEY(Lug_Id) REFERENCES LUGAR(Lug_Id)
);

CREATE TABLE ZONA(
    Zon_Id serial PRIMARY KEY,
    Zon_Nombre VARCHAR(50),
    Zon_Tipo VARCHAR(50),
    Zon_Descripcion VARCHAR(100),
    Zon_Ubicacion VARCHAR(50),
    Sed_Id INTEGER NOT NULL,
    CONSTRAINT fk_Sede FOREIGN KEY(Sed_Id) REFERENCES SEDE(Sed_Id)
);

CREATE TABLE AREA(
    Are_Id serial PRIMARY KEY,
    Are_Nombre VARCHAR(50),
    Are_Tipo VARCHAR(50),
    Are_Descripcion VARCHAR(100),
    Are_Ubicacion VARCHAR(50),
    Zon_Id INTGER NOT NULL,
    CONSTRAINT fk_zona FOREIGN KEY(Zon_Id) REFERENCES ZONA(Zon_Id)
);

CREATE TABLE EQUIPO(
    Equ_Id serial PRIMARY KEY,
    Equ_Nombre VARCHAR(50) NOT NULL,
    Equ_Descripcion VARCHAR(100) NOT NULL,
    CONSTRAINT fk_area FOREIGN KEY(Are_Id) REFERENCES AREA(Are_Id)
);

CREATE TALE EMPLEADO_EQUIPO(
    EmpE_Jefe_de_Equipo VARCHAR(50) NOT NULL,
    CONSTRAINT fk_empleado FOREIGN KEY(Emp_Id) REFERENCES EMPLEADO(Emp_Id),
    CONSTRAINT fk_equipo FOREIGN KEY(Equ_Id) REFERENCES EQUIPO(Equ_Id),
    PRIMARY KEY(Emp_Id,Equ_Id)
);

CREATE TABLE PRUEBA(
    Pru_Id serial PRIMARY KEY,
    Pru_Fecha_Inicio DATE NOT NULL,
    Pru_Fecha_Fin DATE,
    TipP_Id INTEGER NOT NULL,
    Equ_Id INTEGER NOT NULL,
    CONSTRAINT fk_tipo_prueba FOREIGN KEY(TipP_Id) REFERENCES TIPO_PRUEBA(TipP_Id),
    CONSTRAINT fk_equipo FOREIGN KEY(Equ_Id) REFERENCES EQUIPO(Equi_Id)
);

CREATE TABLE ALMACEN(
    Alm_Id serial PRIMARY KEY,
    Alm_Capacidad INTEGER NOT NULL
)

CREATE TABLE CARACTERISTICA_PIEZA (
    CarP_Id serial PRIMARY KEY,
    CarP_Nombre VARCHAR(50) NOT NULL

)

CREATE TABLE MODELO_PIEZA_CARACTERISTICA(
    ModPCar_Valor INTEGER NOT NULL,
    ModPCar_Unidad VARCHAR(50) NOT NULL,
    ModP_Id INTEGER NOT NULL,
    CarP_Id INTEGER NOT NULL,
    CONSTRAINT fk_modelo_pieza FOREIGN KEY(ModP_Id) REFERENCES MODELO_PIEZA(ModP_Id),
    CONSTRAINT fk_caracteristica_pieza FOREIGN KEY(CarP_Id) REFERENCES CARACTERISTICA_PIEZA(CarP_Id),
    PRIMARY KEY(ModP_Id, CarP_Id)
);

CREATE TABLE EMBALAJE(
    Emb_Id serial PRIMARY KEY,
    Emb_Tipo VARCHAR(50),
    Equ_Id INTEGER NOT NULL,
    Emp_Id INTEGER NOT NULL,
    CONSTRAINT fk_equipo FOREIGN KEY(Equ_Id) REFERENCES EQUIPO(Equ_Id),
    CONSTRAINT fk_embalaje FOREIGN KEY(Emp_Id) REFERENCES EMPLEADO(Emp_Id)
);

CREATE TABLE METODO_PAGO(
    MetP_Id serial PRIMARY KEY,
    TarD_Numero integer,
    TarD_Fecha DATE,
    TarD_CVV INTEGER,
    TarD_Banco varchar(50),
    TarC_Numero Integer,
    TarC_Fecha_vencimiento DATE,
    TarC_CVV INTEGER,
    TarC_Banco VARCHAR(50),
    Tra_Fecha DATE,
    Tra_Banco VARCHAR(50),
    Efe_Donominacion VARCHAR(50),
    Che_Numero INTEGER,
    Che_Banco VARCHAR(50),
    PagM_Referencia INTEGER,
    PagM_Banco VARCHAR(50),
    PagM_Telefono INTEGER,
    MetP_Tipo VARCHAR(50) NOT NULL,
    CONSTRAINT ch_tipo_MetP CHECK (MetP_Tipo IN('TD','TC','TR','EF','CH','PM'))
);

CREATE TABLE SOLICITUD_FABRICACION(
    SolF_Id serial PRIMARY KEY,
    SolF_Fecha_Solicitud DATE NOT NULL,
    SolF_Fecha_Estimada DATE NOT NULL,
    SolF_Fecha_Culmin DATE,
    ModA_Id INTEGER NOT NULL,
    CONSTRAINT fk_modelo_aeronave FOREIGN KEY(ModA_Id) REFERENCES MODELO_AERONAVE(ModA_Id)
);

CREATE TABLE VENTA_FACTURA(
    VenF_Id serial,
    VenF_Numero_Factura VARCHAR(50) NOT NULL,
    VenF_Fecha_Hora DATE NOT NULL,
    VenF_Monto_Total NUMERIC NOT NULL,
    VenF_Impuesto_Total NUMERIC NOT NULL,
    Cli_Id INTEGER NOT NULL,
    SolF_Id INTEGER NOT NULL,
    CONSTRAINT fk_cliente FOREIGN KEY(Cli_Id) REFERENCES CLIENTE(Cli_Id),
    CONSTRAINT fk_solicitud_fabricacion FOREIGN KEY(SolF_Id) REFERENCES SOLICITUD_FABRICACION(SolF_Id),
    PRIMARY KEY(VenF_Id, Cli_Id, SolF_Id)
);

CREATE TABLE SOLICITUD_SEDES(
    SolSed_Id serial PRIMARY KEY,
    SolSed_Fecha_Solicitud DATE NOT NULL,
    SolSed_Cantidad INTEGER NOT NULL,
    Sed_Id1 INTEGER NOT NULL,
    Sed_Id2 INTEGER NOT NULL,
    CONSTRAINT fk_sede_llegada FOREIGN KEY(Sed_Id1) REFERENCES SEDE(Sed_Id)
    CONSTRAINT fk_sede_salida FOREIGN KEY(Sed_Id2) REFERENCES SEDE(Sed_Id)
);

CREATE TABLE ESTATUS(
    Est_Id serial PRIMARY KEY,
    Est_Descripcion VARCHAR(100) NOT NULL
    SolF_Id INTEGER NOT NULL,
    CONSTRAINT fk_solicitud_fabricacion FOREIGN KEY(SolF_Id) REFERENCES SOLICITUD_FABRICACION(SolF_Id)
);

CREATE TABLE COMPRA_FACTURA(
    ComF_Id serial,
    ComF_Numero_Factura VARCHAR(50) NOT NULL,
    ComF_Fecha_Hora DATE NOT NULL,
    ComF_Monto_Total NUMERIC NOT NULL,
    ComF_Impuesto_Total NUMERIC NOT NULL,
    Pro_Id INTEGER NOT NULL,
    Met_Id INTEGER NOT NULL,
    CONSTRAINT fk_proveedor FOREIGN KEY(Pro_Id) REFERENCES PROVEEDOR(Pro_Id),
    CONSTRAINT fk_MetP FOREIGN KEY(Met_Id) REFERENCES METODO_PAGO(Met_Id),
    PRIMARY KEY(ComF_Id, Pro_Id, Met_Id)
)

CREATE TABLE DETALLE_COMPRA(
    DetC_Id serial,
    DetC_Cantidad INTEGER NOT NULL,
    DetC_Precio_Unitario NUMERIC NOT NULL,
    ComF_Id INTEGER NOT NULL,
    Pro_Id INTEGER NOT NULL,
    Met_Id INTEGER NOT NULL,
    MatP_Id INTEGER NOT NULL,
    CONSTRAINT fk_compra_factura FOREIGN KEY(ComF_Id) REFERENCES COMPRA_FACTURA(ComF_Id),
    CONSTRAINT fk_proveedor FOREIGN KEY(Pro_Id) REFERENCES COMPRA_FACTURA(Pro_Id),
    CONSTRAINT fk_met FOREIGN KEY(Met_Id) REFERENCES COMPRA_FACTURA(Met_Id),
    CONSTRAINT fk_materia_pieza FOREIGN KEY(MatP_Id) REFERENCES MATERIA_PRIMA(MatP_Id),
    PRIMARY KEY(DetC_Id, MatP_Id)
)

CREATE TABLE MATERIA_PRIMA(
    MatP_Id serial PRIMARY KEY,
    MatP_Nombre VARCHAR(50) NOT NULL,
    MatP_Descripcion VARCHAR(100) NOT, 
    MatP_Unicad_Medida VARCHAR(50) NOT NULL
    SolSed_Id INTEGER,
    CONSTRAINT fk_solicitud_sedes FOREIGN KEY(SolSed_Id) REFERENCES SOLICITUD_SEDES(SolSed_Id)
);

CREATE TABLE AERONAVE(
    Aer_Id serial PRIMARY KEY,
    Aer_Fecha_Inicio_Fabrica DATE,
    Aer_Nombre VARCHAR(50),
    ModA_Id INTEGER NOT NULL,
    Sed_Id INTEGER NOT NULL,
    Ens_Id INTEGER NOT NULL,   COLOCAR CUANDO SE TERMINE PARTE ENSAMBLADO
    CONSTRAINT fk_ensamblado FOREIGN KEY(Ens_Id) REFERENCES ENSAMBLADO(Ens_Id)
    CONSTRAINT fk_modelo_aeronave FOREIGN KEY(ModA_Id) REFERENCES MODELO_AERONAVE(ModA_Id),
    CONSTRAINT fk_sede FOREIGN KEY(Sed_Id) REFERENCES SEDE(Sed_Id),
);

CREATE TABLE PIEZA(
    Pie_Id serial PRIMARY KEY,
    Pie_Nombre VARCHAR(50) NOT NULL,
    ModP_Id INTEGER NOT NULL,
    Aer_Id INTEGER NOT NULL,
    Sed_Id INTEGER NOT NULL,
    Fk_Pie_Id INTEGER,
    CONSTRAINT fk_pieza FOREIGN KEY(Fk_Pie_Id) REFERENCES PIEZA(Pie_Id),
    CONSTRAINT fk_modelo_pieza FOREIGN KEY(ModP_Id) REFERENCES MODELO_PIEZA(ModP_Id),
    CONSTRAINT fk_aeronave FOREIGN KEY(Aer_Id) REFERENCES AERONAVE(Aer_Id),
    CONSTRAINT fk_sede FOREIGN KEY(Sed_Id) REFERENCES SEDE(Sed_Id)
);

CREATE TABLE EMBALAJE_PIEZA(
    EmbP_Id serial,
    EmbP_Fecha_Inicio DATE NOT NULL,
    EmbP_Fecha_Estimada DATE NOT NULL,
    EmbP_Fecha_Terminada DATE,
    Emb_Id INTEGER NOT NULL,
    Pie_Id INTEGER NOT NULL,
    CONSTRAINT pk_embalaje FOREIGN KEY(Emb_Id) REFERENCES EMBALAJE(Emb_Id),
    CONSTRAINT pk_pieza FOREIGN KEY(Pie_Id) REFERENCES PIEZA(Pie_Id),
    PRIMARY KEY(EmbP_Id, Emb_Id, Pie_Id)
);

CREATE TABLE ESTATUS_AERONAVE(
    EstA_Id serial NOT NULL,
    EstA_Fecha_Inicio DATE NOT NULL,
    EstA_Fecha_Fin DATE,
    Est_Id INTEGER NOT NULL,
    Aer_Id INTEGER NOT NULL,
    CONSTRAINT fk_estatus FOREIGN KEY(Est_Id) REFERENCES ESTATUS(Est_Id),
    CONSTRAINT fk_aeronave FOREIGN KEY(Aer_Id) REFERENCES AERONAVE(Aer_Id),
    primary key(Est_Id, Aer_Id, EstA_Id) 
);

CREATE TABLE ENSAMBLADO(
  Ens_Id serial PRIMARY KEY,
  Ens_Nombre VARCHAR(50) NOT NULL,
  Ens_Tipo VARCHAR(50) NOT NULL,
  Equ_Id INTEGER,
  CONSTRAINT fk_equipo FOREIGN KEY(Equ_Id) REFERENCES EQUIPO(Equ_Id)
);

CREATE TABLE INVENTARIO(
    Inv_Id serial PRIMARY KEY,
    Inv_Cantidad INTEGER,
    fk_almacen INTEGER NOT NULL,
    fk_materia_prima INTEGER NOT NULL,
    CONSTRAINT fk_almacen FOREIGN KEY(Alm_Id) REFERENCES ALMACEN(Alm_Id),
    CONSTRAINT fk_materia_prima FOREIGN KEY(MatP_Id) REFERENCES MATERIA_PRIMA(MatP_Id) 
);

CREATE TABLE MOVIMIENTO_INVENTARIO(
    MovI_Id serial PRIMARY KEY,
    MovI_Tipo VARCHAR(50),
    MovI_Fecha DATE,
    MovI_Cantidad,
    fk_inventario INTEGER NOT NULL,
    CONSTRAINT fk_inventario FOREIGN KEY(Inv_Id) REFERENCES INVENTARIO(Inv_Id)
);

CREATE TABLE ENVIO(
    Env_Id serial PRIMARY KEY,
    Env_Fecha_Salida DATE,
    Env_Fecha_Llegada_Est DATE,
    Env_Fecha_Llegada_Real DATE,
    sede_llegada INTEGER NOT NULL,
    sede_salida INTEGER NOT NULL,
    SolS_Id INTEGER,
    EmbP_Id INTEGER,
    CONSTRAINT fk_sede_llegada FOREIGN KEY(sede_llegada) REFERENCES SEDE(Sed_Id),
    CONSTRAINT fk_sede_salida FOREIGN KEY(sede_salida) REFERENCES SEDE(Sed_Id),
    CONSTRAINT fk_solicitud_sedes FOREIGN KEY(SolS_Id) REFERENCES SOLICITUD_SEDES(SolS_Id),
    CONSTRAINT fk_embalaje_pieza FOREIGN KEY(EmbP_Id) REFERENCES EMBALAJE_PIEZA(EmbP_Id)
);

CREATE TABLE ENSAMBLADO_PIEZA(
    EnsPie_Id serial,
    EnsPie_Fecha_Inicio DATE NOT NULL,
    EnsPie_Fecha_Estimada DATE NOT NULL,
    EnsPie_Fecha_Fin DATE NOT NULL,
    Ens_Id INTEGER NOT NULL,
    Pie_Id INTEGER NOT NULL,
    CONSTRAINT pk_ensamblado FOREIGN KEY(Ens_Id) REFERENCES ENSAMBLADO(Ens_Id),
    CONSTRAINT pk_pieza FOREIGN KEY(Pie_Id) REFERENCES PIEZA(Pie_Id),
    PRIMARY KEY(EnsPie_Id, Ens_Id, Pie_Id)
);

CREATE TABLE PRUEBA_MATERIA_PRIMA(
    PruM_Fecha_Estimada DATE NOT NULL,
    PruM_Resultado VARCHAR(50),
    MatP_Id INTEGER NOT NULL,
    Pru_Id INTEGER NOT NULL,
    CONSTRAINT fk_materia_prima FOREIGN KEY(MatP_Id) REFERENCES MATERIA_PRIMA(MatP_Id),
    CONSTRAINT fk_prueba FOREIGN KEY(Pru_Id) REFERENCES PRUEBA(Pru_Id),
    PRIMARY KEY(MatP_Id, Pru_Id)
);

CREATE TABLE ESTATUS_PIEZA(
    EstP_Descripcion VARCHAR(100) NOT NULL,
    EstP_Fecha_Inicio DATE NOT NULL,
    EstP_Fecha_Fin DATE,
    Est_Id INTEGER NOT NULL,
    Pie_Id INTEGER NOT NULL,
    CONSTRAINT fk_estatus FOREIGN KEY(Est_Id) REFERENCES ESTATUS(Est_Id),
    CONSTRAINT fk_pieza FOREIGN KEY(Pie_Id) REFERENCES PIEZA(Pie_Id),
    PRIMARY KEY(Est_Id, Pie_Id)
);

