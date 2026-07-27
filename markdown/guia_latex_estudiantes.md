| Guía | introductoria |     |     | de LaTeX | para |
| ---- | ------------- | --- | --- | -------- | ---- |
estudiantes
Desde cero hasta la elaboración de artículos científicos, monografías y
tesinas
Este documento está diseñado para estudiantes que nunca han utilizado La-
TeX. Su objetivo es explicar, paso a paso, qué es LaTeX, cómo funciona, por
qué conviene usarlo en el ámbito académico y cómo emplearlo en dos escenarios
| frecuentes: | artículos | científicos | y monografías | o tesinas. |     |
| ----------- | --------- | ----------- | ------------- | ---------- | --- |
|             |           | Material    | de apoyo      | académico  |     |
Abril 2026

| Guía de | LaTeX para | estudiantes |     |     |     |     | Artículo científico | y tesina |     |
| ------- | ---------- | ----------- | --- | --- | --- | --- | ------------------- | -------- | --- |
Índice
| 1. ¿Qué | es LaTeX | y   | por qué | vale la | pena | aprenderlo? |     |     | 3   |
| ------- | -------- | --- | ------- | ------- | ---- | ----------- | --- | --- | --- |
1.1. ¿Por qué se usa tanto en el mundo académico? . . . . . . . . . . . . . . . . . . . 3
1.2. ¿Cuándo conviene usar LaTeX? . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3
| 2. La     | lógica de | trabajo | en LaTeX |                  |     |     |     |     | 3   |
| --------- | --------- | ------- | -------- | ---------------- | --- | --- | --- | --- | --- |
| 3. ¿Dónde | pueden    | usar    | LaTeX    | los estudiantes? |     |     |     |     | 4   |
3.1. Opción 1: Overleaf . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4
3.2. Opción 2: Instalación local . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4
| 4. Primer | contacto | con | un documento |     | LaTeX |     |     |     | 4   |
| --------- | -------- | --- | ------------ | --- | ----- | --- | --- | --- | --- |
4.1. Explicación del ejemplo . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 5
| 5. Comandos | esenciales |     | que | todo estudiante |     | debe aprender |     |     | 5   |
| ----------- | ---------- | --- | --- | --------------- | --- | ------------- | --- | --- | --- |
5.1. Título, autor y fecha . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 5
5.2. Secciones y subsecciones . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 5
5.3. Negrita, cursiva y subrayado. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 5
5.4. Listas . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 5
5.5. Saltos de línea y párrafos . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 6
| 6. Cómo | escribir | fórmulas | matemáticas |     |     |     |     |     | 6   |
| ------- | -------- | -------- | ----------- | --- | --- | --- | --- | --- | --- |
6.1. Ecuación en línea . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 6
6.2. Ecuación centrada . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 6
6.3. Ejemplo más académico . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 6
| 7. Cómo | insertar | figuras |     |     |     |     |     |     | 6   |
| ------- | -------- | ------- | --- | --- | --- | --- | --- | --- | --- |
7.1. Buenas prácticas con figuras . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7
| 8. Cómo | construir | tablas |     |     |     |     |     |     | 7   |
| ------- | --------- | ------ | --- | --- | --- | --- | --- | --- | --- |
8.1. Interpretación didáctica . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7
| 9. Cómo | citar y | manejar | bibliografía |     |     |     |     |     | 8   |
| ------- | ------- | ------- | ------------ | --- | --- | --- | --- | --- | --- |
9.1. Cita básica en el texto . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8
9.2. Archivo bibliográfico .bib . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8
9.3. Recomendación práctica . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8
| 10.¿Cómo | empezar  | en   | Overleaf    | paso       | a paso? |     |     |     | 8   |
| -------- | -------- | ---- | ----------- | ---------- | ------- | --- | --- | --- | --- |
| 11.Uso   | de LaTeX | para | un artículo | científico |         |     |     |     | 9   |
11.1.¿Qué implica trabajar con una plantilla editorial? . . . . . . . . . . . . . . . . . . 9
11.2.Partes típicas de un artículo científico . . . . . . . . . . . . . . . . . . . . . . . . 9
11.3.Estrategia recomendada para estudiantes . . . . . . . . . . . . . . . . . . . . . . 9
11.4.Ejemplo conceptual de estructura de artículo . . . . . . . . . . . . . . . . . . . . 10
11.5.Qué deben entender los estudiantes sobre la plantilla Springer . . . . . . . . . . . 10
| 12.Uso | de LaTeX | para | monografía | o   | tesina |     |     |     | 10  |
| ------ | -------- | ---- | ---------- | --- | ------ | --- | --- | --- | --- |
12.1.Estructura sugerida para una tesina o monografía . . . . . . . . . . . . . . . . . . 10
1

| Guía de | LaTeX para | estudiantes |     |     |     |     | Artículo científico | y tesina |
| ------- | ---------- | ----------- | --- | --- | --- | --- | ------------------- | -------- |
12.2.Plantilla base sencilla para una tesina . . . . . . . . . . . . . . . . . . . . . . . . 11
12.3.Diferencia importante entre article y report . . . . . . . . . . . . . . . . . . . 11
| 13.Errores | frecuentes | en  | principiantes |     |     |     |     | 11  |
| ---------- | ---------- | --- | ------------- | --- | --- | --- | --- | --- |
13.1.Caracteres especiales . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 12
| 14.Método      | de aprendizaje |     | recomendado |              | para | estudiantes |     | 12  |
| -------------- | -------------- | --- | ----------- | ------------ | ---- | ----------- | --- | --- |
| 15.Sugerencias | pedagógicas    |     | para        | sus primeros |      | trabajos    |     | 12  |
15.1.Para artículo científico . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 12
15.2.Para tesina o monografía. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 13
| 16.Buenas     | prácticas        | académicas |           | al usar | LaTeX |     |     | 13  |
| ------------- | ---------------- | ---------- | --------- | ------- | ----- | --- | --- | --- |
| 17.Mini       | guía de comandos |            | útiles    |         |       |     |     | 13  |
| 18.Ejemplo    | mínimo           | para       | practicar | en      | clase |     |     | 14  |
| 19.Conclusión | general          |            |           |         |       |     |     | 14  |
2

| Guía | de   | LaTeX para | estudiantes |       |     |      |         |             | Artículo científico | y tesina |
| ---- | ---- | ---------- | ----------- | ----- | --- | ---- | ------- | ----------- | ------------------- | -------- |
| 1.   | ¿Qué | es LaTeX   |             | y por | qué | vale | la pena | aprenderlo? |                     |          |
LaTeX es un sistema de composición de documentos académicos y científicos. A diferencia de un
procesador de texto tradicional como Microsoft Word, en LaTeX no se trabaja principalmente
arrastrando elementos con el mouse, sino escribiendo contenido y comandos que luego el
sistema interpreta para producir un documento con formato profesional.
| En  | palabras | sencillas, | LaTeX |     | funciona | así: |     |     |     |     |
| --- | -------- | ---------- | ----- | --- | -------- | ---- | --- | --- | --- | --- |
1. El estudiante escribe texto y comandos en un archivo con extensión .tex.
|     | 2. Ese | archivo | se compila. |     |     |     |     |     |     |     |
| --- | ------ | ------- | ----------- | --- | --- | --- | --- | --- | --- | --- |
3. Como resultado, se genera un PDF con formato tipográfico de alta calidad.
| 1.1. | ¿Por | qué | se usa | tanto | en  | el mundo | académico? |     |     |     |
| ---- | ---- | --- | ------ | ----- | --- | -------- | ---------- | --- | --- | --- |
LaTeX es muy valorado en contextos universitarios y de investigación porque:
|     | Produce | documentos |     | limpios, |     | elegantes | y profesionales. |     |     |     |
| --- | ------- | ---------- | --- | -------- | --- | --------- | ---------------- | --- | --- | --- |
Maneja muy bien ecuaciones, tablas, referencias bibliográficas y figuras.
Ayuda a mantener una estructura ordenada en documentos extensos.
Facilita el uso de plantillas editoriales, como las de revistas científicas.
Reduce problemas de formato cuando varias personas trabajan el mismo documento.
| 1.2.  | ¿Cuándo |               | conviene    | usar         | LaTeX?      |        |        |                |     |     |
| ----- | ------- | ------------- | ----------- | ------------ | ----------- | ------ | ------ | -------------- | --- | --- |
| LaTeX | es      | especialmente |             | recomendable |             | cuando | se     | va a redactar: |     |     |
|       | un      | artículo      | científico, |              |             |        |        |                |     |     |
|       | una     | tesina,       |             |              |             |        |        |                |     |     |
|       | una     | monografía,   |             |              |             |        |        |                |     |     |
|       | un      | informe       | técnico,    |              |             |        |        |                |     |     |
|       | una     | tesis,        |             |              |             |        |        |                |     |     |
|       | un      | documento     | con         | muchas       | ecuaciones, |        | tablas | o referencias. |     |     |
| 2.    | La      | lógica de     | trabajo     |              | en LaTeX    |        |        |                |     |     |
Cuando una persona utiliza Word, normalmente piensa así: “voy escribiendo y al mismo tiempo
voy dando formato”.Encambio,enLaTeXlalógicaesdiferente:“voy estructurando el contenido
| y   | el sistema | se encarga |     | del formato”. |     |     |     |     |     |     |
| --- | ---------- | ---------- | --- | ------------- | --- | --- | --- | --- | --- | --- |
Esa diferencia es importante. En LaTeX, el estudiante debe concentrarse en:
|     | la  | estructura | del documento, |     |     |     |     |     |     |     |
| --- | --- | ---------- | -------------- | --- | --- | --- | --- | --- | --- | --- |
3

| Guía de | LaTeX para         | estudiantes |           |         |     |         | Artículo científico | y tesina |
| ------- | ------------------ | ----------- | --------- | ------- | --- | ------- | ------------------- | -------- |
| la      | claridad del       | contenido,  |           |         |     |         |                     |          |
| el      | orden de las       | secciones,  |           |         |     |         |                     |          |
| la      | correcta inclusión |             | de citas, | figuras | y   | tablas. |                     |          |
Esto desarrolla una forma de escritura más académica, organizada y reproducible.
| 3. ¿Dónde   | pueden      | usar     | LaTeX |     | los estudiantes? |     |     |     |
| ----------- | ----------- | -------- | ----- | --- | ---------------- | --- | --- | --- |
| Existen     | dos formas  | comunes: |       |     |                  |     |     |     |
| 3.1. Opción | 1: Overleaf |          |       |     |                  |     |     |     |
Overleaf es una plataforma en línea que permite escribir y compilar LaTeX desde el navegador,
sin instalar nada en la computadora. Para estudiantes principiantes, esta suele ser la opción más
recomendable.
| Ventajas    | de Overleaf:         |               |          |       |          |               |     |     |
| ----------- | -------------------- | ------------- | -------- | ----- | -------- | ------------- | --- | --- |
| no          | requiere instalación |               | local,   |       |          |               |     |     |
| compila     | automáticamente,     |               |          |       |          |               |     |     |
| permite     | trabajo              | colaborativo, |          |       |          |               |     |     |
| ofrece      | plantillas           | listas        | para     | usar, |          |               |     |     |
| facilita    | compartir            | el            | proyecto | con   | docentes | o compañeros. |     |     |
| 3.2. Opción | 2: Instalación       |               | local    |       |          |               |     |     |
TambiénesposibletrabajarenLaTeXinstalandouneditoryunadistribuciónenlacomputadora.
Esta opción es útil para usuarios más avanzados, pero no es obligatoria para comenzar.
Conclusión práctica:parasusprimerasexperiencias,lomásconvenienteesquelosestudiantes
utilicen Overleaf.
| 4. Primer | contacto | con | un  | documento |     | LaTeX |     |     |
| --------- | -------- | --- | --- | --------- | --- | ----- | --- | --- |
Todo documento LaTeX tiene una estructura base. Obsérvese el siguiente ejemplo mínimo:
\documentclass{article}
\begin{document}
| Hola, este | es mi | primer | documento | en  | LaTeX. |     |     |     |
| ---------- | ----- | ------ | --------- | --- | ------ | --- | --- | --- |
\end{document}
4

| Guía de                 | LaTeX | para estudiantes |         |           |                |           |            | Artículo científico | y tesina |
| ----------------------- | ----- | ---------------- | ------- | --------- | -------------- | --------- | ---------- | ------------------- | -------- |
| 4.1. Explicación        |       | del              | ejemplo |           |                |           |            |                     |          |
| \documentclass{article} |       |                  |         | indica    | el tipo        | de        | documento. |                     |          |
| \begin{document}        |       |                  | marca   | el inicio | del            | contenido | visible.   |                     |          |
| \end{document}          |       |                  | marca   | el final  | del documento. |           |            |                     |          |
Aunque el ejemplo es muy simple, muestra la lógica central: LaTeX trabaja con estructura
y comandos.
| 5. Comandos    |        | esenciales      |            | que todo | estudiante |     | debe aprender |     |     |
| -------------- | ------ | --------------- | ---------- | -------- | ---------- | --- | ------------- | --- | --- |
| 5.1. Título,   |        | autor y         | fecha      |          |            |     |               |     |     |
| \title{Mi      | primer | documento       | academico} |          |            |     |               |     |     |
| \author{Nombre |        | del estudiante} |            |          |            |     |               |     |     |
| \date{Abril    | 2026}  |                 |            |          |            |     |               |     |     |
\begin{document}
\maketitle
\end{document}
| 5.2. Secciones |     | y subsecciones |     |     |     |     |     |     |     |
| -------------- | --- | -------------- | --- | --- | --- | --- | --- | --- | --- |
\section{Introduccion}
| Texto de | la introduccion. |     |     |     |     |     |     |     |     |
| -------- | ---------------- | --- | --- | --- | --- | --- | --- | --- | --- |
\subsection{Antecedentes}
| Texto de         | antecedentes. |             |             |     |     |     |     |     |     |
| ---------------- | ------------- | ----------- | ----------- | --- | --- | --- | --- | --- | --- |
| 5.3. Negrita,    |               | cursiva     | y subrayado |     |     |     |     |     |     |
| \textbf{Texto    |               | en negrita} |             |     |     |     |     |     |     |
| \textit{Texto    |               | en cursiva} |             |     |     |     |     |     |     |
| \underline{Texto |               | subrayado}  |             |     |     |     |     |     |     |
5.4. Listas
| Lista con | viñetas: |     |     |     |     |     |     |     |     |
| --------- | -------- | --- | --- | --- | --- | --- | --- | --- | --- |
\begin{itemize}
| \item | Primer  | elemento |     |     |     |     |     |     |     |
| ----- | ------- | -------- | --- | --- | --- | --- | --- | --- | --- |
| \item | Segundo | elemento |     |     |     |     |     |     |     |
\end{itemize}
Lista enumerada:
5

| Guía de | LaTeX para | estudiantes |     | Artículo científico | y tesina |
| ------- | ---------- | ----------- | --- | ------------------- | -------- |
\begin{enumerate}
| \item | Primer paso  |     |     |     |     |
| ----- | ------------ | --- | --- | --- | --- |
| \item | Segundo paso |     |     |     |     |
\end{enumerate}
| 5.5. Saltos | de línea | y párrafos |     |     |     |
| ----------- | -------- | ---------- | --- | --- | --- |
En LaTeX, normalmente un nuevo párrafo se genera dejando una línea en blanco entre bloques
de texto. No es recomendable abusar de saltos manuales para “mover” contenido, ya que LaTeX
| organiza | el diseño automáticamente. |                      |     |     |     |
| -------- | -------------------------- | -------------------- | --- | --- | --- |
| 6. Cómo  | escribir                   | fórmulas matemáticas |     |     |     |
Uno de los grandes puntos fuertes de LaTeX es la escritura de ecuaciones.
| 6.1. Ecuación | en línea    |                |     |     |     |
| ------------- | ----------- | -------------- | --- | --- | --- |
| La formula    | de Einstein | es $E = mc^2$. |     |     |     |
| 6.2. Ecuación | centrada    |                |     |     |     |
\begin{equation}
E = mc^2
\end{equation}
| 6.3. Ejemplo | más | académico |     |     |     |
| ------------ | --- | --------- | --- | --- | --- |
\begin{equation}
| F_1 = 2           | \cdot \frac{\text{precision} |                | \cdot \text{recall}} |     |     |
| ----------------- | ---------------------------- | -------------- | -------------------- | --- | --- |
| {\text{precision} | +                            | \text{recall}} |                      |     |     |
\end{equation}
Esto es especialmente útil en áreas como ingeniería, informática, matemática, física, estadística
| y análisis | de datos. |         |     |     |     |
| ---------- | --------- | ------- | --- | --- | --- |
| 7. Cómo    | insertar  | figuras |     |     |     |
Las figuras deben guardarse como archivos separados, por ejemplo en formato PNG, JPG o
PDF.
6

| Guía | de  | LaTeX | para | estudiantes |     |     |     |     | Artículo científico | y tesina |
| ---- | --- | ----- | ---- | ----------- | --- | --- | --- | --- | ------------------- | -------- |
\usepackage{graphicx}
\begin{figure}[h]
\centering
\includegraphics[width=0.6\textwidth]{imagen.png}
|     | \caption{Ejemplo |     |     | de  | figura.} |     |     |     |     |     |
| --- | ---------------- | --- | --- | --- | -------- | --- | --- | --- | --- | --- |
\label{fig:ejemplo}
\end{figure}
| 7.1.    | Buenas  |               | prácticas |             | con figuras        |              |           |              |     |     |
| ------- | ------- | ------------- | --------- | ----------- | ------------------ | ------------ | --------- | ------------ | --- | --- |
|         | Nombrar |               | los       | archivos    | de forma           | clara.       |           |              |     |     |
|         | Usar    | imágenes      |           | de buena    | calidad.           |              |           |              |     |     |
|         | Agregar |               | siempre   | una         | caption            | explicativa. |           |              |     |     |
|         | Usar    | label         | para      | poder       | referenciar        | la           | figura    | en el texto. |     |     |
| Ejemplo |         | de referencia |           | en          | el texto:          |              |           |              |     |     |
| Como    | se      | observa       | en        | la Figura   | \ref{fig:ejemplo}, |              |           | ...          |     |     |
| 8.      | Cómo    | construir     |           | tablas      |                    |              |           |              |     |     |
| Las     | tablas  | son           | muy       | importantes |                    | en informes, | artículos | y tesinas.   |     |     |
\begin{table}[h]
\centering
| \caption{Resultados |     |     |     | de ejemplo} |     |     |     |     |     |     |
| ------------------- | --- | --- | --- | ----------- | --- | --- | --- | --- | --- | --- |
\begin{tabular}{lcc}
\toprule
| Modelo |     | & Accuracy |     | & F1-score | \\  |     |     |     |     |     |
| ------ | --- | ---------- | --- | ---------- | --- | --- | --- | --- | --- | --- |
\midrule
| Regresion |     | logistica |        | & 0.82 | & 0.70 | \\  |     |     |     |     |
| --------- | --- | --------- | ------ | ------ | ------ | --- | --- | --- | --- | --- |
| Random    |     | Forest    | & 0.87 | & 0.78 | \\     |     |     |     |     |     |
\bottomrule
\end{tabular}
\end{table}
| 8.1. | Interpretación |            |        | didáctica       |     |        |           |     |     |     |
| ---- | -------------- | ---------- | ------ | --------------- | --- | ------ | --------- | --- | --- | --- |
| La   | parte          | {lcc}      | indica | la alineación   |     | de las | columnas: |     |     |     |
|      | l:             | alineación |        | a la izquierda, |     |        |           |     |     |     |
c: centrado,
|     | r:  | alineación |     | a la derecha. |     |     |     |     |     |     |
| --- | --- | ---------- | --- | ------------- | --- | --- | --- | --- | --- | --- |
7

| Guía de | LaTeX para | estudiantes |              |     |     |     | Artículo científico | y tesina |
| ------- | ---------- | ----------- | ------------ | --- | --- | --- | ------------------- | -------- |
| 9. Cómo | citar y    | manejar     | bibliografía |     |     |     |                     |          |
UnagranventajadeLaTeXesquepermitemanejarreferenciasbibliográficasdeformaordenada.
| 9.1. Cita   | básica | en el texto |               |          |       |     |     |     |
| ----------- | ------ | ----------- | ------------- | -------- | ----- | --- | --- | --- |
| Dependiendo | de la  | plantilla,  | se utilizarán | comandos | como: |     |     |     |
\cite{apellido2024}
| 9.2. Archivo | bibliográfico |     | .bib |     |     |     |     |     |
| ------------ | ------------- | --- | ---- | --- | --- | --- | --- | --- |
Normalmente las referencias se guardan en un archivo aparte, por ejemplo referencias.bib:
@article{apellido2024,
| author  | = {Apellido, | Nombre}, |            |     |     |     |     |     |
| ------- | ------------ | -------- | ---------- | --- | --- | --- | --- | --- |
| title   | = {Titulo    | del      | articulo}, |     |     |     |     |     |
| journal | = {Nombre    | de la    | revista},  |     |     |     |     |     |
| year    | = {2024},    |          |            |     |     |     |     |     |
| volume  | = {10},      |          |            |     |     |     |     |     |
| number  | = {2},       |          |            |     |     |     |     |     |
| pages   | = {15--28}   |          |            |     |     |     |     |     |
}
| Luego, | en el documento | principal, |     | se insertan | las referencias: |     |     |     |
| ------ | --------------- | ---------- | --- | ----------- | ---------------- | --- | --- | --- |
\bibliography{referencias}
| 9.3. Recomendación |     | práctica |     |     |     |     |     |     |
| ------------------ | --- | -------- | --- | --- | --- | --- | --- | --- |
A los estudiantes les conviene aprender desde temprano a usar gestores bibliográficos y exportar
referencias en formato BibTeX. Esto ahorra mucho tiempo y mejora la calidad académica del
documento.
| 10. ¿Cómo      | empezar       | en          | Overleaf      | paso         | a paso?    |          |     |     |
| -------------- | ------------- | ----------- | ------------- | ------------ | ---------- | -------- | --- | --- |
| 1. Crear       | una cuenta    | en          | Overleaf.     |              |            |          |     |     |
| 2. Seleccionar | New           | Project.    |               |              |            |          |     |     |
| 3. Escoger     | una plantilla |             | o iniciar     | un proyecto  | en blanco. |          |     |     |
| 4. Escribir    | el contenido  |             | en el archivo | principal    | .tex.      |          |     |     |
| 5. Compilar    | y revisar     | el          | PDF generado. |              |            |          |     |     |
| 6. Corregir    | errores       | si aparecen |               | advertencias | o mensajes | en rojo. |     |     |
8

| Guía | de      | LaTeX   | para | estudiantes |     |     |     | Artículo científico | y tesina |
| ---- | ------- | ------- | ---- | ----------- | --- | --- | --- | ------------------- | -------- |
|      | Consejo | docente |      |             |     |     |     |                     |          |
Para un estudiante principiante, el mejor enfoque no es memorizar todos los comandos,
sino aprender una base pequeña y practicarla constantemente: secciones, listas, tablas,
|     | figuras, | ecuaciones |       | y referencias. |             |            |     |     |     |
| --- | -------- | ---------- | ----- | -------------- | ----------- | ---------- | --- | --- | --- |
| 11. | Uso      | de         | LaTeX | para           | un artículo | científico |     |     |     |
Enelcasodeunartículocientífico,muchasrevistasexigenorecomiendantrabajarconunaplan-
tilla específica. En su caso, se utilizará la plantilla de Springer Nature en LaTeX/Overleaf.
| 11.1. | ¿Qué |     | implica | trabajar | con | una plantilla | editorial? |     |     |
| ----- | ---- | --- | ------- | -------- | --- | ------------- | ---------- | --- | --- |
Significa que el estudiante no debe inventar el formato desde cero. En lugar de eso, debe:
|       | abrir       | la         | plantilla     | oficial, |                |                |              |     |     |
| ----- | ----------- | ---------- | ------------- | -------- | -------------- | -------------- | ------------ | --- | --- |
|       | identificar |            | las           | partes   | del documento, |                |              |     |     |
|       | reemplazar  |            | el            | texto de | ejemplo        | por su propio  | contenido,   |     |     |
|       | respetar    |            | la estructura |          | pedida         | por la revista | o editorial. |     |     |
| 11.2. | Partes      |            | típicas       | de       | un artículo    | científico     |              |     |     |
| Un    | artículo    | científico |               | suele    | incluir:       |                |              |     |     |
1. Título.
|     | 2. Autor      | o   | autores.       |     |     |     |     |     |     |
| --- | ------------- | --- | -------------- | --- | --- | --- | --- | --- | --- |
|     | 3. Afiliación |     | institucional. |     |     |     |     |     |     |
4. Resumen.
|     | 5. Palabras |     | clave. |     |     |     |     |     |     |
| --- | ----------- | --- | ------ | --- | --- | --- | --- | --- | --- |
6. Introducción.
|     | 7. Metodología |     | o   | materiales | y métodos. |     |     |     |     |
| --- | -------------- | --- | --- | ---------- | ---------- | --- | --- | --- | --- |
8. Resultados.
9. Discusión.
10. Conclusiones.
11. Referencias.
| 11.3. | Estrategia |     | recomendada |     |     | para estudiantes |     |     |     |
| ----- | ---------- | --- | ----------- | --- | --- | ---------------- | --- | --- | --- |
Cuando trabajen con la plantilla Springer, se recomienda lo siguiente:
9

| Guía          | de LaTeX     |              | para            | estudiantes |           |            |           |              |           | Artículo científico | y tesina |
| ------------- | ------------ | ------------ | --------------- | ----------- | --------- | ---------- | --------- | ------------ | --------- | ------------------- | -------- |
|               | 1. No        | borrar       | todo            | al inicio.  |           |            |           |              |           |                     |          |
|               | 2. Leer      | la plantilla |                 | y reconocer |           | qué        | hace cada | bloque.      |           |                     |          |
|               | 3. Sustituir |              | primero         | título,     | autores,  |            | resumen   | y secciones. |           |                     |          |
|               | 4. Dejar     | las          | configuraciones |             | avanzadas |            | intactas  | mientras     | aprenden. |                     |          |
|               | 5. Probar    | cambios      |                 | pequeños    |           | y compilar | con       | frecuencia.  |           |                     |          |
| 11.4.         | Ejemplo      |              | conceptual      |             | de        | estructura |           | de artículo  |           |                     |          |
| \title{Titulo |              |              | del articulo}   |             |           |            |           |              |           |                     |          |
\author*[1]{\fnm{Nombre} \sur{Apellido}}\email{correo@ejemplo.com}
| \affil*[1]{\orgname{Universidad}, |     |     |          |              |             | \country{Panama}} |           |     |     |     |     |
| --------------------------------- | --- | --- | -------- | ------------ | ----------- | ----------------- | --------- | --- | --- | --- | --- |
| \abstract{Este                    |     |     | trabajo  | presenta...} |             |                   |           |     |     |     |     |
| \keywords{LaTeX,                  |     |     | articulo |              | cientifico, |                   | Overleaf} |     |     |     |     |
\maketitle
\section{Introduccion}
\section{Metodologia}
\section{Resultados}
\section{Discusion}
\section{Conclusiones}
11.5. Qué deben entender los estudiantes sobre la plantilla Springer
No todo el código de la plantilla debe ser dominado desde el primer día. Lo importante es que
comprendan:
|     | dónde | va       | el contenido |              | principal, |             |     |          |     |     |     |
| --- | ----- | -------- | ------------ | ------------ | ---------- | ----------- | --- | -------- | --- | --- | --- |
|     | cómo  | agregar  | secciones,   |              |            |             |     |          |     |     |     |
|     | cómo  | insertar | citas,       | figuras      |            | y tablas,   |     |          |     |     |     |
|     | cómo  | mantener |              | el documento |            | organizado. |     |          |     |     |     |
| 12. | Uso   | de       | LaTeX        | para         | monografía |             |     | o tesina |     |     |     |
A diferencia del artículo científico, una monografía o tesina suele ser más extensa y puede
requerircapítulos,portada,índice,introduccióngeneral,marcoteórico,metodología,resultados,
| conclusiones |            | y   | anexos. |          |      |     |        |              |     |     |     |
| ------------ | ---------- | --- | ------- | -------- | ---- | --- | ------ | ------------ | --- | --- | --- |
| 12.1.        | Estructura |     |         | sugerida | para | una | tesina | o monografía |     |     |     |
1. Portada.
10

| Guía de   | LaTeX    | para estudiantes |     |     |     |     | Artículo científico | y tesina |
| --------- | -------- | ---------------- | --- | --- | --- | --- | ------------------- | -------- |
| 2. Índice | general. |                  |     |     |     |     |                     |          |
3. Introducción.
| 4. Planteamiento |     | del | problema. |     |     |     |     |     |
| ---------------- | --- | --- | --------- | --- | --- | --- | --- | --- |
5. Objetivos.
| 6. Marco | teórico. |     |     |     |     |     |     |     |
| -------- | -------- | --- | --- | --- | --- | --- | --- | --- |
7. Metodología.
| 8. Resultados |     | o desarrollo. |     |     |     |     |     |     |
| ------------- | --- | ------------- | --- | --- | --- | --- | --- | --- |
9. Conclusiones.
10. Recomendaciones.
| 11. Referencias |     | bibliográficas. |     |     |     |     |     |     |
| --------------- | --- | --------------- | --- | --- | --- | --- | --- | --- |
12. Anexos.
| 12.2. Plantilla |     | base | sencilla para | una tesina |     |     |     |     |
| --------------- | --- | ---- | ------------- | ---------- | --- | --- | --- | --- |
\documentclass[12pt]{report}
\begin{document}
| \title{Titulo  | de  | la tesina}      |     |     |     |     |     |     |
| -------------- | --- | --------------- | --- | --- | --- | --- | --- | --- |
| \author{Nombre |     | del estudiante} |     |     |     |     |     |     |
\date{2026}
\maketitle
\tableofcontents
\chapter{Introduccion}
| \chapter{Marco |     | teorico} |     |     |     |     |     |     |
| -------------- | --- | -------- | --- | --- | --- | --- | --- | --- |
\chapter{Metodologia}
\chapter{Resultados}
\chapter{Conclusiones}
\end{document}
| 12.3. Diferencia |       | importante | entre           | article  | y report |              |         |     |
| ---------------- | ----- | ---------- | --------------- | -------- | -------- | ------------ | ------- | --- |
|                  | suele | usarse     | para artículos, | informes | cortos   | o documentos | breves. |     |
article
report es más adecuado para tesinas, monografías o tesis porque permite capítulos.
| 13. Errores | frecuentes |         | en principiantes |          |         |             |     |     |
| ----------- | ---------- | ------- | ---------------- | -------- | ------- | ----------- | --- | --- |
| Los errores | más        | comunes | al comenzar      | en LaTeX | son los | siguientes: |     |     |
11

| Guía de    | LaTeX | para   | estudiantes |          |     |     |     |     | Artículo científico | y tesina |
| ---------- | ----- | ------ | ----------- | -------- | --- | --- | --- | --- | ------------------- | -------- |
| 1. Olvidar |       | cerrar | una         | llave }. |     |     |     |     |                     |          |
2. No cerrar un entorno, por ejemplo \begin{figure} sin su correspondiente \end{figure}.
| 3. Escribir |            | nombres | de         | imágenes | incorrectos. |      |             |     |     |     |
| ----------- | ---------- | ------- | ---------- | -------- | ------------ | ---- | ----------- | --- | --- | --- |
| 4. Usar     | caracteres |         | especiales |          | sin saber    | cómo | manejarlos. |     |     |     |
| 5. Copiar   |            | y pegar | código     | sin      | entender     | qué  | hace.       |     |     |     |
| 13.1.       | Caracteres |         | especiales |          |              |      |             |     |     |     |
En LaTeX algunos caracteres tienen funciones especiales, por ejemplo: #, $,%, &, _.
Si se quieren escribir literalmente, normalmente deben escaparse con barra invertida:
\%
\$
\_
| 14. Método |     | de  | aprendizaje |     | recomendado |     | para | estudiantes |     |     |
| ---------- | --- | --- | ----------- | --- | ----------- | --- | ---- | ----------- | --- | --- |
Para aprender LaTeX de forma efectiva, se recomienda esta secuencia:
| 1. Aprender  |     | a           | crear un        | documento |                 | mínimo. |     |     |     |     |
| ------------ | --- | ----------- | --------------- | --------- | --------------- | ------- | --- | --- | --- | --- |
| 2. Practicar |     | títulos,    | secciones       |           | y subsecciones. |         |     |     |     |     |
| 3. Aprender  |     | listas      | y formato       |           | básico.         |         |     |     |     |     |
| 4. Practicar |     | tablas      | y               | figuras.  |                 |         |     |     |     |     |
| 5. Aprender  |     | ecuaciones. |                 |           |                 |         |     |     |     |     |
| 6. Aprender  |     | citas       | y bibliografía. |           |                 |         |     |     |     |     |
7. Finalmente, trabajar sobre una plantilla real, como Springer para artículos o una plantilla
| institucional   |              |               | para tesina. |         |         |     |                |          |     |     |
| --------------- | ------------ | ------------- | ------------ | ------- | ------- | --- | -------------- | -------- | --- | --- |
| 15. Sugerencias |              |               | pedagógicas  |         | para    | sus | primeros       | trabajos |     |     |
| 15.1.           | Para         | artículo      | científico   |         |         |     |                |          |     |     |
| Se sugiere      | que          | el estudiante |              | trabaje | primero |     | en este orden: |          |     |     |
| título          | provisional, |               |              |         |         |     |                |          |     |     |
resumen,
| palabras |     | clave, |     |     |     |     |     |     |     |     |
| -------- | --- | ------ | --- | --- | --- | --- | --- | --- | --- | --- |
introducción,
metodología,
12

| Guía | de  | LaTeX | para estudiantes |     |     |     |     |     |     | Artículo científico | y tesina |
| ---- | --- | ----- | ---------------- | --- | --- | --- | --- | --- | --- | ------------------- | -------- |
resultados,
conclusiones,
referencias.
| 15.2. | Para    | tesina   | o    | monografía |     |     |     |     |     |     |     |
| ----- | ------- | -------- | ---- | ---------- | --- | --- | --- | --- | --- | --- | --- |
| Se    | sugiere | comenzar | con: |            |     |     |     |     |     |     |     |
portada,
índice,
introducción,
objetivos,
|     | estructura    |           | general        | de capítulos, |                   |                  |         |           |                |     |     |
| --- | ------------- | --------- | -------------- | ------------- | ----------------- | ---------------- | ------- | --------- | -------------- | --- | --- |
|     | incorporación |           | progresiva     |               | de citas,         | figuras          |         | y tablas. |                |     |     |
| 16. | Buenas        |           | prácticas      | académicas    |                   |                  | al usar | LaTeX     |                |     |     |
|     | Compilar      |           | frecuentemente |               | para              | detectar         | errores |           | temprano.      |     |     |
|     | Nombrar       |           | archivos       | e imágenes    |                   | de manera        |         | ordenada. |                |     |     |
|     | Mantener      |           | una carpeta    |               | para figuras.     |                  |         |           |                |     |     |
|     | Mantener      |           | un archivo     | .bib          | para              | la bibliografía. |         |           |                |     |     |
|     | No            | modificar | paquetes       |               | o configuraciones |                  |         | avanzadas | sin necesidad. |     |     |
Escribir primero el contenido académico y luego refinar detalles menores.
| 17. | Mini             | guía | de comandos |     | útiles  |       |            |         |          |     |     |
| --- | ---------------- | ---- | ----------- | --- | ------- | ----- | ---------- | ------- | -------- | --- | --- |
|     | Comando          |      |             |     | Función |       |            |         |          |     |     |
|     | \section{...}    |      |             |     | Crea    | una   | sección    |         |          |     |     |
|     | \subsection{...} |      |             |     | Crea    | una   | subsección |         |          |     |     |
|     | \textbf{...}     |      |             |     | Coloca  | texto | en         | negrita |          |     |     |
|     | \textit{...}     |      |             |     | Coloca  | texto | en         | cursiva |          |     |     |
|     | $...$            |      |             |     | Inserta | una   | ecuación   |         | en línea |     |     |
|     | \begin{equation} |      |             | ... | Inserta | una   | ecuación   |         | numerada |     |     |
\end{equation}
|     | \includegraphics{...} |     |     |     | Inserta    | una    | imagen   |         |            |         |     |
| --- | --------------------- | --- | --- | --- | ---------- | ------ | -------- | ------- | ---------- | ------- | --- |
|     | \caption{...}         |     |     |     | Agrega     | título | a        | figura  | o tabla    |         |     |
|     | \label{...}           |     |     |     | Crea       | una    | etiqueta | para    | referencia | cruzada |     |
|     | \ref{...}             |     |     |     | Referencia |        | una      | figura, | tabla o    | sección |     |
13

| Guía de     | LaTeX | para estudiantes |      |           |     |      |               | Artículo científico | y tesina |
| ----------- | ----- | ---------------- | ---- | --------- | --- | ---- | ------------- | ------------------- | -------- |
| \cite{...}  |       |                  |      | Inserta   | una | cita | bibliográfica |                     |          |
| 18. Ejemplo |       | mínimo           | para | practicar |     | en   | clase         |                     |          |
El siguiente ejemplo puede ser usado por estudiantes en sus primeras prácticas:
\documentclass[12pt]{article}
\usepackage[utf8]{inputenc}
\usepackage[T1]{fontenc}
\usepackage[spanish]{babel}
\usepackage{graphicx}
\usepackage{amsmath}
| \title{Mi      | primer | documento       |     | academico |     | en LaTeX} |     |     |     |
| -------------- | ------ | --------------- | --- | --------- | --- | --------- | --- | --- | --- |
| \author{Nombre |        | del estudiante} |     |           |     |           |     |     |     |
\date{2026}
\begin{document}
\maketitle
\tableofcontents
\section{Introduccion}
| Este es      | un ejemplo | sencillo  |         | para | aprender | LaTeX. |     |     |     |
| ------------ | ---------- | --------- | ------- | ---- | -------- | ------ | --- | --- | --- |
| \section{Una |            | ecuacion} |         |      |          |        |     |     |     |
| La ecuacion  |            | en linea  | es $a^2 | +    | b^2 =    | c^2$.  |     |     |     |
\begin{equation}
E = mc^2
\end{equation}
| \section{Una |     | lista} |     |     |     |     |     |     |     |
| ------------ | --- | ------ | --- | --- | --- | --- | --- | --- | --- |
\begin{itemize}
| \item | Primer  | punto |     |     |     |     |     |     |     |
| ----- | ------- | ----- | --- | --- | --- | --- | --- | --- | --- |
| \item | Segundo | punto |     |     |     |     |     |     |     |
\end{itemize}
\section{Conclusiones}
LaTeX permite redactar documentos academicos con calidad profesional.
\end{document}
| 19. Conclusión |     | general |     |     |     |     |     |     |     |
| -------------- | --- | ------- | --- | --- | --- | --- | --- | --- | --- |
Aprender LaTeX al inicio puede parecer desafiante, pero una vez comprendida su lógica, se
convierte en una herramienta muy poderosa para la vida académica. Su mayor fortaleza es que
permite crear documentos con estructura, limpieza y calidad editorial, lo cual resulta especial-
| mente | valioso | en artículos | científicos, |     | monografías |     | y tesinas. |     |     |
| ----- | ------- | ------------ | ------------ | --- | ----------- | --- | ---------- | --- | --- |
14

| Guía de LaTeX | para | estudiantes |     |     |     |     | Artículo científico | y tesina |
| ------------- | ---- | ----------- | --- | --- | --- | --- | ------------------- | -------- |
Para estudiantes principiantes, la recomendación más importante es esta: no intentar apren-
der todo de una vez. Deben avanzar desde lo básico hacia lo aplicado, y trabajar primero con
| ejemplos simples | antes        | de pasar  | a plantillas | más              | complejas.  |     |     |     |
| ---------------- | ------------ | --------- | ------------ | ---------------- | ----------- | --- | --- | --- |
| En su contexto,  | la ruta      | ideal     | sería:       |                  |             |     |     |     |
| 1. aprender      | lo básico    | de        | LaTeX,       |                  |             |     |     |     |
| 2. practicar     | en Overleaf, |           |              |                  |             |     |     |     |
| 3. utilizar      | luego la     | plantilla | Springer     | para el artículo | científico, |     |     |     |
4. y finalmente adaptar una plantilla tipo report para la monografía o tesina.
| Mensaje | final para | estudiantes |     |     |     |     |     |     |
| ------- | ---------- | ----------- | --- | --- | --- | --- | --- | --- |
LaTeXnoseaprendememorizandotodosulenguaje,sinoescribiendo,compilando,equivo-
cándoseycorrigiendo.Conprácticaconstante,seconvierteenunaherramientaacadémica
| de altísimo | valor.      |          |      |          |             |     |     |     |
| ----------- | ----------- | -------- | ---- | -------- | ----------- | --- | --- | --- |
| Anexo:      | orientación | práctica | para | su curso | o seminario |     |     |     |
Si este material se va a usar en clases, una secuencia didáctica razonable podría ser:
| 1. Sesión | 1: introducción |                | a LaTeX          | y uso de Overleaf. |             |           |     |     |
| --------- | --------------- | -------------- | ---------------- | ------------------ | ----------- | --------- | --- | --- |
| 2. Sesión | 2: estructura   | básica,        | secciones        | y formato          | de          | texto.    |     |     |
| 3. Sesión | 3: tablas,      | figuras        | y ecuaciones.    |                    |             |           |     |     |
| 4. Sesión | 4: referencias  | bibliográficas |                  | y archivo          | .bib.       |           |     |     |
| 5. Sesión | 5: uso de       | plantilla      | Springer         | para artículo      | científico. |           |     |     |
| 6. Sesión | 6: adaptación   |                | de una plantilla | para               | monografía  | o tesina. |     |     |
15