--Creando la base de datos
create database BDHospital2
--Abrir la base de datos
use BDHospital2
--Crear tablas
Create table Pacientes(
nss varchar(10) Primary Key not null,
nombres varchar(20) not null,
apellidos varchar(20) not null,
telefono varchar(20) not null,
codEps varchar(6) not null)
---------
Create table Medicos(
nroTarjeta varchar(10) Primary Key not null,
nombreComp varchar(30) not null,
especializacion varchar(20) not null)

Create table Citas(
codCita int Primary Key identity not null,
fecha date not null,
nss varchar(10) not null,
nroTarjeta varchar(10) not null,
hora time not null,
Consultorio varchar(3) not null)

Create table HistoriaClinica(
id int Primary Key identity not null,
codCita int not null,
tratamiento varchar(100) not null,
diagnostico varchar(30) not null)

Create table EPS(
codEps varchar(6) primary key not null,
nombreEps varchar(50) not null,
regimen varchar(10) not null)

--Codigo para activar el diagrama de la base de datos
ALTER AUTHORIZATION ON DATABASE::BDHospital2 TO SA

--Relaciones de las tablas

Alter Table Citas
add constraint fk_Cita_Medico
Foreign Key(nroTarjeta) references Medicos(nroTarjeta)

Alter Table Citas
add constraint fk_Cita_Paciente
Foreign Key(nss) references Pacientes(nss)

Alter Table HistoriaClinica
add constraint fk_Historia_Cita
Foreign key(codCita) references Citas(CodCita)

Alter Table Pacientes
add constraint fk_pacientes_eps
Foreign key(codEps) references EPS(codEps)

--Insertar datos en las tablas
insert into EPS values('EPS010','EPS Y MEDICINA PREPAGADA SURAMERICANA S.A.','CNT')
--Tabla Pacientes
insert into Pacientes values ('1002390112','Juan Pablo', 'Gomez Arias', '3216789090','EPS010')
insert into Pacientes values ('1002456789','Marcela', 'Salazar García', '3125679007','EPS010')
insert into Pacientes values ('1019003451','Pedro', 'Jaramillo Vasquez', '3219008972','EPS010')
insert into Pacientes values ('1028903441','Camila', 'Ramirez Rincon', '3128776655','EPS010')
insert into Pacientes values ('1018003452','Sandra', 'Colorado Ospina', '3116067890','EPS010')
--Tabla Medicos
insert into Medicos values('989', 'Julian Gomez','Pediatria')
insert into Medicos values('187', 'Gonzalo Arias','Otorrino')
insert into Medicos values('345', 'Patricia Escudero','Ginecologa')
insert into Medicos values('700', 'Juana Gomez', 'Cirujano')

--Tabla Citas
insert into Citas values ('01/12/2021', '1019003451', '187', '08:00:00', '304')
insert into Citas values ('02/24/2021', '1002456789', '345', '09:20:00', '305')
insert into Citas values ('01/05/2021', '1028903441', '187', '10:40:00', '303')
insert into Citas values ('02/07/2021', '1019003451', '989', '11:00:00', '306')
insert into Citas values ('01/18/2021', '1018003452', '345', '08:20:00', '302')
insert into Citas values ('01/21/2021', '1019003451', '989', '13:00:00', '304')
insert into Citas values ('02/02/2021', '1002456789', '345', '09:20:00', '305')
insert into Citas values ('01/16/2021', '1018003452', '345', '14:40:00', '303')
insert into Citas values ('02/14/2021', '1019003451', '989', '15:00:00', '306')
insert into Citas values ('01/27/2021', '1018003452', '345', '08:20:00', '302')

--
select * from HistoriaClinica

--delete  from citas
--Restablecer el autoincremento en las tablas
DBCC CHECKIDENT (citas, RESEED, 0);
select * from  citas

--Tabla HistoriClinica
insert into HistoriaClinica values(1,'Acetaminofen tres veces al día','estres')
insert into HistoriaClinica values(4,'Penicilina 2 veces al dia','amigdalitis')
insert into HistoriaClinica values(6, 'Ibuprofeno 3 veces al dia', 'migraña')
insert into HistoriaClinica values(2, 'Buscapina 2 veces al dia','colicos')
insert into HistoriaClinica values(7, 'Aspirina 3 veces al dia','Anticoagulante')
insert into HistoriaClinica values(9, 'Omeprazol 2 veces al dia', 'Gastritis')
select * from citas
--Modifica o actualizar un campo o varios campos de una tabla
Update Pacientes set nombres='Gabriela', telefono='3149876655' where nss='1028903441' 
select * from Pacientes
Update Citas set nroTarjeta='187', consultorio='311', hora='09:20:00' where codcita=10
select * from citas
Update Medicos set nroTarjeta='201' where nroTarjeta='187'
Select * from Medicos

--Eliminar Registros de las tablas
Delete from Medicos where nroTarjeta='700'
Delete from Citas where hora='15:00:00'

--Consultas con funciones de tipo Varchar
--Pasar un campo a Mayuscula
Select  UPPER(nombreComp) as 'Nombre Medico', nroTarjeta  from Medicos
--Pasar un campo a Minuscula
Select LOWER(nombres) as 'Nombres', LOWER(apellidos) as 'Apellidos' from pacientes
--Función para extraer posiciones a la izquierda de un texto
Select nombres, left(apellidos,2) as 'Inicial Apellido' from pacientes
--Función para extraer posiciones a la derecha de un texto
Select nombres, Right(apellidos,2) as 'Inicial Apellido' from pacientes
--Función para imprimir la cantidad de caracteres que esta en un campo
Select codCita, LEN(diagnostico) as 'Total caracteres' from HistoriaClinica
--Función para convertir un campo númerico a texto y concatenar
Select tratamiento + str(codCita) as 'Tratamiento por Cita' from HistoriaClinica
Select diagnostico + ' debes tomar ' + tratamiento as 'Historia' from HistoriaClinica
--Funcion para reemplazar parte de una cadena
Select nombres, stuff(nss,2,4,'CC') as 'Cédula' from pacientes
--Función para extraer parte de una cadena especifica
Select nombreComp, SUBSTRING(especializacion,1,5) as 'Diminutivo' from Medicos

--Modificar una tabla aplicando una función
select * from medicos
Update Medicos set nombreComp=upper(nombreComp)
select * from pacientes
--Modificar el indicativo a los telefonos reemplazando una parte del varchar
Update Pacientes set telefono = stuff(telefono,1,3,'323')

--Funciones para trabajar con Fechas
--Función para calcular el tiempo en dias, meses o años que ha transcurrido entre dos fechas 
Select consultorio, nroTarjeta, DateDiff(day,fecha,getDate()) as 'Dias trancurrida cita' from Citas
Select consultorio, nroTarjeta, DateDiff(month,fecha,getDate()) as 'Meses trancurridos cita' from Citas
Select consultorio, nroTarjeta, DateDiff(year,fecha,getDate()) as 'Años trancurridos cita' from Citas
---Funciones para extraer el dia, mes y año de una fecha
Select nss, year(fecha) as 'Año', month(fecha) as 'Mes', day(fecha) as 'Dia' from Citas
Select nss, year(fecha) as 'Año' from Citas
Select * from citas
Update Citas set fecha = '02/14/2019' where codCita=2

--SP_CONFIGURE 'default language', 5RECONFIGURE; -- Configurar fechas

--Between
--Consulta para muestre las citas entre dos fechas determinadas
Select nss, nroTarjeta, DateDiff(day,fecha,getDate()) as 'Dias posterior cita' from citas 
where DateDiff(day,fecha,getDate()) between 20 and 45
--Consulta por fechas
Select nroTarjeta, fecha  from citas where fecha between '01/20/2021' and '02/21/2021'
--Consultar los nombres de los pacientes que inicien entre 
select nss, nombres from pacientes where left(nombres,1) between 'J' and 'Q'
select nombres, apellidos from pacientes where RIGHT(apellidos,1) between 'a' and 'f'

--like
--Consultar los apellidos que inicien por s
Select * from pacientes where apellidos like 's%'
Select * from pacientes where apellidos like 'COL%'
--Consulta los nombres que tengan las letras an en cualquier posicion del campo
Select * from pacientes where nombres like '%an%'
Select * from pacientes where apellidos like '___a%'
Select left(nombres,3),telefono from pacientes where left(nombres,3) like '_a%'
--Consulta los nombres que su segunda letra no inicie ni por e ni por u
Select * from pacientes where nombres like '_[^eu]%' 
Select * from pacientes where apellidos not like '%jaramillo%'


--Comandos para consultas Relacionales
--Se utilizan tres tipos de comandos para relacionar las tablas.
--INNER JOIN - LEFT JOIN - RIGHT JOIN
--INNER JOIN: Muestra la información que coincide en ambas tablas.

Select pac.nombres, pac.telefono, cit.fecha, cit.consultorio from Pacientes pac inner join
Citas cit on pac.nss = cit.nss

Select pac.nombres, pac.telefono, cit.fecha, cit.consultorio from Pacientes pac left join
Citas cit on pac.nss = cit.nss

Select pac.nombres, pac.telefono, cit.fecha, cit.consultorio from Pacientes pac right join
Citas cit on pac.nss = cit.nss

--Consulta sin alias
select medicos.nombreComp, citas.Consultorio, citas.fecha from medicos inner join Citas on 
medicos.nroTarjeta=citas.nroTarjeta

--Realizar una consulta que muestre el tratamiento y diagnostico que ha tenido un paciente en cada
--cita según su historia clinica.

Select pac.nss, pac.nombres, cit.fecha, cit.consultorio, histo.tratamiento, histo.diagnostico from 
Pacientes pac inner join Citas cit on pac.nss=cit.nss inner join HistoriaClinica histo on 
cit.codCita = histo.codCita order by pac.nombres

select * from pacientes
select * from medicos
select * from citas
select * from HistoriaClinica

Select med.nombreComp as 'Nombre Médico', med.especializacion, cit.fecha, pac.nombres as 'Paciente' from 
Medicos med inner join Citas cit on med.nroTarjeta = cit.nroTarjeta inner join Pacientes pac  on 
pac.nss = cit.nss order by med.nombreComp, pac.nombres
go

---Adicionar un campo a la tabla citas
Alter Table Citas
add costoCita int null
--Actualizo el campo costoCita
Update Citas set costoCita=87000 where nroTarjeta='345'

Select * from citas
--Utilizar funciones matematicas básicas
--Totaliza el costo de las citas por consultorio
Select consultorio, sum(costoCita) as 'Total por Consultorio' from Citas group by consultorio
--Totaliza el costo de las citas por tarjeta profesional medico
Select nroTarjeta, sum(costoCita) as 'Total por TarjetaPROF' from Citas group by nroTarjeta
Select medicos.nombreComp, sum(Citas.costoCita) as 'Total por Médico' from Medicos inner join Citas 
on medicos.nroTarjeta=citas.nroTarjeta group by medicos.nombreComp
--Totaliza el promedio de las citas por consultorio
Select consultorio, avg(costoCita) as 'Total por Consultorio' from Citas group by consultorio
--Contar cuantas citas a tenido cada médico
Select medicos.nombreComp, count(Citas.costoCita) as 'Total por Médico' from Medicos inner join Citas 
on medicos.nroTarjeta=citas.nroTarjeta group by medicos.nombreComp

Select @@CONNECTIONS,
       @@SERVERNAME,
	   @@LANGUAGE,
	   @@VERSION,
	   @@FETCH_STATUS

--Transact SQL
--Declaración de variables
Begin
	Declare @Nombre varchar(40)
	Declare @fechaAct date
	Declare @inversionIni money
	Declare @inversionFin money
	Declare @Totalinversion money
	--Asignar un valor a una variable
	Set @Nombre = 'Juan';
	Set @fechaAct = getDate();
	Set @inversionIni = 945000.18	
	Set @inversionFin = 2345670.78
	--Asignar datos a variable con select
	Select @Totalinversion = @inversionIni+@inversionFin
	Select @Nombre [Nombre Cliente], @fechaAct [Fecha registro], @inversionIni [Inversión Inicial],
	@inversionFin [Inversion Final], @Totalinversion [Total inversion]
	Print ('Nombre Cliente: ' + @Nombre + ' Inversión Inicial ' + Cast(@inversionIni as varchar))
end
go

select * from citas
Begin
	Declare @totalCitas int = ( Select sum(costoCita) from Citas)
	Declare @citaMenosC int = (Select min(costoCita) from Citas)
	Declare @citaMaxC int = (Select max(costoCita) from Citas)
	print ('El total de ingresos por citas es ' + Cast(@totalCitas as varchar))
	print('La cita más econominica cuesta ' + cast(@citaMenosC as varchar))
	print('La cita más costosa cuesta ' + cast(@citaMaxC as varchar))
END
GO

--SENTENCIAS DE DECISION
--SINTAXIS IF
--if((Consulta)=xvalor)
--begin
----instrucciones xxxx
--end
--else
--begin
----instrucciones xxxx
--end

--Ejemplo con condicional if
--Realizar una condicion que verifique si el medico con tarjeta profesional nro 989, 
--ha tenido más de dos citas. Imprimir mensaje "Se aprueba continuidad", sino imprimir
--"Verificar continuidad del médico"

if((Select count(nroTarjeta) from Citas where nroTarjeta='345')>=4)
begin
   print 'Se aprueba continuidad'
end
else
begin
   print 'Verificar continuidad del médico'
end
go
select * from medicos

Alter Table Medicos
add fechaNacimiento date null
Update Medicos set fechaNacimiento='07/13/1990' where nombreComp='GONZALO ARIAS'
Update Medicos set fechaNacimiento='12/20/1993' where nombreComp='PATRICIA ESCUDERO'
Update Medicos set fechaNacimiento='05/12/1995' where nombreComp='JULIAN GOMEZ'

--Ejemplo condicional 2
--Genere el promedio de la edad de los medicos si es mayor o igual a 25, mostrar un 
--mensaje de lo contrario, mostrar otro mensaje

if((Select avg(DateDiff(year,fechaNacimiento,getDate())) from Medicos)>=30)
begin
  print 'El promedio de edad de los médicos, está por encima de 30'
end
else
begin
  print 'El promedio de edad de los médicos, por debajo de 30, están muy jovenes'
end

--Ejemplo condicional 3
--Condición que sume todas las citas y si el total es menor a 200000, sacar mensaje
--Deben asignar más citas, de lo contrario, otro mensaje.

if((Select sum(costoCita) from Citas)<200000)
begin
  print 'Debe asignar más citas'
end
else
begin
  print 'Las citas asignadas están ok'
end

-- El total de citas de un medico
Declare @NroMedico varchar(10)
Set @NroMedico =( Select nroTarjeta from Medicos where nombreComp='JULIAN GOMEZ')
if((Select sum(costoCita) from Citas where nroTarjeta=@NroMedico)<40000)
begin
  print 'Debe asignar más citas'
end
else
begin
  print 'Las citas asignadas están ok'
end

SELECT * FROM MEDICOS

--Validar si existe un médico antes de insertarlo a la tabla
--Insertar
declare @nroTarj varchar(10) = '988'
declare @nombreM varchar(30) = 'Gabriel Velasquez'
declare @especial varchar(20) = 'Neurologo'
declare @fechaN date = '01/19/1988'
if ( exists(Select * from medicos where nroTarjeta = @nroTarj))
begin
   Print 'Medico ya existe en la base de datos'
end
else
begin
   Insert into Medicos values(@nroTarj, @nombreM, @especial, @fechaN)
   print 'Medico fue ingresado con éxito'
end

select * from citas
--Condicional que imprima un mensaje informando si un paciente ha tenido más de dos citas
declare @nss varchar(10) = '1002456789'
if ((Select count(nss) from citas  where nss=@nss)>2)
begin
  print 'El paciente ha tenido más de dos citas en el hospital'
end
else
begin
  print 'El paciente ha tenido máximo dos citas'
end

--Condicional que imprima un mensaje informando si un paciente ha tenido citas medicas
declare @nombrep varchar(10) = 'Pedro'
declare @apellido varchar(20) = 'García Vasquez'
if ((Select count(citas.nss) from citas inner join pacientes on 
citas.nss=pacientes.nss where nombres=@nombrep and apellidos = @apellido)>0)
begin
  print 'El paciente ha tenido citas en el hospital'
end
else
begin
  print 'El paciente no tiene reportada ninguna cita'
end

select * from pacientes
select * from citas
select * from medicos

--Utilizando Condicional Case
--Consulta que imprima todas las fechas de nacimiento de los médicos en formato largo
select nombreComp, especializacion, cast( day(fechaNacimiento) as char(2)) +
case month(fechaNacimiento)
    when 1 then ' Enero ' 
	when 2 then ' Febrero '
	when 3 then ' Marzo '
	when 4 then ' Abril '
	when 5 then ' Mayo '
	when 6 then ' Junio '
	when 7 then ' Julio '
	when 8 then ' Agosto '
	when 9 then ' Septiembre '
	when 10 then ' Octubre '
	when 11 then ' Noviembre '
	when 12 then ' Diciembre '
end
+ cast(year(FechaNacimiento) as char(4)) as 'Fecha de Nacimiento'   from Medicos

Update Medicos set especializacion='Pediatria' where nroTarjeta='700'
Update Medicos set especializacion='Neurologo' where nroTarjeta='345'
--Mostrar cuantos especialistas hay dependiendo de un dato de entrada - utilizar case.
declare @espec varchar(10) = 'Pediatria'
Select 
case (@espec)
   when 'Otorrino' then count(especializacion) 
   when 'Neurologo' then count(especializacion)
   when 'Pediatria' then count (especializacion)
end
as 'Total Especialistas' from Medicos where especializacion=@espec 

select * from medicos

--Consulta que muestre cuantas personas su nombre inicia por un letra declarada en variable
declare @inicialNombre char(1) = 'g'
Select 
case(@inicialNombre)
   when 'g' then count(left(nombreComp,1)) 
   when 'j' then count(left(nombreComp,1))
   when 'p' then count(left(nombreComp,1))
   else 0
end
as 'Total inicial' from Medicos where left(nombreComp,1)=@inicialNombre

--Ciclo Mientras en SQL SERVER
--Codigo que muestre los numeros pares entre 1 y 50
declare @cont int = 1
while(@cont<=50)
begin
   if (@cont%2=0)
      begin
	    print 'El numero: ' + cast(@cont as char(2)) + ' es par '
	  end
	  set @cont = @cont+1
end

select * from citas

--Ciclo mientras que recorra una tabla y muestre registro por registro
declare @totalReg int
declare @contadorR int = 1
Select @totalReg = count(*) from citas
while(@contadorR<=@totalReg)
begin
  if (@contadorR>=4 AND @contadorR<=8)
  BEGIN
	Select codCita,Consultorio,CostoCita from citas where codCita = @contadorR
  END
  set @contadorR = @contadorR+1
end

--Ciclo Mientras para generar usuario y contraseña a 10 personas
declare @usuario varchar(10)
declare @contra varchar(10)
declare @contador int 
while(@contador<=10)
begin
  set @usuario = 'tdea'+cast(@contador as char(2))
  set @contra = 'usutdea' + cast(@contador as char(2))
  --Comandos para crear logins en Sql 
  execute('CREATE USER ' + @usuario)
  execute('CREATE LOGIN ' + @usuario + 'WITH PASSWORD ' + @contra)
  set @contador = @contador +1
  Print 'Usuario ' + @usuario + ' Contraseña ' + @contra
end

--PROCEDIMIENTOS ALMACENADOS
--Algunos procedimientos almacenados en el sistema
--Procedimiento que muestra los privilegios de una tabla
sp_column_privileges Citas

--Procedimiento que muestra todas las bases de datos del sistema
sp_databases

--Procedimiento almacenado que muestra la información del servidor
sp_server_info

--Procedimiento almacenado que muestra los primary Key de una tabla
sp_pKeys citas
sp_pKeys Pacientes

--Procedimiento almacenado que muestra los foreing Key de una tabla
sp_fkeys citas
sp_fkeys Medicos
sp_fkeys Pacientes
go
--Sintaxis para crear un procedimiento almacenado
--Create procedure Nombre_procedimiento
--Declarar parametros
---@parametro1 [tipo_dato1]
---@parametro2 [tipo_dato2]
--As
--<Instrucciones>


--Ejemplos
--Procedimiento almacenado que imprime un mensaje
Create Procedure saludar
AS
Print('Bienvenido al sitio web')

exec saludar
go
--Procedimiento almacenado que realiza una consulta simple a la base de datos
Create Procedure sp_consultaSimple
as
Select * from medicos where especializacion='Neurologo'
exec sp_consultaSimple
go
--Procedimiento almacenado que inserta un registro en la tabla Pacientes
Create Procedure sp_insertarPac
@numsocial as varchar(10),
@nomb as varchar(20),
@apell as varchar(20),
@telef as varchar(20)
as 
insert into Pacientes values(@numsocial,@nomb,@apell,@telef)

exec sp_insertarPac '200987654','Bibiana','Salazar','3456767'

go

--Procedimiento almacenado que modifica un registro en la tabla Pacientes
Create Procedure sp_ActualizarPac
@numsocial as varchar(10),
@nomb as varchar(20),
@apell as varchar(20),
@telef as varchar(20)
as 
Update Pacientes set nombres=@nomb, apellidos= @apell, telefono=@telef where
nss=@numsocial

exec sp_ActualizarPac '200987654','Viviana','Sanchez','3223456767'
go 

Create Procedure sp_EliminarPac
@numsocial as varchar(10)
as
Delete from Pacientes where nss=@numsocial

exec sp_EliminarPac '200987654'

Select * from pacientes
go
Create Procedure saludarDeNuevo
AS
Print('Bienvenido al mejor sitio web')

drop procedure saludarDeNuevo
go
--Condicional que valida si existe un objeto tipo procedimiento almacenado y lo elimine
Create Procedure eliminarProcedimiento
@nomProc varchar(20)
as
if(OBJECT_ID(@nomProc)) is not null
begin
 drop procedure saludarDeNuevo
end
else
 print 'Objeto no existe en la BD'

exec eliminarProcedimiento 'saludarDeNuevo'
go

Create Procedure sp_consultaEspecializacion
@espe varchar(20)
as
Select * from medicos where especializacion=@espe

exec sp_consultaEspecializacion 'Neurologo'
go
select * from HistoriaClinica
go
--1. Procedimiento
--Realizar un procedimiento almacenado que permita consultar los
--medicos que sean menores de una edad ingresada como parametro.
Create procedure sp_edadmedicos1
@edadm as varchar(10)
as
select nombreComp, datediff(year, fechaNacimiento,getdate()) [edad] from medicos where
datediff(year,fechaNacimiento, getdate()) < @edadm

exec sp_edadmedicos1 '28'
go

select * from citas
select * from HistoriaClinica
select * from pacientes
select * from medicos
--2. Procedimiento
--Realizar un procedimiento que dado el numero de la cita que 
--tuvo un paciente muestre el tratamiento y el diagnostico en un
--mensaje por pantalla.
Create procedure sp_paciente_tratamiento
@numCita int
as
select pa.nombres, hc.tratamiento, hc.diagnostico from HistoriaClinica as hc 
inner join Citas ct on hc.codCita= ct.codCita inner join Pacientes pa on
pa.nss=ct.nss where hc.codCita=@numCita

exec sp_paciente_tratamiento 2

--Realizar un procedimiento almacenado que solicite un parametro de entrada 
--y retorne un parametro de salida.
--Realice un procedimiento que retorne la cantidad de citas que ha atendido un médico.
go
Create procedure sp_Cant_Citas
@nomMedico varchar(20), -- parametro de entrada
@contcitas int output -- parametro de salida
as
Select @contcitas = count(citas.codCita) from Citas inner join Medicos on
medicos.nroTarjeta=citas.nroTarjeta where medicos.nombreComp=@nomMedico

--Ejecutar Procedimiento
declare @contcitas int
exec sp_Cant_Citas 'JULIAN GOMEZ', @contcitas output
print @contcitas

select * from HistoriaClinica
select * from pacientes
select * from citas
go
--Procedimiento almacenado que retorna cuantas historias clinicas tiene un paciente.
Create procedure sp_Cant_HistoClinicas
@idpaciente varchar(10), --parametro de entrada
@cantHistorias int output -- parametro de salida
as
Select @cantHistorias=count(HistoriaClinica.id) from HistoriaClinica inner join Citas on
HistoriaClinica.codCita = Citas.codCita inner join Pacientes on Citas.nss = Pacientes.nss
where Pacientes.nss=@idpaciente

--Ejecutar el procedimiento
declare @idpaciente int
exec sp_Cant_HistoClinicas '1002456789', @idpaciente output
print @idpaciente

--Procedimiento almacenado que inserta un paciente, siempre y cuando no este registrado.
go
Create Procedure sp_insertarPacValida
@numsocial as varchar(10),
@nomb as varchar(20),
@apell as varchar(20),
@telef as varchar(20)
as
if exists(Select nss from pacientes where nss=@numsocial)
begin
  print 'Ya existe un paciente con el número de seguridad social'
end
else
begin
  insert into Pacientes values(@numsocial,@nomb,@apell,@telef)
  Print 'El paciente se registro con éxito'
end

exec sp_insertarPacValida '1018003452', 'David', 'Arango Salazar', '3116067890'

--Sintaxis de las Funciones
--Create Function Nombre_Funcion
--(@n1 as tipo, lista de parametros)
--returns tipoDeDato_retornado
--as
--Begin
--- Lista de Intrucciones
------return expresionRetorna
--end

--Funcion básica que retorna el promedio de tres notas
go
Create Function calcularPromedio
(@nota1 as decimal(10,2), @nota2 as decimal(10,2), @nota3 as decimal(10,2))
returns decimal(10,2)
as
begin
  declare @prom decimal(10,2)
  set @prom = (@nota1+@nota2+@nota3)/3
  return @prom
end

--Ejecutar Funciones
Select dbo.calcularPromedio(3.1,4.3,5.0) as promedioNotas
--Ejecutar la función imprimiendo el mensaje
Print 'El promedio de notas es: '  + cast(dbo.calcularPromedio(3.1,2.3,4.0) as char(4))
go
Create function fechaLarga
(@fecha as date)
returns varchar(25)
as
begin
  declare @fechalarga varchar(25)
  set @fechalarga = concat(day(@fecha), ' de ', dateName(month,@fecha), ' del ', year(@fecha))
  return @fechalarga
end
go

--Ejecutar funcion
Select dbo.fechaLarga('04/15/2021') as Fecha

select * from citas

select codcita, dbo.fechaLarga(fecha) [Fecha Cita] , nss, consultorio from Citas

select nroTarjeta, nombreComp, especializacion, dbo.fechaLarga(fechaNacimiento) as 'Fecha Nacimiento'
from Medicos


--Crear una función que retorne una tabla
go
Create Function citasxMedico
(@nomMedico as varchar(20))
returns table
as
return (Select Medicos.nombreComp, citas.fecha from Medicos Inner Join Citas 
        on medicos.nroTarjeta= citas.nroTarjeta where medicos.nombreComp=@nomMedico)


Select * from dbo.citasxMedico('PATRICIA ESCUDERO')

select * from medicos

select * from citas

--ACTIVIDAD

-- 1. Realizar una función que retorne una nueva tabla con el campo 
--edad para la tabla medicos.
go
Create function edadMedicos
()
returns table
as
return (Select nroTarjeta, nombreComp, DateDiff(year,fechaNacimiento,getDate()) [edad] from Medicos)

Select * from dbo.edadMedicos()

--2. Realizar una funcion que dado el consultorio medico, retorne
--Cuantas citas fueron atendidas en él.


--Triggers - Procedimiento Almacenado que se ejecuta en segundo plano
--Sintaxis
--Create trigger Nombre_trigger
--on [Table|Vista]
--for|After|instead of
--[insert][,][update][,][delete]
--as
--Sentencia SQL


--Siempre que se genera una transacción se genera un archivo temporal
--Insert -->inserted
--Delete -->deleted
--Update --> deleted, inserted


--Crear un trigger que genere un mensaje cada que se inserte un medico
go
Create trigger tr_insertar_medico
on Medicos
after insert
as 
Print 'El médico quedó registrado en la base de datos'

insert into Medicos values('112', 'Carlos Gonzalez','Otorrino','01/11/2000');

select * from medicos

--Crear una tabla BackupCitas
Create table BackupCitas(
codCita int Primary Key not null,
fecha date not null,
nss varchar(10) not null,
nroTarjeta varchar(10) not null,
hora time not null,
Consultorio varchar(3) not null)

go
Alter Table BackupCitas
add costoCita int null
--Trigger que guarde un backup de la tabla citas
go

Create trigger tr_backup_citas
on Citas
for insert
as 
begin
  insert into BackupCitas select * from inserted
end
select * from medicos
insert into Citas values('04/22/2021','1018003452', '700','07:20','607',18000)

select * from backupCitas
select * from citas

--Trigger que guarde un backup de la tabla pacientes


Create table BackupPacientes(
nss varchar(10) Primary Key not null,
nombres varchar(20) not null,
apellidos varchar(20) not null,
telefono varchar(20) not null)
go
Create trigger tr_backup_pacientes
on Pacientes
after insert
as 
begin
  insert into BackupPacientes select * from inserted
end


insert into pacientes values('1033260845','Sandra','Gomez Aguirre','3214556789')

select * from pacientes
select * from BackupPacientes

--Crear una tabla historial para hacer seguimiento a la BD, por medio de un trigger
Create table historial(
idhistorial int primary key identity not null,
fecha date not null,
descripcion varchar(30) not null,
usuario varchar(30) not null,
cedulaMed varchar(10) not null)
go

select * from historial
go
--Crear un trigger que cuando se inserte un medico envie un registro al historial
Create trigger tr_historial_Medicos
on Medicos
After insert
as
declare @cedmedico varchar(10)
Select @cedmedico=nroTarjeta from inserted
insert into historial values(getDate(),'Insertando un Médico',SYSTEM_USER,@cedMedico)

insert into Medicos values('211','Jhon Perez','Oncologo','08/29/1981')

select * from medicos
select * from historial
go
--Actualizar un Medico actualizar tabla historial
Create trigger tr_historial_MedicosA
on Medicos
After update
as
declare @cedmedico varchar(10)
Select @cedmedico=nroTarjeta from inserted
insert into historial values(getDate(),'Actualizando un Médico',SYSTEM_USER,@cedMedico)

select * from medicos

update medicos set nombreComp='Camilo Gonzalez' where nroTarjeta='112'
go

--Trigger que valide si la cita cuesta más de 32000, no se genera.
Create trigger tr_cita_costosa
on Citas
for insert
as 
begin
if (Select costoCita from inserted)>=32000
   begin
	RollBack Transaction
	Print 'No se puede generar cita, por costos'
   end
else
   Print 'Cita se aplicó en la base de datos'
end

select * from citas

insert into Citas values ('12/06/2021','1019003451','989','15:30','506',35000)

select * from BackupCitas

--Cursores
--Permite recorrer el resultado de una consulta sql y realizar operaciones
--en cada registro o paso.
--Sintaxis
--Declare nombre_Cursor
--Cursor
--for expresion select
--[for read only|update|[of column_name[,,,,,n]]]

--Ejemplo de lectura basico
Declare cursorMedEspecializacion Cursor
for select * from Medicos where especializacion='Otorrino'

--Abrir el cursor
open cursorMedEspecializacion

--Ejecutar el cursor
Fetch Next from cursorMedEspecializacion

--cerrar el cursor
close cursorMedEspecializacion
--Desactivar el cursor
Deallocate cursorMedEspecializacion

--Ejemplo de cursor aplicado a dos tablas relacionadas
Declare cursorPacienteCita Cursor
for Select pac.nombres, pac.telefono, cit.fecha, cit.consultorio from Pacientes pac inner join
Citas cit on pac.nss = cit.nss

--Abrir Cursor
open cursorPacienteCita

--Ejecutar
Fetch Next from cursorPacienteCita
--if @@FETCH_STATUS=0
--   print 'Ultimo Registro'

--cerrar el cursor
close cursorPacienteCita

--Desactivar el cursor
Deallocate cursorPacienteCita

go
--Realizar con cursor un reporte que muestre la historia clinica por paciente
--con sus citas.
Alter procedure reporteHistoriaClinicaPaciente
as 
begin
	declare @nombrepa varchar(20), @codCita int, @tratamiento varchar(30), @diagnostico varchar(30)
	--Creando el cursor
	declare conHistoriaPaciente cursor
	for select pa.nombres, ct.codCita, hc.tratamiento, hc.diagnostico from HistoriaClinica as hc 
	inner join Citas ct on hc.codCita= ct.codCita inner join Pacientes pa on
	pa.nss=ct.nss order by pa.nombres
	--abrir cursor
	open conHistoriaPaciente
	--Ejecute cursor
	Fetch Next from conHistoriaPaciente into @nombrepa, @codCita, @tratamiento, @diagnostico
	--Imprimir nombres de columnas
	Print 'Nombre Paciente  CodCita                     Tratamiento        Diagnostico'
	Print '----------------------------------------------------------------------------'
	while @@FETCH_STATUS=0
	begin
	   Print  @nombrepa + space(12) + cast(@codCita as varchar) + space(10) + @tratamiento + space(10) + @diagnostico
	   Fetch Next from conHistoriaPaciente into @nombrepa, @codCita, @tratamiento, @diagnostico
	end
	close conHistoriaPaciente
	deallocate conHistoriaPaciente
end

exec reporteHistoriaClinicaPaciente

--Recorridos del Cursor
Declare cursorCitas Cursor scroll
for Select * from citas
--Abrir el cursor
open cursorCitas
--Recorrer el cursor
--Siguiente
Fetch Next from cursorCitas
--anterior
Fetch prior from cursorCitas
--Primero
Fetch first from cursorCitas
--Ultimo
Fetch last from cursorCitas
--cerrar el cursor
Close cursorCitas
--Liberar Cursor
Deallocate cursorCitas


select * from medicos
go
--Procedimiento almacenado que actualice todos los medicos de la tabla
--Por medio de un cursor.
Alter procedure actualizarMedicos
as
begin
declare @nroTarjeta varchar(10), @nombreCompleto varchar(30), @especial varchar(20), @fechaN date
Declare cactualizarMedicos cursor GLOBAL
for Select nroTarjeta, nombreComp, especializacion, fechaNacimiento from Medicos
FOR UPDATE
Open cactualizarMedicos
fetch cactualizarMedicos into @nroTarjeta,@nombreCompleto, @especial, @fechaN 
while(@@FETCH_STATUS=0)
  begin
	UPDATE Medicos
	set especializacion=  'Esp ' + @especial
	where current  of cactualizarMedicos
	fetch cactualizarMedicos into @nroTarjeta,@nombreCompleto, @especial, @fechaN
  end
  close cactualizarMedicos
  deallocate cactualizarMedicos
end

exec actualizarMedicos
select * from medicos

Update Medicos set especializacion='Pediatra' where nroTarjeta='989' 