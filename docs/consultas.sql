-- En este archivo deben estar tus ejercicios de consultas sql

-- 1 **Empleados ordenados alfabéticamente (Z...A):**
select NOMBRES from EMPLEADOS
order by NOMBRES desc;

-- 2 **Empleados de Soporte:**
select e.NOMBRES, p.PUESTO, l.LOCALIDAD from EMPLEADOS as e
  inner join DEPARTAMENTOS as d on e.DEPARTAMENTO_ID = d.ID
  inner join LOCALIDADES as l on d.LOCALIDAD_ID = l.ID
  inner join PUESTOS as p on e.PUESTO_ID = p.ID
  where p.PUESTO = 'Soporte';

-- 3 **Nombres que terminan con 'o':**
select NOMBRES from EMPLEADOS
  where NOMBRES like '%o';

-- 4 **Empleados en Carlos Paz:**
select e.NOMBRES, e.SUELDO, l.LOCALIDAD from EMPLEADOS as e
  inner join DEPARTAMENTOS as d on e.DEPARTAMENTO_ID = d.ID
  inner join LOCALIDADES as l on d.LOCALIDAD_ID = l.ID
  where l.LOCALIDAD = 'Carlos Paz';

-- 5 **Sueldos entre 10000 y 13000:**
select e.NOMBRES, e.SUELDO, l.LOCALIDAD from EMPLEADOS as e
  inner join DEPARTAMENTOS as d on e.DEPARTAMENTO_ID = d.ID
  inner join LOCALIDADES as l on d.LOCALIDAD_ID = l.ID
  where e.SUELDO between 10000 and 13000;

-- 6 **Departamentos con más de 5 empleados:**  
select d.ID, d.DENOMINACION, COUNT(e.ID) as CANTIDAD_EMPLEADOS 
  from DEPARTAMENTOS as d
  left join EMPLEADOS as e on d.ID = e.DEPARTAMENTO_ID
  group by d.ID, d.DENOMINACION
  having COUNT(e.ID) > 5; 

-- 7 **Empleados en Córdoba con puesto de Analista o Programador:** 
select e.NOMBRES from EMPLEADOS as e
  left join DEPARTAMENTOS as d on e.DEPARTAMENTO_ID = d.ID
  left join LOCALIDADES as l on d.LOCALIDAD_ID = l.ID
  left join PUESTOS as p on e.PUESTO_ID = p.ID
  where l.LOCALIDAD = 'Córdoba' and (p.PUESTO = 'Analista' or p.PUESTO = 'Programador');

-- 8 **Sueldo medio de todos los empleados:**
select e.NOMBRES, avg(e.SUELDO) from EMPLEADOS as e;
  group by e.NOMBRES;

-- 9 **Máximo sueldo en el departamento 10:**
select max(e.SUELDO) as MAXIMO_SUELDO from EMPLEADOS as e
  left join DEPARTAMENTOS as d on e.DEPARTAMENTO_ID = d.ID
  where d.ID = 10

-- 10 **Sueldo mínimo en el departamento Soporte:**
select e.NOMBRES, min(e.SUELDO) from EMPLEADOS as e
  left join DEPARTAMENTOS as d on e.DEPARTAMENTO_ID = d.ID
  where d.DENOMINACION = 'Soporte'
  group by e.NOMBRES;

-- 11 **Suma de sueldos por puesto:**
select d.DENOMINACION, SUM(e.SUELDO) as SUELDO_TOTAL
  from DEPARTAMENTOS as d
  inner join EMPLEADOS as e on e.DEPARTAMENTO_ID = d.ID
  group by d.DENOMINACION;