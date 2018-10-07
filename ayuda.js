const styles = StyleSheet.create({
    container: {
      //flex: Si es 1, oocupa todo el espacio que tiene asignado. Sino se ajusta al tamaño de sus vistas hijas
      flex: 1,  
      //flex-direction: 'column' por defecto (eje de elementos será de columna), si es 'row', el eje de elementos sera una fila
  
      // justifyContent: 'flex-start' por defecto, al principio de la vista. Alinea en el eje FLEX (row = en 1a fila/column = en 1a columna) 
      // justifyContent: 'space-between', // alinea en el centro del eje principal (row o column). 
      // justifyContent:  'flex-end', // Alinea al final del eje principal
      
      // alignItems: Para alinear en el eje contrario al principal. 'flex-start' 'flex-end' 'center'
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      flexWrap: 'wrap'
    },
    box: {
      width: 100,
      height: 300
    },
    blue: {
      backgroundColor: 'blue',
  
      // alignSelf:  alignItems para elementos unitarios
  
      // alignSelf: 'flex-start'
    },
    red: {
      backgroundColor:  'red'
    },
    green: {
      backgroundColor: 'green'
    },
  });
  
  // # Elige el eje principal:
  // flexDirection: 'column' || 'row'
  
  // # Alineamiento con el eje principal:
  // justifyContent: 'flex-start' || 'flex-end' || 'center' || 'space-around' (espacio entre elementos, y margenes superiores e inferiores|| 'space-between'
  
  // # Alineamiento con el eje cruzado:
  // alignItems: 'flex-start' || 'flex-end' || 'center' || 'stretch'
  
  // # Alineamiento de un elemento sobre el eje cruzado:
  // alignSelf: 'flex-start' || 'flex-end' || 'center' || 'stretch' || 'auto'
  
  // # Comportamiento al final del contenedor:
  // flexWrap: 'wrap' || 'nowrap'
  
  // # Fluidez relativa de un elemento:
  // flex: number (el. 1, 0.5, 5)